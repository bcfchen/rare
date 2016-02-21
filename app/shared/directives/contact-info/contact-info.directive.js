 (function () {
     angular.module('rare')
  .directive('contactInfo', ["constants", "appointmentBuilder", "userBuilder", "userWorkflow", "userValidator", "authService", 
  	function (constants, appointmentBuilder, userBuilder, userWorkflow, userValidator, authService) {
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
	      	scope.isProcessing = false;

	      	scope.validatePhoneNumber = function(phoneNumber){
	      		return userValidator.isValidPhoneNumber(phoneNumber);
	      	};

	          scope.signUp = function(){
	          		scope.isProcessing = true;
	          		userBuilder.setFirstName(scope.user.firstName)
	          		.setLastName(scope.user.lastName)
	          		.setPhoneNumber(scope.user.phoneNumber);
	          		appointmentBuilder.setPhoneNumber(scope.user.phoneNumber);

	          		authService.sendCode(scope.user.phoneNumber)
	          		.then(function(){
	          			scope.isProcessing = false;
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
