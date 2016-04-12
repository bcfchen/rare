 (function() {
     angular.module('rare')
         .directive('paymentDisplay', [
             function() {
                 return {
                     restrict: 'E',
                     scope: {
                         paymentInfo: "="
                     },
                     templateUrl: 'shared/directives/confirmation/payment-display/payment-display.html',
                     link: function(scope) {
                     	scope.brandImg = "";
                        setPaymentBrand();

                        function setPaymentBrand() {
                             var brand = scope.paymentInfo ? scope.paymentInfo.getBrand() : null;
                             if (!brand) {
                                 return;
                             }

                             switch(brand.toUpperCase()) {
                                case "VISA":
                                    scope.brandImg = "img/icon_payment_visa@2x.png";
                                    break;
                                case "MASTERCARD":
                                    scope.brandImg = "img/icon_payment_mastercard@2x.png";
                                    break;
                                case "DISCOVER":
                                    scope.brandImg = "img/icon_payment_discover@2x.png";
                                    break;
                                default:
                                    scope.brandImg = "img/icon_payment_amex@2x.png";
                            }
                         }
                     }
                 }
             }
         ]);
 })();
