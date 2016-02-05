(function(){
	'use strict';
	angular.module('rare').controller('BookingsCtrl', ["productService", "scheduleService", "appointmentBuilder", "$stateParams", "DatesArray", "localStorageService", "$scope", "$firebaseArray", "constants", "stripeService", BookingsCtrl]);

	function BookingsCtrl(productService, scheduleService, appointmentBuilder, $stateParams, DatesArray, localStorageService, $scope, $firebaseArray, constants, stripeService){
		var vm = this;
		initialize();
		vm.schedule = [];
		vm.showModalContainer = false;
		// rawSchedule.$watch(function(event){
		// 	// only do this if we already have a selected date
		// 	if (!isFirstLoad){
		// 		var incomingObj = rawSchedule.$getRecord(event.key);
		// 		vm.schedule = updateSchedule(vm.schedule, incomingObj);
		// 		vm.schedule = scheduleProcessorService.processDateProperties(vm.schedule);
		// 		var firstAvailableDate = _.find(vm.schedule, function(date){ return date.available === true});
		// 		if (firstAvailableDate){
		// 			vm.selectDate(firstAvailableDate);
		// 		} else {
		// 			vm.times = [];
		// 		}
		// 	}
		// });

		scheduleService.watch(function(updatedDates){
			vm.dates = updatedDates;
		});

		// scheduleService.getFutureDates().then(function(dates){
		// 	vm.dates = dates;
		// });

		vm.selectDate = function(selection){
			vm.selectedDate = selection.$id;
			vm.times = selection.times; 
			vm.selectedTime = null;
		}

		vm.onDateTimeSelected = function(){
			vm.showModalContainer = true;
		}

		vm.closeModalContainer = function(){
			vm.showModalContainer = false;
		}

		function initialize(){
			var productId = $stateParams.productId;
			appointmentBuilder.setProductId(productId);
			loadProduct(productId);
			vm.showBookingContainer = true;
			vm.user = localStorageService.getUser();
		}

		function loadProduct(productId){
			productService.getProduct(productId).then(function(product){
				vm.product = product;
				appointmentBuilder.setPrice(product.price);
				appointmentBuilder.setProductName(product.name);
			});
		}

	};
})();