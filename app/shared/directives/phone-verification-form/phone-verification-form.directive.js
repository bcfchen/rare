 (function () {
     angular.module('rare')
  .directive('phoneVerificationForm', ["userBuilder", "newUserWorkflow", function (userBuilder, newUserWorkflow) {
      return {
          restrict: 'E',
          scope:{
          	toWorkflow: "&"
          },
		  templateUrl: 'shared/directives/phone-verification-form/phone-verification-form.html',
	      link: function(scope){
	      	scope.phoneNumber = userBuilder.build().getPhoneNumber();
	      	scope.confirmationCode = undefined;

	          scope.goBack = function(){
	          	scope.toWorkflow({workflow: newUserWorkflow.CONTACT_INFO});  
	          };

	          scope.confirmNumber = function(){
	          	scope.isConfirmed = validateCode();
	          	if (scope.isConfirmed){
	          		scope.toWorkflow({workflow: newUserWorkflow.PAYMENT_FORM}); 
	          	}
	          }

	          function validateCode(){
	          	return scope.confirmationCode.toString().length > 4;
	          }

	      }
      }
  }]);
 })();
