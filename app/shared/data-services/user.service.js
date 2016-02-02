(function() {
    'use strict';
    angular.module('rare').factory("userService", ["UserObject", "PhoneUserObject", "UsersArray", "constants", userService]);

    function userService(UserObject, PhoneUserObject, UsersArray, constants) {
        var service = {
            update: update,
            create: create,
            get: get
        };

        return service;

        /* method implementations */
        function create(user) {
            var ref = new Firebase(constants.FIREBASE_URL + "/users");
            return UsersArray(ref).create(user).then(function(createdUser) {
            	var phoneNumber = createdUser.getPhoneNumber();
                var ref = new Firebase(constants.FIREBASE_URL + "/phoneUsers/" + phoneNumber);
                var phoneUser = new PhoneUser();
                phoneUser.phoneNumber = phoneNumber;
                phoneUser.userId = createdUser.id;

                return PhoneUserObject(ref).save(phoneUser).then(function(){
                	return createdUser;
                });
            });
        }

        function update(user) {
            var ref = new Firebase(constants.FIREBASE_URL + "/users/" + user.id);
            return UserObject(ref).save(user);
        }

        function get(phoneNumber) {
            var ref = new Firebase(constants.FIREBASE_URL + "/phoneUsers/" + phoneNumber);
            return PhoneUserObject(ref).getPhoneUser().then(function(phoneUser) {
                var userRef = new Firebase(constants.FIREBASE_URL + "/users/" + phoneUser.userId);
                return UserObject(userRef).get(userRef);
            });
        }
    }
})();
