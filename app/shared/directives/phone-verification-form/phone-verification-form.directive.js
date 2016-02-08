 (function() {
     angular.module('rare')
         .directive('phoneVerificationForm', ["firebaseAccessService", "userBuilder", "userWorkflow", "TwilioVerification", "constants",
             function(firebaseAccessService, userBuilder, userWorkflow, TwilioVerification, constants) {
                 return {
                     restrict: 'E',
                     scope: {
                         toWorkflow: "&",
                         toggleParentNav: "&",
                         navHelper: "=",
                         isNewUser: "="
                     },
                     templateUrl: 'shared/directives/phone-verification-form/phone-verification-form.html',
                     link: function(scope) {
                         scope.phoneNumber = userBuilder.build().getPhoneNumber();
                         scope.confirmationCode = undefined;
                         scope.toggleParentNav({
                             showBackBtn: true,
                             showPicker: false
                         });

                         if (scope.navHelper) {
                             scope.navHelper.goBack = function() {
                                 scope.toWorkflow({
                                     workflow: userWorkflow.CONTACT_INFO
                                 });
                             }
                         }

                         scope.resendCode = function() {
                             TwilioVerification.sendCode(scope.phoneNumber, constants.TWILIO_MSG);
                         }

                         scope.confirmNumber = function() {
                             // scope.toWorkflow({
                             //     workflow: userWorkflow.PAYMENT_FORM
                             // });
                             scope.isConfirmed = TwilioVerification.verifyCode(scope.confirmationCode);
                             if (scope.isConfirmed) {
                                 if (scope.isNewUser) {
                                     scope.toWorkflow({
                                         workflow: userWorkflow.PAYMENT_FORM
                                     });
                                 } else {
                                     firebaseAccessService.getUser(scope.phoneNumber).then(function(retrievedUser){
                                        userBuilder.init(retrievedUser);
                                         scope.toWorkflow({
                                             workflow: userWorkflow.CONFIRMATION
                                         });
                                     });
                                 }
                             }
                         }

                     }
                 }
             }
         ]);
 })();
