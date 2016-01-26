
(function() {
    'use strict';
    angular.module('rare').factory("AppointmentsArray", ["$firebaseArray", AppointmentsArray]);

    function AppointmentsArray($firebaseArray) {
    	return $firebaseArray.$extend({
    		getFutureAppts: getFutureAppts
    	});

        /* method implementations */
        function getFutureAppts(){
        	var appointments = [];
        	return this.$loaded().then(function(rawAppts){
        		rawAppts.forEach(function(rawAppt){
        			var appointment = new Appointment(rawAppt); 
        			if (appointment.isInFuture() && !appointment.isCancelled()){
        				appointments.push(appointment);
        			}
        		});

        		return appointments;
        	});        	
        }

    }
})();