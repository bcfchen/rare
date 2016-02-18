(function() {
    'use strict';
    angular.module('rare').factory("firebaseFactory", firebaseFactory);

    firebaseFactory.$inject = ["DatesArray", "UserObject", "PhoneUserObject", "UsersArray", "TimeAppointmentsObject", "AppointmentsArray", "constants"];

    function firebaseFactory(DatesArray, UserObject, PhoneUserObject, UsersArray, TimeAppointmentsObject, AppointmentsArray, constants) {
        var service = {
            getUsersArray: getUsersArray,
            getUserObject: getUserObject,
            getTimeAppointmentsObject: getTimeAppointmentsObject,
            getPhoneUserObject: getPhoneUserObject,
            getAppointmentsArray: getAppointmentsArray,
            getDatesArray: getDatesArray
        };

        return service;

        /* method implementations */
        function getDatesArray(type) {
            var currentMoment = new moment();
            var year = currentMoment.year(),
                currentMonth = currentMoment.month() + 1,
                nextMonth = currentMonth + 1;
            var month = type === "current" ? currentMonth : nextMonth;
            var ref = new Firebase(constants.FIREBASE_URL + "/schedule/" + year + "/" + month);

            return new DatesArray(ref);
        }

        function getUsersArray() {
            var url = constants.FIREBASE_URL + "/users",
                firebaseRef = new Firebase(url);
            return new UsersArray(firebaseRef);
        }

        function getUserObject(userId) {
            var url = constants.FIREBASE_URL + "/users/" + userId,
                firebaseRef = new Firebase(url);
            return new UserObject(firebaseRef);
        }

        function getTimeAppointmentsObject(scheduleDate, scheduleTime) {
            var dateMoment = new moment(scheduleDate);
            var timeMoment = new moment("1/1/1911" + " " + scheduleTime);
            var year = dateMoment.year(),
                month = dateMoment.month() + 1,
                date = dateMoment.date(),
                time = timeMoment.format("HH:mm");
            var url = constants.FIREBASE_URL + "/schedule/" + year + "/" + month + "/" + date + "/" + "times/" + time + "/" + "appointments";
            var firebaseRef = new Firebase(url);

            return new TimeAppointmentsObject(firebaseRef);
        }

        function getPhoneUserObject() {
            var url = constants.FIREBASE_URL + "/phoneUsers";
            var firebaseRef = new Firebase(url);
            return new PhoneUserObject(firebaseRef);
        }

        function getAppointmentsArray() {
            var url = constants.FIREBASE_URL + "/appointments",
                firebaseRef = new Firebase(url);

            return new AppointmentsArray(firebaseRef);
        }
    }
})();
