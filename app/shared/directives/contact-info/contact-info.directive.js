 (function () {
     angular.module('rare')
  .directive('contactInfo', ["userBuilder", "newUserWorkflow", "userValidator", function (userBuilder, newUserWorkflow, userValidator) {
      return {
          restrict: 'E',
          scope:{
          	toWorkflow: "&"
          },
		  templateUrl: 'shared/directives/contact-info/contact-info.html',
	      link: function(scope){
	      	scope.user = userBuilder.build();
	      	scope.validatePhoneNumber = function(phoneNumber){
	      		return userValidator.isValidPhoneNumber(phoneNumber);
	      	};

	          scope.signUp = function(){
	          		userBuilder.setFirstName(scope.user.firstName);
	          		userBuilder.setLastName(scope.user.lastName);
	          		userBuilder.setPhoneNumber(scope.user.phoneNumber);

		          	scope.toWorkflow(
		          		{workflow: newUserWorkflow.VERIFY_PHONE}
		          	);
	          };

	          scope.goBack = function(){
	          	scope.toWorkflow({workflow: newUserWorkflow.ADDRESS});  
	          };

	      }
      }
  }]);
 })();
