
(function() {
    'use strict';
    angular.module('rare').factory("PhoneUserObject", ["$firebaseObject", PhoneUserObject]);

    function PhoneUserObject($firebaseObject) {
        return $firebaseObject.$extend({
            get: get,
            save: save
        });

        /* method implementations */
        function save(phoneNumber, userId){
        	return this.$save().then(function(ref){
        		return new PhoneUser(ref.key(), userId);
        	});
        }

        function get(){
            return this.$loaded().then(function(phoneUser){
                return new PhoneUser(phoneUser);
            });         
        }

    }
})();