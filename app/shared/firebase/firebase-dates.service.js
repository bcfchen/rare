
(function() {
    'use strict';
    angular.module('rare').factory("DatesArray", ["$firebaseArray", DatesArray]);

    function DatesArray($firebaseArray) {
    	return $firebaseArray.$extend({
    		getFutureDates: getFutureDates
    	});

        /* method implementations */
        function getFutureDates(month, year){
        	var futureDates = [];
        	return this.$loaded().then(function(rawDates){
        		rawDates.forEach(function(rawDate){
        			var date = new ScheduleDate(month, year, rawDate); 
        			if (date.isDateInRange()){
        				futureDates.push(date);
        			}
        		});

        		return futureDates;
        	});        	
        }

    }
})();