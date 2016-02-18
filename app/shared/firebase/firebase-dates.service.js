(function() {
    'use strict';
    angular.module('rare').factory("DatesArray", ["$firebaseArray", DatesArray]);

    function DatesArray($firebaseArray) {
        return $firebaseArray.$extend({
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

            var dateTimes = matchingDate ? matchingDate.getTimes() : null;
            if (!dateTimes) {
                return false;
            }

            var matchingTime = _.find(dateTimes, function(time){
                return time.displayTimeStr === timeStr;
            });

            return matchingTime ? matchingTime.isAvailable() : false;
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

    }
})();
