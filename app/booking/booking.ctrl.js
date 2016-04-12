(function() {
    'use strict';
    angular.module('rare').controller('BookingsCtrl', BookingsCtrl);

    BookingsCtrl.$inject = ["productService", "scheduleService", "appointmentBuilder", 
    "$stateParams"];

    function BookingsCtrl(productService, scheduleService, 
        appointmentBuilder, $stateParams) {
        var vm = this;
        var thisMonthsDates = [],
            nextMonthsDates = [],
            bookingSource = null;
            
        initialize();

        vm.schedule = [];
        vm.showModalContainer = false;
        vm.dates = [];

        scheduleService.watch(watchScheduleCallback, "current", bookingSource);
        scheduleService.watch(watchScheduleCallback, "next", bookingSource);

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

        /* method implementations */

        function watchScheduleCallback(updatedDates) {
            nextMonthsDates = updatedDates;
            vm.dates = thisMonthsDates.concat(nextMonthsDates);
        }

        function initialize() {
            var productId = $stateParams.productId;
            bookingSource = $stateParams.source;
            appointmentBuilder
                .setProductId(productId)
                .setSource(bookingSource);
            loadProduct(productId);
            vm.showBookingContainer = true;
        }

        function loadProduct(productId) {
            productService.getProduct(productId).then(function(product) {
                vm.product = product;
                appointmentBuilder
                    .setPrice(product.price)
                    .setProductName(product.name)
                    .setAddress(product.address);
            });
        }

    };
})();
