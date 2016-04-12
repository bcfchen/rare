(function() {

    angular
        .module("rare")
        .factory("emailService", ["$q", "$http", "constants", 
            "$firebaseAuth", "userBuilder", emailService]);

    function emailService($q, $http, constants, $firebaseAuth, userBuilder) {
        var service = {
            sendEmail: sendEmail
        };

        return service;

        /* method implementations */

        function sendEmail(user, appointment) {
            return $http.post(constants.SERVER_URL + "/send-email", {
                user: user,
                appointment: appointment
            }).then(function(response) {
                return response;
            });
        }

    }
}());
