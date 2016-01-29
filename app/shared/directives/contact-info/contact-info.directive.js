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
	          scope.signUp = function(){
	          	scope.isValid = userValidator.validate(scope.user);
	          	var allValid = scope.isValid.firstName 
	          				&& scope.isValid.lastName
	          				&& scope.isValid.phoneNumber;

	          	if (allValid){
	          		userBuilder.setFirstName(scope.user.firstName);
	          		userBuilder.setLastName(scope.user.lastName);
	          		userBuilder.setPhoneNumber(scope.user.phoneNumber);

		          	scope.toWorkflow(
		          		{workflow: newUserWorkflow.VERIFY_PHONE}
		          	);
	          	}
	          };

	          scope.goBack = function(){
	          	scope.toWorkflow({workflow: newUserWorkflow.ADDRESS});  
	          };

	      }
      }
  }]);
 })();
