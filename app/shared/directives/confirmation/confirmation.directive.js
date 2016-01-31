 (function () {
     angular.module('rare')
  .directive('confirmation', ["constants", "userBuilder", "userWorkflow", "userValidator", "TwilioVerification", function (constants, userBuilder, userWorkflow, userValidator, TwilioVerification) {
      return {
          restrict: 'E',
          scope:{
          	toWorkflow: "&",
          	toggleParentNav:"&",
          	navHelper: "="
          },
		  templateUrl: 'shared/directives/confirmation/confirmation.html',
	      link: function(scope){
	      	scope.user = userBuilder.build();
	      	scope.toggleParentNav({showBackBtn: true});



	          if (scope.navHelper){
	          	scope.navHelper.goBack = function(){
	          		scope.toWorkflow({workflow: userWorkflow.PAYMENT_FORM});  
	          	}
	          }
	      }
      }
  }]);
 })();
