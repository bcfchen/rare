(function() {
    angular
        .module("rare")
        .factory("stripeService", stripeService);

    stripeService.$inject = ["$q", "$http", "constants"];

    function stripeService($q, $http, constants) {
        var service = {
            getStripeCustomer: getStripeCustomer,
            makePayment: makePayment
        };

        return service;

        /* method implementations */

        function makePayment(tokenId, email, customerId, amount) {
            var stripeInfoContainer = {
                card: {
                    id: tokenId,
                    email: email
                },
                amount: amount * 100,
                customerId: customerId
            };

            return $http.post(constants.SERVER_URL + "/stripe/charge", stripeInfoContainer).then(function(response) {
                return new StripeCharge(response.data);
            });
        }

        function getStripeCustomer(customerId) {
            return $http.get(constants.SERVER_URL + "/stripe/getCustomer/" + customerId)
                .then(function success(response) {
                    return StripeCustomer(response);
                });
        }

    }
}());
