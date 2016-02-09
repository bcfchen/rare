 (function() {
     angular.module('rare')
         .directive('signupLoginPicker', [function() {
             return {
                 restrict: 'E',
                 scope: {
                     onPick: "&",
                     showSignup: "="
                 },
                 templateUrl: 'shared/directives/signup-login-picker/signup-login-picker.html',
                 link: function(scope) {
                     scope.pickSignup = function() {
                         scope.showSignup = true;
                         scope.onPick({
                             type: "signup"
                         });
                     }

                     scope.pickLogin = function() {
                         scope.showSignup = false;
                         scope.onPick({
                             type: "login"
                         });
                     }
                 }
             }
         }]);
 })();
