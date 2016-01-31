(function() {

    angular
        .module("rare")
        .factory("stripeService", ["$q", "$http", "constants", stripeService]);

    function stripeService($q, $http, constants) {
        var service = {
            getStripeCustomer: getStripeCustomer,
            makePayment: makePayment
        };

        return service;

        /* method implementations */

        function makePayment(stripeResponse, customerId, amount) {
            var stripeInfoContainer = {
                card: stripeResponse,
                amount: amount * 100,
                customerId: customerId
            };

            return $http.post(constants.SERVER_URL + "/stripe/charge", stripeInfoContainer)
                .then(function success(response) {
                        return reponse;
                    },
                    function error(err) {
                        // errorCallback(err);
                    })
                .finally(function() {});
        }

        function getStripeCustomer(customerId) {
            return $http.get(constants.SERVER_URL + "/stripe/getCustomer/" + customerId)
                .then(function success(response) {
                        return StripeCustomer(response);
                    },
                    function error(err) {
                        // errorCallback(err);
                    })
                .finally(function() {});
        }

    }
}());
