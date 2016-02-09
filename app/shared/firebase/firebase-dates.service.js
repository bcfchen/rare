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
            var matchingDate = _.find(localDates, function(localDate) {
                return localDate.displayDateStrWithYear === dateStr;
            })

            var dateTimes = matchingDate.getTimes();
            if (!dateTimes) {
                return;
            }

            var matchingTime = _.find(dateTimes, function(time){
                return time.displayTimeStr === timeStr;
            });

            return matchingTime.isAvailable();
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
