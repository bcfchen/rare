(function() {
    'use strict';
    angular.module('rare').factory("firebaseFactory", ["UserObject", "PhoneUserObject", "UsersArray", "TimeAppointmentsObject", "AppointmentsArray","constants", firebaseFactory]);

    function firebaseFactory(UserObject, PhoneUserObject, UsersArray, TimeAppointmentsObject, AppointmentsArray, constants) {
        var service = {
            getUsersArray: getUsersArray,
            getUserObject: getUserObject,
            getTimeAppointmentsObject: getTimeAppointmentsObject,
            getPhoneUserObject: getPhoneUserObject,
            getAppointmentsArray: getAppointmentsArray
        };

        return service;

        /* method implementations */
        function getUsersArray(){
            var url = constants.FIREBASE_URL + "/users",
                firebaseRef = new Firebase(url);
            return new UsersArray(firebaseRef);
        }

        function getUserObject(userId){
            var url = constants.FIREBASE_URL + "/users/" + userId,
                firebaseRef = new Firebase(url);
            return new UserObject(firebaseRef);
        }

        function getTimeAppointmentsObject(scheduleDate, scheduleTime){
            var dateMoment = new moment(scheduleDate);
            var timeMoment = new moment("1/1/1911" + " " + scheduleTime);
            var year = dateMoment.year(),
                month = dateMoment.month() + 1,
                date = dateMoment.date(),
                time = timeMoment.format("HH:mm");
            var url = constants.FIREBASE_URL + "/schedule/" + year + "/" 
                        + month + "/"
                        + date + "/"
                        + "times/"
                        + time + "/"
                        + "appointments";
            var firebaseRef = new Firebase(url);

            return new TimeAppointmentsObject(firebaseRef);
        }

        function getPhoneUserObject(){
            var url = constants.FIREBASE_URL + "/phoneUsers";
            var firebaseRef = new Firebase(url);
            return new PhoneUserObject(firebaseRef);
        }

        function getAppointmentsArray(){
            var url = constants.FIREBASE_URL + "/appointments",
                firebaseRef = new Firebase(url);

            return new AppointmentsArray(firebaseRef);
        }
    }
})();
