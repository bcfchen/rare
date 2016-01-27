(function(){
	'use strict';
	angular.module('rare').controller('BookingsCtrl', ["productService", "scheduleService", "appointmentBuilder", "$stateParams", "DatesArray", "localStorageService", "$scope", "$firebaseArray", "constants", "stripeService", BookingsCtrl]);

	function BookingsCtrl(productService, scheduleService, appointmentBuilder, $stateParams, DatesArray, localStorageService, $scope, $firebaseArray, constants, stripeService){
		var vm = this;
		initialize();
		vm.schedule = [];
		vm.showUserInfo = false;
		vm.showPhoneVerification = false;
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

		scheduleService.getFutureDates().then(function(dates){
			vm.dates = dates;// scheduleProcessorService.processDateProperties(dates);
			// var firstAvailableDate = _.find(vm.schedule, function(date){ return date.isAvailable() === true});
			// if (firstAvailableDate){
			// 	vm.selectDate(firstAvailableDate);
			// }
		});

		vm.selectDate = function(selection){
			vm.selectedDate = selection.$id;
			vm.times = selection.times; 
			vm.selectedTime = null;
		}

		vm.onDateTimeSelected = function(){
			vm.showUserInfo = true;
		}

		vm.closeUserInfo = function(){
			vm.showUserInfo = false;
		}

		vm.verifyPhone = function(){
			vm.showUserInfo = false;
			vm.showPhoneVerification = true;
		}

		function initialize(){
			var productId = $stateParams.productId;
			appointmentBuilder.setProductId(productId);
			loadProduct(productId);
			vm.showBookingContainer = true;
			// vm.product = userSelectionService.product;
			vm.user = localStorageService.getUser();
		}

		function loadProduct(productId){
			productService.getProduct(productId).then(function(product){
				vm.product = product;
			});
		}

	};
})();