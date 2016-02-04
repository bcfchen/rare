 (function() {
     angular.module('rare')
         .directive('processingOrder', [function() {
             return {
                 restrict: 'E',
                 scope: {},
                 templateUrl: 'shared/directives/processing-order/processing-order.html',
                 link: function(scope) {
                 }
             }
         }]);
 })();
