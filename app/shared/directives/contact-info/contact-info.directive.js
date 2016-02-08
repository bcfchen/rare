 (function () {
     angular.module('rare')
  .directive('contactInfo', ["constants", "appointmentBuilder", "userBuilder", "userWorkflow", "userValidator", "TwilioVerification", 
  	function (constants, appointmentBuilder, userBuilder, userWorkflow, userValidator, TwilioVerification) {
      return {
          restrict: 'E',
          scope:{
          	toWorkflow: "&",
          	toggleParentNav:"&",
          	navHelper: "="
          },
		  templateUrl: 'shared/directives/contact-info/contact-info.html',
	      link: function(scope){
	      	scope.showPicker = false;
	      	scope.user = userBuilder.build();
	      	scope.toggleParentNav({showBackBtn: true, showPicker: false});

	      	scope.validatePhoneNumber = function(phoneNumber){
	      		return userValidator.isValidPhoneNumber(phoneNumber);
	      	};

	          scope.signUp = function(){
	          		userBuilder.setFirstName(scope.user.firstName)
	          		.setLastName(scope.user.lastName)
	          		.setPhoneNumber(scope.user.phoneNumber);
	          		appointmentBuilder.setPhoneNumber(scope.user.phoneNumber);

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
