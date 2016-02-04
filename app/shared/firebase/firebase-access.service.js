(function() {
    'use strict';
    angular.module('rare').factory("firebaseAccessService", ["$q", "firebaseFactory", "userBuilder", "appointmentBuilder", "UserObject", "PhoneUserObject", "UsersArray", "TimeAppointmentsObject", "AppointmentsArray", "constants", firebaseAccessService]);

    function firebaseAccessService($q, firebaseFactory, userBuilder, appointmentBuilder, UserObject, PhoneUserObject, UsersArray, TimeAppointmentsObject, AppointmentsArray, constants) {
        var service = {
            bookAppointment: bookAppointment,
            getUser: getUser
        };

        return service;

        /* method implementations */
        /* 
            steps as below:
            1. save user object to users collection
            2. save phone user mapping
            3. save appointment in appointments collection
            4. save appointmentId under time
        */
        function bookAppointment(stripeCharge) {
            appointmentBuilder.setTransactionId(stripeCharge.id);
            var user = userBuilder.setStripeCustomerId(stripeCharge.customerId)
                .build(),
                appointment = appointmentBuilder.build();

            var usersArray = firebaseFactory.getUsersArray(),
                phoneUserObject = firebaseFactory.getPhoneUserObject(user.getPhoneNumber()),
                appointmentsArray = firebaseFactory.getAppointmentsArray(),
                timeAppointmentsObject = firebaseFactory.getTimeAppointmentsObject(appointment.getDate(),
                    appointment.getTime());
            return saveUserToCollection(user, usersArray).then(function(savedUser) {
                return phoneUserObject.save(savedUser.getPhoneNumber(), savedUser.getId());
            }).then(function() {
                return appointmentsArray.save(appointment);
            }).then(function(savedAppointment) {
                return timeAppointmentsObject.save(savedAppointment);
            });
        }

        function getUser(phoneNumber) {
            var user = userBuilder.build();
            var usersArray = firebaseFactory.getUsersArray(),
                phoneUserObject = firebaseFactory.getPhoneUserObject(user.getPhoneNumber());
            return phoneUserObject.get(phoneNumber).then(function(phoneUser) {
                return usersArray.get(phoneUser.userId);
            });

        }

        function saveUserToCollection(user, usersArray) {
            var deferred = $q.defer();
            if (user.getId()) {
                deferred.resolve(user);
            } else {
                usersArray.save(user).then(function(savedUser) {
                    deferred.resolve(savedUser);
                });
            }

            return deferred.promise;
        }
    }
})();
