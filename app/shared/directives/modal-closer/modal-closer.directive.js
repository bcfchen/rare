 (function () {
     angular.module('rare')
  .directive('modalCloser', [function () {
      return {
          restrict: 'E',
          scope:{},
		  templateUrl: 'shared/directives/modal-closer/modal-closer.html',
	      link: function(scope){
	      }
      }
  }]);
 })();
