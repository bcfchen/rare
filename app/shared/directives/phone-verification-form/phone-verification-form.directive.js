 (function() {
     angular.module('rare')
         .directive('phoneVerificationForm', ["firebaseAccessService", "userBuilder", "userWorkflow", "authService", "constants",
             function(firebaseAccessService, userBuilder, userWorkflow, authService, constants) {
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
                                 var workflow = scope.isNewUser ? userWorkflow.CONTACT_INFO : userWorkflow.LOGIN;
                                 scope.toWorkflow({
                                     workflow: workflow
                                 });
                             }
                         }

                         scope.resendCode = function() {
                             authService.sendCode(scope.phoneNumber);
                         }

                         scope.confirmNumber = function() {
                             authService.auth(scope.phoneNumber, scope.confirmationCode).then(function(authData) {


                                 if (scope.isNewUser) {
                                     userBuilder.setUid(authData.uid);
                                     scope.toWorkflow({
                                         workflow: userWorkflow.PAYMENT_FORM
                                     });
                                 } else {
                                     firebaseAccessService.getUser(scope.phoneNumber).then(function(retrievedUser) {
                                         if (retrievedUser && retrievedUser.firstName) {
                                             userBuilder.init(retrievedUser);
                                             userBuilder.setUid(authData.uid);
                                             scope.toWorkflow({
                                                 workflow: userWorkflow.CONFIRMATION
                                             });
                                         } else {
                                             alert("Sorry, but your phone number cannot be found");
                                         }
                                     });
                                 }
                             }, function error(err) {
                                 alert(err);
                             });

                         }

                     }
                 }
             }
         ]);
 })();
