 (function () {
     angular.module('rare')
  .directive('existingUser', ["userBuilder", "existingUserWorkflow", function (userBuilder, existingUserWorkflow) {
      return {
          restrict: 'EA',
          scope:{
          	onCloseModalClick: "&"
          },
		  templateUrl: 'shared/directives/existing-user/existing-user.html',
	      link: function(scope){
	          scope.workflow = getCurrentWorkflow();
	          scope.pickSignupLogin = function(type){

	          }

	          scope.toWorkflow = function(workflow){
	          	scope.workflow = workflow;
	          }

	          function getCurrentWorkflow(){
	          	return existingUserWorkflow.ADDRESS;
	          }
	      }
      }
  }]);
 })();
