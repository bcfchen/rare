 (function () {
     angular.module('rare')
  .directive('phoneVerificationForm', ["userBuilder", "newUserWorkflow", function (userBuilder, newUserWorkflow) {
      return {
          restrict: 'EA',
          scope:{
          	toWorkflow: "&"
          },
		  templateUrl: 'shared/directives/phone-verification-form/phone-verification-form.html',
	      link: function(scope){
	          scope.goBack = function(){
	          	scope.toWorkflow({workflow: newUserWorkflow.CONTACT_INFO});  
	          };
	      }
      }
  }]);
 })();
