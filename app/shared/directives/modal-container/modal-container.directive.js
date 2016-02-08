 (function() {
     angular.module('rare')
         .directive('modalContainer', ["appointmentBuilder", function(appointmentBuilder) {
             return {
                 restrict: 'E',
                 scope: {
                     onCloseModalClick: "&"
                  },
                 templateUrl: 'shared/directives/modal-container/modal-container.html',
                 link: function(scope) {
                     scope.showBackBtn = false;
                     scope.showSignup = true;
                     scope.navHelper = {};
                     scope.showPicker = true;

                     scope.clickGoBack = function() {
                         if (scope.navHelper.goBack) {
                             scope.navHelper.goBack();
                         }
                     }

                     scope.toggleNavBtns = function(showBackBtn, showPicker) {
                         scope.showBackBtn = showBackBtn;
                         scope.showPicker = showPicker;
                     };

                     scope.pickSignupLogin = function(type) {
                         if (type === "signup") {
                             scope.showSignup = true;
                         } else {
                             scope.showSignup = false;
                         }
                     }
                 }
             }
         }]);
 })();
