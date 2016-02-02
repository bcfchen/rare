
(function() {
    'use strict';
    angular.module('rare').factory("AppointmentsArray", ["$firebaseArray", AppointmentsArray]);

    function AppointmentsArray($firebaseArray) {
    	return $firebaseArray.$extend({
    		getFutureAppts: getFutureAppts,
            create: create
    	});

        /* method implementations */
        function create(appointment){
            return this.$add(appointment).then(function(rawAppt){
                return new Appointment(rawAppt);
            });
        }

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