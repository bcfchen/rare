 (function () {
     angular.module('rare')
  .directive('paymentForm', ["userBuilder", "newUserWorkflow", function (userBuilder, newUserWorkflow) {
      return {
          restrict: 'E',
          scope:{
          	toWorkflow: "&"
          },
		  templateUrl: 'shared/directives/payment-form/payment-form.html',
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

	          scope.handleStripe = function(status, response){
	          	alert("responded with " + response.id );
	          }

	          function validateCode(){
	          	return scope.confirmationCode.length > 4;
	          }

	      }
      }
  }]);
 })();
