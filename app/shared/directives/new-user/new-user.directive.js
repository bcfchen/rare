 (function () {
     angular.module('rare')
  .directive('newUser', ["userBuilder", "userWorkflow", function (userBuilder, userWorkflow) {
      return {
          restrict: 'E',
          scope:{
          	closeModal: "&",
          	toggleNavBtns:"&",
          	navHelper:"="
          },
		  templateUrl: 'shared/directives/new-user/new-user.html',
	      link: function(scope){
	          scope.workflow = getCurrentWorkflow();

	          scope.toggleParentNav = function(showBackBtn, showPicker){
	          	scope.toggleNavBtns({showBackBtn: showBackBtn, showPicker: showPicker});
	          }

	          scope.pickSignupLogin = function(type){
	          	
	          }

	          scope.toWorkflow = function(workflow){
	          	scope.workflow = workflow;
	          }

	          function getCurrentWorkflow(){
	          	return userWorkflow.ADDRESS;
	          }
	      }
      }
  }]);
 })();
