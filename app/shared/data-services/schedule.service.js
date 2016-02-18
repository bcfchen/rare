(function() {
    'use strict';
    angular.module('rare').factory("scheduleService", ["firebaseAccessService", "appointmentBuilder", "userBuilder", "$q", "DatesArray", "constants", "stripeService", "emailService", scheduleService]);

    function scheduleService(firebaseAccessService, appointmentBuilder, userBuilder, $q, DatesArray, constants, stripeService, emailService) {
        var service = {
            bookAppointment: bookAppointment,
            isDateAvailable: isDateAvailable,
            watchThisMonth: watchThisMonth,
            watchNextMonth: watchNextMonth
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

        function watchThisMonth(callback) {
            var thisMonthDatesArray = getThisMonthDatesArray();
            var currentMoment = new moment();
            var year = currentMoment.year(),
                currentMonth = currentMoment.month() + 1;

            thisMonthDatesArray.startWatch(currentMonth, year, callback);
        }


        function watchNextMonth(callback) {
            var thisMonthDatesArray = getThisMonthDatesArray(),
                nextMonthDatesArray = getNextMonthDatesArray();
            var currentMoment = new moment();
            var year = currentMoment.year(),
                currentMonth = currentMoment.month() + 1,
                nextMonth = currentMonth + 1;

            nextMonthDatesArray.startWatch(nextMonth, year, callback);
        }

        function getNextMonthDatesArray() {
            var currentMoment = new moment();
            var year = currentMoment.year(),
                currentMonth = currentMoment.month() + 1,
                nextMonth = currentMonth + 1;
            var nextMonthRef = new Firebase(constants.FIREBASE_URL + "/schedule/" + year + "/" + nextMonth),
                nextMonthDatesArray = new DatesArray(nextMonthRef);

            return nextMonthDatesArray;
        }

        function getThisMonthDatesArray() {
            var currentMoment = new moment();
            var year = currentMoment.year(),
                currentMonth = currentMoment.month() + 1;

            var thisMonthRef = new Firebase(constants.FIREBASE_URL + "/schedule/" + year + "/" + currentMonth),
                thisMonthDatesArray = new DatesArray(thisMonthRef);

            return thisMonthDatesArray;
        }
    }
})();
