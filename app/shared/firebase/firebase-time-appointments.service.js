(function() {
    'use strict';
    angular.module('rare').factory("TimeAppointmentsObject", ["$firebaseArray", TimeAppointmentsObject]);

    function TimeAppointmentsObject($firebaseArray) {
        return $firebaseArray.$extend({
            save: save
        });

        /* method implementations */
        function save(appointment){
        	return this.$add(appointment).then(function(ref){
        		appointment.id = ref.key();
                return appointment;
        	});
        }
    }
})();