
(function() {
    'use strict';
    angular.module('rare').factory("PhoneUserObject", ["$firebaseObject", PhoneUserObject]);

    function PhoneUserObject($firebaseObject) {
        return $firebaseObject.$extend({
            getPhoneUser: getPhoneUser
        });

        /* method implementations */
        function getPhoneUser(){
            return this.$loaded().then(function(phoneUser){
                return new PhoneUser(phoneUser);
            });         
        }

    }
})();