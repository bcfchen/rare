
(function() {
    'use strict';
    angular.module('rare').factory("productService", ["ProductObject", "constants", productService]);

    function productService(ProductObject, constants) {
        var service = {
        	getProduct: getProduct
        };

        return service;

        /* method implementations */
        function getProduct(productId){
        	var ref = new Firebase(constants.FIREBASE_URL + "/products/" + productId);
			return ProductObject(ref).getProduct();
        }
    }
})();