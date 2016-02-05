(function() {
    'use strict';
    angular.module('rare').factory("DatesArray", ["$firebaseArray", DatesArray]);

    function DatesArray($firebaseArray) {
        return $firebaseArray.$extend({
            getFutureDates: getFutureDates,
            startWatch: startWatch,
            isDateTimeAvailable: isDateTimeAvailable
        });

        var localDates = [];

        /* method implementations */
        function isDateTimeAvailable(dateStr, timeStr) {
            var arr = this;
            var isAvailable = false;
            localDates.forEach(function(date) {
                // var date = new ScheduleDate(month, year, rawDate);
                var dateTimes = date.getTimes();
                if (!dateTimes) {
                    return;
                }
                dateTimes.forEach(function(time) {
                    if (time.displayTimeStr === timeStr) {
                        isAvailable = time.isAvailable();
                    }
                });
            });

            return isAvailable;
        }

        function startWatch(month, year, callback) {
            var arr = this;

            arr.$watch(function(event) {
                var futureDates = [];
                arr.$list.forEach(function(rawDate) {
                    var date = new ScheduleDate(month, year, rawDate);
                    if (date.isDateInRange()) {
                        futureDates.push(date);
                    }
                });
                localDates = futureDates;
                callback(futureDates);
            });
        };

        function getFutureDates(month, year) {
            var futureDates = [];
            return this.$loaded().then(function(rawDates) {
                rawDates.forEach(function(rawDate) {
                    var date = new ScheduleDate(month, year, rawDate);
                    if (date.isDateInRange()) {
                        futureDates.push(date);
                    }
                });

                return futureDates;
            });
        }

    }
})();
