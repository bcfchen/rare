
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
            this[phoneNumber] = userId;
        	return this.$save().then(function(ref){
        		return new PhoneUser(ref.key(), userId);
        	});
        }

        function get(phoneNumber){
            return this.$loaded().then(function(phoneUserMap){
                var mappedPhoneUser = phoneUserMap[phoneNumber];
                return new PhoneUser(phoneNumber, mappedPhoneUser);
            });         
        }

    }
})();