(function() {
    'use strict';
    angular.module('rare').factory("UserObject", ["$firebaseObject", UserObject]);

    function UserObject($firebaseObject) {
        return $firebaseObject.$extend({
            get: get,
            save: save
        });

        /* method implementations */
        function save(user) {
            assignUserFields(this, user);
            return this.$save().then(function(ref) {
                user.id = ref.key();
                return user;
            });
        }

        function assignUserFields(firebaseObject, user){
            firebaseObject.id = user.id;
            firebaseObject.firstName = user.firstName;
            firebaseObject.lastName = user.lastName;
            firebaseObject.address = user.address;
            firebaseObject.phoneNumber = user.phoneNumber;
            firebaseObject.email = user.email;
            firebaseObject.stripeCustomerId = user.stripeCustomerId;
            firebaseObject.paymentInfo = user.paymentInfo;
            firebaseObject.password = user.password;
        }

        function get() {
            return this.$loaded().then(function(user) {
                return new User(user);
            });
        }

    }
})();
