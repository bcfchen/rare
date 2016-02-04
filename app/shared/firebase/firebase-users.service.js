
(function() {
    'use strict';
    angular.module('rare').factory("UsersArray", ["$firebaseArray", UsersArray]);

    function UsersArray($firebaseArray) {
    	return $firebaseArray.$extend({
    		save: save,
            get: get
    	});

        /* method implementations */
        function get(userId){
            return new User(this.$getRecord(userId));
        }

        function save(user){
        	return this.$add(user).then(function(ref){
                user.id = ref.key();
        		return user;
        	});
        }

    }
})();