
(function() {
    'use strict';
    angular.module('rare').factory("ProductObject", ProductObject);

    ProductObject.$inject = ["$firebaseObject"];

    function ProductObject($firebaseObject) {
        return $firebaseObject.$extend({
            getProduct: getProduct
        });

        /* method implementations */
        function getProduct(){
            return this.$loaded().then(function(rawProduct){
                return new Product(rawProduct);
            });         
        }

    }
})();