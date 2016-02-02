
(function() {
    'use strict';
    angular.module('rare').factory("UsersArray", ["$firebaseArray", UsersArray]);

    function UsersArray($firebaseArray) {
    	return $firebaseArray.$extend({
    		create: create
    	});

        /* method implementations */
        function create(user){
        	return this.$add(user).then(function(response){
        		return new User(response);
        	});
        }

    }
})();