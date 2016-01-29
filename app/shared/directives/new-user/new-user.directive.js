 (function () {
     angular.module('rare')
  .directive('newUser', ["userBuilder", "newUserWorkflow", function (userBuilder, newUserWorkflow) {
      return {
          restrict: 'E',
          scope:{
          	onCloseModalClick: "&"
          },
		  templateUrl: 'shared/directives/new-user/new-user.html',
	      link: function(scope){
	          scope.workflow = getCurrentWorkflow();
	          scope.pickSignupLogin = function(type){

	          }

	          scope.toWorkflow = function(workflow){
	          	scope.workflow = workflow;
	          }

	          function getCurrentWorkflow(){
	          	return newUserWorkflow.ADDRESS;
	          }
	      }
      }
  }]);
 })();
