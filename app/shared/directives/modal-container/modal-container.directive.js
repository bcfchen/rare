 (function () {
     angular.module('rare')
  .directive('modalContainer', ["appointmentBuilder", function (appointmentBuilder) {
      return {
          restrict: 'E',
          scope:{
          	onCloseModalClick: "&"
          },
		  templateUrl: 'shared/directives/modal-container/modal-container.html',
	      link: function(scope){
          scope.showSignup = true;
          scope.pickSignupLogin = function(type){

          }
	      }
      }
  }]);
 })();
