 (function () {
     angular.module('rare')
  .directive('addressForm', ["userBuilder", "newUserWorkflow", "addressValidator", function (userBuilder, newUserWorkflow, addressValidator) {
      return {
          restrict: 'EA',
          scope:{
          	toWorkflow: "&"
          },
		  templateUrl: 'shared/directives/address-form/address-form.html',
	      link: function(scope){
            // initialize values of address to display
            scope.address = new Address(angular.copy(userBuilder.build().getAddress()));

	          scope.submitAddress = function(){

              scope.isValid = addressValidator.validate(scope.address);
              var allValid = scope.isValid.streetAddress 
                          && scope.isValid.apartmentNumber 
                          && scope.isValid.zipCode;
              if (allValid){
                userBuilder.setAddress(scope.address);
  	          	scope.toWorkflow({workflow: newUserWorkflow.CONTACT_INFO});  
              }
	          };
	      }
      }
  }]);
 })();
