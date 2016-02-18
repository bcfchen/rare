(function() {
    'use strict';
    angular.module('rare').factory("scheduleService", scheduleService);

    scheduleService.$inject = ["firebaseFactory", "firebaseAccessService", "appointmentBuilder", "userBuilder", "$q", "DatesArray", "constants", "stripeService", "emailService"];

    function scheduleService(firebaseFactory, firebaseAccessService, appointmentBuilder, userBuilder, $q, DatesArray, constants, stripeService, emailService) {
        var service = {
            bookAppointment: bookAppointment,
            isDateAvailable: isDateAvailable,
            watch: watch
        };

        return service;

        /* method implementations */

        function isDateAvailable(appointment) {
            var thisMonthDatesArray = getThisMonthDatesArray();
            return thisMonthDatesArray.isDateTimeAvailable(appointment.getDate(), appointment.getTime());
        }

        function bookAppointment() {
            var deferred = $q.defer();
            var appointment = appointmentBuilder.build(),
                tokenId = appointment.getTokenId(),
                user = userBuilder.build(),
                customerId = user.getStripeCustomerId(),
                price = appointment.getPrice();

            var isDateAvailable = this.isDateAvailable(appointment);
            if (!isDateAvailable) {
                deferred.reject();
            } else {
                stripeService.makePayment(tokenId, user.getEmail(), customerId, price)
                    .then(function(stripeCharge) {
                        firebaseAccessService.bookAppointment(stripeCharge).then(function(response) {
                            emailService.sendEmail(user, appointment);
                            deferred.resolve(response);
                        });
                    });
            }

            return deferred.promise;
        }

        function watch(callback, type) {
            var datesArray = firebaseFactory.getDatesArray(type);
            var currentMoment = new moment();
            var year = currentMoment.year(),
                currentMonth = currentMoment.month() + 1,
                nextMonth = currentMonth + 1;
            var month = type === "current" ? currentMonth : nextMonth;

            datesArray.startWatch(month, year, callback);
        }
    }
})();
