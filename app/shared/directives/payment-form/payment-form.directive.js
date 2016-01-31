 (function () {
     angular.module('rare')
  .directive('paymentForm', ["userBuilder", "userWorkflow", function (userBuilder, userWorkflow) {
      return {
          restrict: 'E',
          scope:{
          	toWorkflow: "&",
          	toggleParentNav: "&"
          },
		  templateUrl: 'shared/directives/payment-form/payment-form.html',
	      link: function(scope){
	      	scope.phoneNumber = angular.copy(userBuilder.build().getPhoneNumber());
	      	scope.email = angular.copy(userBuilder.build().getEmail());
	      	scope.confirmationCode = undefined;
	      	scope.toggleParentNav({showBackBtn: false});

	      	// generate values for stripe form
	      	scope.name = userBuilder.build().getFirstName() + " " + userBuilder.build().getLastName();
	      	var storedAddress = userBuilder.build().getAddress();
			scope.addressLine1 = angular.copy(storedAddress.streetAddress);
			scope.addressLine2 = angular.copy(storedAddress.apartmentNumber);
			scope.addressCity = angular.copy(storedAddress.city);
			scope.addressState = angular.copy(storedAddress.state);
			scope.addressZip = angular.copy(storedAddress.zipCode);
			scope.addressCountry = angular.copy(storedAddress.country);

	          scope.confirmNumber = function(){
	          	scope.isConfirmed = validateCode();
	          	if (scope.isConfirmed){
	          		scope.toWorkflow({workflow: userWorkflow.PAYMENT_FORM}); 
	          	}
	          }

	          scope.validateZipCode = function(zipCode){
	          	return zipCode.toString().length > 4;
	          }

	          scope.handleStripe = function(status, response){
	          	console.log("responded with " + response.id );
	          	scope.toWorkflow({workflow: userWorkflow.CONFIRMATION});  
	          }

	          function validateCode(){
	          	return scope.confirmationCode.length > 4;
	          }

	      }
      }
  }]);
 })();
