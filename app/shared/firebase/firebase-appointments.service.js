
(function() {
    'use strict';
    angular.module('rare').factory("AppointmentsArray", AppointmentsArray);

    AppointmentsArray.$inject = ["$firebaseArray"];

    function AppointmentsArray($firebaseArray) {
    	return $firebaseArray.$extend({
    		getFutureAppts: getFutureAppts,
            save: save
    	});

        /* method implementations */
        function save(appointment){
            return this.$add(appointment).then(function(ref){
                appointment.id = ref.key();
                return appointment;
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