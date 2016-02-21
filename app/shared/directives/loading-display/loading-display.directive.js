 (function() {
     angular.module('rare')
         .directive('loadingDisplay', [function() {
             return {
                 restrict: 'E',
                 scope: {
                    displayText: "@"
                 },
                 templateUrl: 'shared/directives/loading-display/loading-display.html',
                 link: function(scope) {
                 }
             }
         }]);
 })();
