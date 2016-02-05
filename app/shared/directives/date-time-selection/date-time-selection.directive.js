 (function() {
     angular.module('rare')
         .directive('dateTimeSelection', ["appointmentBuilder", function(appointmentBuilder) {
             return {
                 restrict: 'EA',
                 scope: {
                     datesList: "=",
                     onDateTimeSelected: "&"
                 },
                 templateUrl: 'shared/directives/date-time-selection/date-time-selection.html',
                 link: function(scope) {
                     scope.isBookingValid = true;
                     scope.$watch("datesList", function(dates) {
                         if (!dates) {
                             return;
                         }

                         scope.dates = dates;
                         selectDefaultDate(dates);
                     });

                     // scope.selectedDate is auto-updated since that is ng-model
                     scope.selectDate = function() {
                         appointmentBuilder.setDate(JSON.parse(JSON.stringify(scope.selectedDate)));
                         selectDefaultTime(scope.selectedDate);
                     }

                     // scope.selectedTime is auto-updated since that is ng-model
                     scope.selectTime = function() {
                         appointmentBuilder.setTime(JSON.parse(JSON.stringify(scope.selectedTime)));
                     }

                     scope.onClick = function() {
                         if (appointmentBuilder.getDate() && appointmentBuilder.getTime()) {
                             scope.isBookingValid = true;
                             scope.onDateTimeSelected();
                         } else {
                             scope.isBookingValid = false;
                         }
                     }

                     /* internal methods */
                     function selectDefaultTime(date) {
                         var firstAvailableTime = _.find(date.times, function(time) {
                             return time.isAvailable() === true
                         });
                         scope.selectedTime = firstAvailableTime;
                         scope.selectTime();
                         if (firstAvailableTime) {
                             scope.isBookingValid = true;
                         }
                     }

                     function selectDefaultDate(dates) {
                         var firstAvailableDate = _.find(dates, function(date) {
                             return date.isAvailable() === true
                         });
                         if (firstAvailableDate) {
                             scope.selectedDate = firstAvailableDate;
                             scope.selectDate();
                         }
                     }

                 }
             }
         }]);
 })();
