
(function() {
    'use strict';
    angular.module('rare').factory("scheduleService", ["$q", "DatesArray", "constants", scheduleService]);

    function scheduleService($q, DatesArray, constants) {
        var service = {
        	getFutureDates: getFutureDates
        };

        return service;

        /* method implementations */

        // get this month and next month's dates (if exist)
        function getFutureDates(){
        	var currentMoment = new moment();
        	var year = currentMoment.year(),
        		currentMonth = currentMoment.month() + 1,
        		nextMonth = currentMonth + 1;

        	var thisMonthRef = new Firebase(constants.FIREBASE_URL + "/schedule/" + year + "/" + currentMonth),
				thisMonthDatesArray = new DatesArray(thisMonthRef),
        		nextMonthRef = new Firebase(constants.FIREBASE_URL + "/schedule/" + year + "/" + nextMonth),
				nextMonthDatesArray = new DatesArray(nextMonthRef);

			var allDates = [];
			return $q.all({
				thisMonthsDates: thisMonthDatesArray.getFutureDates(currentMonth, year),
				nextMonthsDates: nextMonthDatesArray.getFutureDates(nextMonth, year)
			}).then(function(data){
				return allDates.concat(data.thisMonthsDates).concat(data.nextMonthsDates);
			});
        }
    }
})();