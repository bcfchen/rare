(function() {
    'use strict';
    angular.module('rare').factory("scheduleService", ["firebaseAccessService", "appointmentBuilder", "userBuilder", "$q", "DatesArray", "constants", "stripeService", "emailService", scheduleService]);

    function scheduleService(firebaseAccessService, appointmentBuilder, userBuilder, $q, DatesArray, constants, stripeService, emailService) {
        var service = {
            getFutureDates: getFutureDates,
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
                            emailService.sendEmail(appointment, user);
                            deferred.resolve(response);
                        });
                    });
            }

            return deferred.promise;
        }

        function watch(callback) {
            var thisMonthDatesArray = getThisMonthDatesArray(),
                nextMonthDatesArray = getNextMonthDatesArray();
            var currentMoment = new moment();
            var year = currentMoment.year(),
                currentMonth = currentMoment.month() + 1,
                nextMonth = currentMonth + 1;

            thisMonthDatesArray.startWatch(currentMonth, year, callback);
        }

        // get this month and next month's dates (if exist)
        function getFutureDates() {
            var thisMonthDatesArray = getThisMonthDatesArray(),
                nextMonthDatesArray = getNextMonthDatesArray();
            var currentMoment = new moment();
            var year = currentMoment.year(),
                currentMonth = currentMoment.month() + 1,
                nextMonth = currentMonth + 1;
            var allDates = [];
            return $q.all({
                thisMonthsDates: thisMonthDatesArray.getFutureDates(currentMonth, year),
                nextMonthsDates: nextMonthDatesArray.getFutureDates(nextMonth, year)
            }).then(function(data) {
                return allDates.concat(data.thisMonthsDates).concat(data.nextMonthsDates);
            });
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
