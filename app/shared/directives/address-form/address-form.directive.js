 (function() {
     angular.module('rare')
         .directive('addressForm', ["fromConfirmation", "userBuilder", "userWorkflow", "addressValidator", "appointmentBuilder",

             function(fromConfirmation, userBuilder, userWorkflow, addressValidator, appointmentBuilder) {
                 return {
                     restrict: 'EA',
                     scope: {
                         toWorkflow: "&",
                         toggleParentNav: "&",
                         showPicker: "="
                     },
                     templateUrl: 'shared/directives/address-form/address-form.html',
                     link: function(scope) {
                         /* if there is already appointment address (when coming from business)
                            then use appointment address, else get address from user
                         */
                         var appointmentAddress = appointmentBuilder.build().getAddress();
                         scope.address = appointmentAddress ? appointmentAddress : new Address(angular.copy(userBuilder.build().getAddress()));

                         scope.toggleParentNav({
                             showBackBtn: false,
                             showPicker: true
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
             }
         ]);
 })();
