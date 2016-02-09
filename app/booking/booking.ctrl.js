(function(){
	'use strict';
	angular.module('rare').controller('BookingsCtrl', ["productService", "scheduleService", "appointmentBuilder", "$stateParams", "DatesArray", "localStorageService", "$scope", "$firebaseArray", "constants", "stripeService", BookingsCtrl]);

	function BookingsCtrl(productService, scheduleService, appointmentBuilder, $stateParams, DatesArray, localStorageService, $scope, $firebaseArray, constants, stripeService){
		var vm = this;
		initialize();
		vm.schedule = [];
		vm.showModalContainer = false;

		scheduleService.watch(function(updatedDates){
			vm.dates = updatedDates;
		});

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