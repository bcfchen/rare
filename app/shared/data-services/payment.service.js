(function() {
        'use strict';
        angular.module('rare').factory("paymentService", ["$q", "userBuilder", "appointmentBuilder", "stripeService", paymentService]);

        function paymentService($q, userBuilder, appointmentBuilder, stripeService) {
            var service = {
                getPaymentInfo: getPaymentInfo,
                populatePaymentInfo: populatePaymentInfo,
                makePayment: makePayment
            };

            return service;

            /* method implementations */
            function makePayment(){
                var appointment = appointmentBuilder.build(),
                    tokenId = appointment.getTokenId(),
                    user = userBuilder.build(),
                    customerId = user.getStripeCustomerId(),
                    price = appointment.getPrice();

                return stripeService.makePayment(tokenId, user.getEmail(), customerId, price);
            }

            function populatePaymentInfo(container) {
                return getPaymentInfo().then(function(paymentInfo) {
                    Object.keys(paymentInfo).forEach(function(key) {
                        container[key] = paymentInfo[key];
                    });

                    return container;
                });
            }

            function getPaymentInfo() {
                var deferred = $q.defer();
                var user = userBuilder.build(),
                    stripeCustomerId = user.getStripeCustomerId(),
                    existingPaymentInfo = user.getPaymentInfo();

                if (existingPaymentInfo && existingPaymentInfo.number !== "") {
                    deferred.resolve(existingPaymentInfo);
                } else {
                    if (stripeCustomerId) {
                        stripeService.getStripeCustomer(stripeCustomerId).then(function(stripeCustomer) {
                            var paymentInfo = new PaymentInfo(stripeCustomer); 
                            userBuilder.setPaymentInfo(paymentInfo); 
                            deferred.resolve(paymentInfo);
                        });
                } else {
                    // use customer address as billing address and convert into payment info
                    var userAddress = angular.copy(user.getAddress());
                    var billingAddress = {
                        addressLine1: userAddress.streetAddress,
                        addressLine2: userAddress.apartmentNumber,
                        addressState: userAddress.state,
                        addressCity: userAddress.city,
                        addressZip: userAddress.zipCode,
                        addressCountry: userAddress.country
                    };
                    var paymentInfo = new PaymentInfo(billingAddress);
                    userBuilder.setPaymentInfo(paymentInfo);

                    deferred.resolve(paymentInfo);
                }
            }

            return deferred.promise;
        }
    }
})();
