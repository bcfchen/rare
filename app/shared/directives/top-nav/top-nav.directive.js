 (function () {
     angular.module('rare')
  .directive('topNav', function () {
      return {
          restrict: 'EA',
          scope:{
          },
		  templateUrl: 'shared/directives/top-nav/top-nav.html',
	      link: function(scope){
	      }
      }
  });
 })();
