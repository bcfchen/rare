 (function () {
     angular.module('rare')
  .directive('existingUser', ["userBuilder", "userWorkflow", function (userBuilder, userWorkflow) {
      return {
          restrict: 'E',
          scope:{
          	closeModal: "&",
          	toggleNavBtns:"&",
          	navHelper:"="
          },
		  templateUrl: 'shared/directives/existing-user/existing-user.html',
	      link: function(scope){
	          scope.workflow = getCurrentWorkflow();

	          scope.toggleParentNav = function(showBackBtn){
	          	scope.toggleNavBtns({showBackBtn: showBackBtn});
	          }

	          scope.pickSignupLogin = function(type){

	          }

	          scope.toWorkflow = function(workflow){
	          	scope.workflow = workflow;
	          }

	          function getCurrentWorkflow(){
	          	return userWorkflow.LOGIN;
	          }
	      }
      }
  }]);
 })();
