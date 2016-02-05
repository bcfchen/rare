 (function() {
     angular.module('rare')
         .directive('addressForm', ["fromConfirmation", "userBuilder", "userWorkflow", "addressValidator", 
          function(fromConfirmation, userBuilder, userWorkflow, addressValidator) {
             return {
                 restrict: 'EA',
                 scope: {
                     toWorkflow: "&",
                     toggleParentNav: "&"
                 },
                 templateUrl: 'shared/directives/address-form/address-form.html',
                 link: function(scope) {
                     // initialize values of address to display
                     scope.address = new Address(angular.copy(userBuilder.build().getAddress()));
                     scope.toggleParentNav({
                         showBackBtn: false
                     });

                     scope.validateZipcode = function(zipCode) {
                         return addressValidator.validateZipCode(zipCode);
                     }

                     scope.myOnSubmitFunction = function() {
                         return true;
                     }
                     scope.submitAddress = function() {
                         userBuilder.setAddress(scope.address);
                         if (fromConfirmation.FROM_CONFIRMATION) {
                             scope.toWorkflow({
                                 workflow: userWorkflow.CONFIRMATION
                             });
                         } else {
                             scope.toWorkflow({
                                 workflow: userWorkflow.CONTACT_INFO
                             });
                         }
                     };
                 }
             }
         }]);
 })();
