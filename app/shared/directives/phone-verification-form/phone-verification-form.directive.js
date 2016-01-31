 (function () {
     angular.module('rare')
  .directive('phoneVerificationForm', ["userBuilder", "userWorkflow", "TwilioVerification", "constants",
  	function (userBuilder, userWorkflow, TwilioVerification, constants) {
      return {
          restrict: 'E',
          scope:{
          	toWorkflow: "&",
          	toggleParentNav: "&",
          	navHelper:"="
          },
		  templateUrl: 'shared/directives/phone-verification-form/phone-verification-form.html',
	      link: function(scope){
	      	scope.phoneNumber = userBuilder.build().getPhoneNumber();
	      	scope.confirmationCode = undefined;
	      	scope.toggleParentNav({showBackBtn: true});

	          if (scope.navHelper){
	          	scope.navHelper.goBack = function(){
	          		scope.toWorkflow({workflow: userWorkflow.CONTACT_INFO});  
	          	}
	          }

	          scope.resendCode = function(){
	          	TwilioVerification.sendCode(scope.phoneNumber, constants.TWILIO_MSG);
	          }

	          scope.confirmNumber = function(){
	          	scope.isConfirmed = TwilioVerification.verifyCode(scope.confirmationCode);
	          	if (scope.isConfirmed){
	          		scope.toWorkflow({workflow: userWorkflow.PAYMENT_FORM}); 
	          	}
	          }

	      }
      }
  }]);
 })();
