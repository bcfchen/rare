(function() {
    'use strict';
    angular.module('rare').controller('BookingsCtrl', ["productService", "scheduleService", "appointmentBuilder", "$stateParams", "DatesArray", "$scope", "$firebaseArray", "stripeService", BookingsCtrl]);

    function BookingsCtrl(productService, scheduleService, appointmentBuilder, $stateParams, DatesArray, $scope, $firebaseArray, stripeService) {
        var vm = this;
        var thisMonthsDates = [],
            nextMonthsDates = [],
            bookingSource = null;
            
        initialize();
        vm.schedule = [];
        vm.showModalContainer = false;

        vm.dates = [];

        scheduleService.watch(function(updatedDates) {
            thisMonthsDates = updatedDates;
            vm.dates = thisMonthsDates.concat(nextMonthsDates);
        }, "current", bookingSource);

        scheduleService.watch(function(updatedDates) {
            nextMonthsDates = updatedDates;
            vm.dates = thisMonthsDates.concat(nextMonthsDates);
        }, "next", bookingSource);

        vm.selectDate = function(selection) {
            vm.selectedDate = selection.$id;
            vm.times = selection.times;
            vm.selectedTime = null;
        }

        vm.onDateTimeSelected = function() {
            vm.showModalContainer = true;
        }

        vm.closeModalContainer = function() {
            vm.showModalContainer = false;
        }

        function initialize() {
            var productId = $stateParams.productId;
            bookingSource = $stateParams.source;
            appointmentBuilder.setProductId(productId);
            appointmentBuilder.setSource(bookingSource);
            loadProduct(productId);
            vm.showBookingContainer = true;
        }

        function loadProduct(productId) {
            productService.getProduct(productId).then(function(product) {
                vm.product = product;
                appointmentBuilder.setPrice(product.price);
                appointmentBuilder.setProductName(product.name);
                appointmentBuilder.setAddress(product.address);
            });
        }

    };
})();
