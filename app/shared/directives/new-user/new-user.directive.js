 (function () {
     angular.module('rare')
  .directive('newUser', ["userBuilder", "newUserWorkflow", function (userBuilder, newUserWorkflow) {
      return {
          restrict: 'E',
          scope:{
          	onCloseModalClick: "&",
          	toggleNavBtns:"&",
          	navHelper:"="
          },
		  templateUrl: 'shared/directives/new-user/new-user.html',
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
	          	return newUserWorkflow.ADDRESS;
	          }
	      }
      }
  }]);
 })();
