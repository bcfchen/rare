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
              scope.validateZipcode = function(zipCode){
                return addressValidator.validateZipCode(zipCode);
              }

              scope.myOnSubmitFunction = function(){
                return true;
              }
	          scope.submitAddress = function(){
                userBuilder.setAddress(scope.address);
  	          	scope.toWorkflow({workflow: newUserWorkflow.CONTACT_INFO});  
	          };
	      }
      }
  }]);
 })();
