 (function() {
     angular.module('rare')
         .directive('paymentError', [function() {
             return {
                 restrict: 'E',
                 scope: {
                    closePaymentError:"&"
                 },
                 templateUrl: 'shared/directives/confirmation/payment-error/payment-error.html',
                 link: function(scope) {
                    scope.close = function(){
                        scope.closePaymentError();
                    }
                 }
             }
         }]);
 })();
