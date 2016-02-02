
(function() {
    'use strict';
    angular.module('rare').factory("UserObject", ["$firebaseObject", UserObject]);

    function UserObject($firebaseObject) {
        return $firebaseObject.$extend({
            get: get,
            save: save
        });

        /* method implementations */
        function save(user){
        	return this.$save(user).then(function(rawUser){
        		return new User(rawUser);
        	});
        }

        function get(){
            return this.$loaded().then(function(user){
                return new User(user);
            });         
        }

    }
})();