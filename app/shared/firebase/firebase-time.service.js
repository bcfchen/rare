(function() {
    'use strict';
    angular.module('rare').factory("TimeObject", ["$firebaseObject", TimeObject]);

    function TimeObject($firebaseObject) {
        return $firebaseObject.$extend({
            addAppointment: addAppointment
        });

        /* method implementations */
        function addAppointment(){
        	return this.$save(true).then(function(apptIdKeyValuePair){
        		return apptIdKeyValuePair;
        	});
        }
    }
})();