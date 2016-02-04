 (function() {
     angular.module('rare')
         .directive('orderSuccess', ["userBuilder", "userWorkflow",  
            function(userBuilder, userWorkflow) {
         return {
                 restrict: 'E',
                 scope: {
                     toWorkflow: "&",
                     toggleParentNav: "&",
                     closeModal: "&"
                 },
                 templateUrl: 'shared/directives/order-success/order-success.html',
                 link: function(scope) {
                     scope.toggleParentNav({
                         showBackBtn: false
                     });

                     scope.user = userBuilder.build();
                     scope.close = function(){
                     	scope.closeModal();
                     }
             }
         }}]);
 })();
