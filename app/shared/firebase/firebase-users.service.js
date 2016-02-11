(function() {
    'use strict';
    angular.module('rare').factory("UsersArray", ["$firebaseArray", "$firebaseAuth", UsersArray]);

    function UsersArray($firebaseArray, $firebaseAuth) {
        return $firebaseArray.$extend({
            save: save,
            get: get
        });

        /* method implementations */
        function get(userId) {
            var self = this;
            var ref = self.$ref();
            var authObj = $firebaseAuth(ref);
            return authObj.$authWithPassword({
                email: "3102661687@rare.com",
                password: "3102661687-62039"
            }).then(function(authData) {
                console.log("Logged in as:", authData.uid);
                return new User(self.$getRecord(userId));
            }).catch(function(error) {
                console.error("Authentication failed:", error);
                alert(error);
            });
             //return new User(this.$getRecord(userId));
        }

        function save(user) {
            return this.$add(user).then(function(ref) {
                user.id = ref.key();
                return user;
            });
        }

    }
})();
