(function() {
    'use strict';
    angular.module('rare').factory("scheduleService", scheduleService);

    scheduleService.$inject = ["firebaseFactory", "firebaseAccessService", "appointmentBuilder", 
                            "userBuilder", "$q", "DatesArray", 
                            "constants", "stripeService", "emailService"];

    function scheduleService(firebaseFactory, firebaseAccessService, appointmentBuilder, userBuilder, $q, DatesArray, constants, stripeService, emailService) {
        var service = {
            bookAppointment: bookAppointment,
            isDateAvailable: isDateAvailable,
            watch: watch
        };

        return service;

        /* method implementations */

        function isDateAvailable(appointment) {
            var thisMonthDatesArray = firebaseFactory.getDatesArray("current"),
                thisMonthAvailable = thisMonthDatesArray.isDateTimeAvailable(appointment.getDate(), appointment.getTime(), "current");

            var nextMonthDatesArray = firebaseFactory.getDatesArray("next"),
                nextMonthAvailable = nextMonthDatesArray.isDateTimeAvailable(appointment.getDate(), appointment.getTime(), "next");

            return thisMonthAvailable || nextMonthAvailable;
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

        function watch(callback, type, source) {
            var datesArray = firebaseFactory.getDatesArray(type);
            var currentMoment = new moment();
            var year = currentMoment.year(),
                currentMonth = currentMoment.month() + 1,
                nextMonth = currentMonth + 1;
            var month = type === "current" ? currentMonth : nextMonth;

            datesArray.startWatch(month, year, callback, type, source);
        }
    }
})();
