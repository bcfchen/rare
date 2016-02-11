(function() {

    angular
        .module("rare")
        .factory("authService", ["$q", "$http", "constants", "$firebaseAuth", "userBuilder", authService]);

    function authService($q, $http, constants, $firebaseAuth, userBuilder) {
        var service = {
            sendCode: sendCode,
            auth: auth
        };

        return service;

        /* method implementations */

        function sendCode(phoneNumber) {
            return $http.post(constants.SERVER_URL + "/twilio/send-code", {
                phoneNumber: phoneNumber,
                message: constants.TWILIO_MSG
            }).then(function(response) {
                return response;
            });
        }

        function auth(phoneNumber, code) {
            return authWithServer(phoneNumber, code).then(function(data) {
                return authWithFirebase(phoneNumber, data.password);
            });
        }

        function authWithFirebase(phoneNumber, password) {
            var email = phoneNumber + "@rare.com";
            var ref = new Firebase(constants.FIREBASE_URL);
            var authObj = $firebaseAuth(ref);

            return authObj.$authWithPassword({
                email: email,
                password: password
            });
        }

        function authWithServer(phoneNumber, code) {
            return $http.post(constants.SERVER_URL + "/auth/get-credentials", {
                    phoneNumber: phoneNumber,
                    code: code
                })
                .then(function success(response) {
                    var password = response.data.password;
                    var uid = response.data.uid;
                    userBuilder.setPassword(password);
                    userBuilder.setUid(uid);
                    return response.data;
                });
        }

    }
}());
