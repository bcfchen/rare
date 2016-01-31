 (function () {
     angular.module('rare')
  .directive('loginForm', ["constants", "userBuilder", "userWorkflow", "userValidator", "TwilioVerification", function (constants, userBuilder, userWorkflow, userValidator, TwilioVerification) {
      return {
          restrict: 'E',
          scope:{
          	toWorkflow: "&",
          	toggleParentNav:"&"
          },
		  templateUrl: 'shared/directives/login-form/login-form.html',
	      link: function(scope){
	      	scope.user = userBuilder.build();
	      	scope.toggleParentNav({showBackBtn: false});

	      	scope.validatePhoneNumber = function(phoneNumber){
	      		return userValidator.isValidPhoneNumber(phoneNumber);
	      	};

	          scope.signUp = function(){
	          		userBuilder.setFirstName(scope.user.firstName);
	          		userBuilder.setLastName(scope.user.lastName);
	          		userBuilder.setPhoneNumber(scope.user.phoneNumber);

	          		TwilioVerification.sendCode(scope.user.phoneNumber, constants.TWILIO_MSG)
	          		.then(function(){
			          	scope.toWorkflow(
			          		{workflow: userWorkflow.VERIFY_PHONE}
			          	);
	          		});
	          };


	          if (scope.navHelper){
	          	scope.navHelper.goBack = function(){
	          		scope.toWorkflow({workflow: userWorkflow.ADDRESS});  
	          	}
	          }
	      }
      }
  }]);
 })();
