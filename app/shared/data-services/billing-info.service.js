(function() {
    'use strict';
    angular.module('rare').factory("billingInfoService", billingInfoService);

    billingInfoService.$inject = ["$q", "userBuilder", "appointmentBuilder", "stripeService"];

    function billingInfoService($q, userBuilder, appointmentBuilder, stripeService) {
        var service = {
            getPaymentInfo: getPaymentInfo,
            populatePaymentInfo: populatePaymentInfo
        };

        return service;

        /* method implementations */

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
                existingPaymentInfo = user.getPaymentInfo(),
                appointment = appointmentBuilder.build(),
                isPersonalAppt = appointment.isPersonal();

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
                    var prefillAddress = isPersonalAppt ? angular.copy(user.getAddress()) : new Address();
                    var billingAddress = {
                        addressLine1: prefillAddress.streetAddress,
                        addressLine2: prefillAddress.apartmentNumber,
                        addressState: prefillAddress.state,
                        addressCity: prefillAddress.city,
                        addressZip: prefillAddress.zipCode,
                        addressCountry: prefillAddress.country
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
