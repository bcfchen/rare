(function () {

    angular
        .module("rare")
        .factory("stripeService", ["$q", "$http", "constants", stripeService]);

    function stripeService($q, $http, constants) {
        var service = {
            open: open,
            initialize: initialize
        };

        var handler;

        initialize();

        return service;

        /* method implementations */
        function initialize(amount, successCallback, errorCallback){
            // amount is in cents
            var convertedAmount = amount * 100;
        	handler = StripeCheckout.configure({
			        image: "https://stripe.com/img/documentation/checkout/marketplace.png",
			        key:'pk_live_570nSYPKpEFawxjct8tu4u9Z',
			        token: function(response){
			        	tokenHandler(response, convertedAmount, successCallback, errorCallback)
			        }
			});
        }

        function tokenHandler(response, amount, successCallback, errorCallback){
            // $ionicLoading.show({
            //     content: 'Loading',
            //     animation: 'fade-in',
            //     showBackdrop: true,
            //     maxWidth: 200,
            //     showDelay: 0
            // });			

            // hackaround to get around checkout.js bug
             delete window.StripeCheckout
              var script = document.createElement('script')
              script.src="https://checkout.stripe.com/checkout.js"
              document.body.appendChild(script)

            var card = response;
            var stripeInfoContainer = {
                card: card,
                amount: amount
            };

        	return $http.post(constants.SERVER_URL, stripeInfoContainer).then(function success(response){successCallback(response);}, 
                    function error(err){errorCallback(err);})
                .finally(function(){
                    //$ionicLoading.hide();
                });
        }

        function open(product){
        	handler.open({
	            name: 'RARE',
	            description: product.name,
	            amount: product.price * 100
	        });
        }

    }
}());