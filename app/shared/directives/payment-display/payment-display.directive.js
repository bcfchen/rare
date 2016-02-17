 (function() {
     angular.module('rare')
         .directive('paymentDisplay', [
             function() {
                 return {
                     restrict: 'E',
                     scope: {
                         paymentInfo: "="
                     },
                     templateUrl: 'shared/directives/payment-display/payment-display.html',
                     link: function(scope) {
                     	scope.brandImg = "";

                         setPaymentBrand();

                         function setPaymentBrand() {
                             var brand = scope.paymentInfo ? scope.paymentInfo.getBrand() : null;
                             if (!brand) {
                                 return;
                             }

                             var paymentBrand = brand.toUpperCase();
                             if (paymentBrand === "VISA") {
                                 scope.brandImg = "img/icon_payment_visa@2x.png";
                             } else if (paymentBrand === "MASTERCARD") {
                                 scope.brandImg = "img/icon_payment_mastercard@2x.png";
                             } else if (paymentBrand === "DISCOVER") {
                                 scope.brandImg = "img/icon_payment_discover@2x.png";
                             } else {
                                 scope.brandImg = "img/icon_payment_amex@2x.png";
                             }
                         }
                     }
                 }
             }
         ]);
 })();
