 (function() {
     angular.module('rare')
         .directive('paymentForm', ["userBuilder", "userWorkflow", "apointmentBuilder", function(userBuilder, userWorkflow, apointmentBuilder) {
             return {
                 restrict: 'E',
                 scope: {
                     toWorkflow: "&",
                     toggleParentNav: "&"
                 },
                 templateUrl: 'shared/directives/payment-form/payment-form.html',
                 link: function(scope) {
                     scope.toggleParentNav({
                         showBackBtn: false
                     });

                     // generate values for stripe form
                     initialize();

                     scope.confirmNumber = function() {
                         scope.isConfirmed = validateCode();
                         if (scope.isConfirmed) {
                             scope.toWorkflow({
                                 workflow: userWorkflow.PAYMENT_FORM
                             });
                         }
                     }

                     scope.validateZipCode = function(zipCode) {
                         return zipCode.toString().length > 4;
                     }

                     scope.handleStripe = function(status, response) {
                         if (status !== "200"){
                         	alert("Stripe payment failed!");
                         	return ;
                         }

                         stripeService.upsertStripeCustomer(response.id, user.getStripeCustomerId()).then(function(){
	                         scope.toWorkflow({
	                             workflow: userWorkflow.CONFIRMATION
	                         });
                         });
                     }

                     function initialize(){
                     	var user = userBuilder.build(),
                     		appointment = appointmentBuilder.build(),
                     		stripeCustomerId = user.getStripeCustomerId();
                     
                     	scope.name = user.getFirstName() + " " + user.getLastName();
						scope.price = appointment.getProduct().price;

                     	if (stripeCustomerId){
                     		// retrieve info from stripe
                     		stripeService.getCustomer(stripeCustomerId).then(function(customer){
                     			initBillingAddress(customer);
                     			initPaymentInfo(customer);
                     		});
                     	} else {
                     		// populate defaults
                     		var address = user.getAddress();
                     		initBillingAddress(address);
                     		initPaymentInfo(user);
                     	}
                     }

                     function initPaymentInfo(source){
                     	scope.email = source.email;
                     	if (source typeOf StripeCustomer){
                     		scope.expiry = source.exp_month + "/" + source.exp_year;
                     	}
                     }

                     function initBillingAddress(source){
                     	if (source typeOf StripeCustomer){
                     		scope.addressLine1 = angular.copy(source.address_line1);
		                    scope.addressLine2 = angular.copy(source.address_line2);
		                    scope.addressCity = angular.copy(source.address_city);
		                    scope.addressState = angular.copy(source.address_state);
		                    scope.addressZip = angular.copy(source.address_zip);
		                    scope.addressCountry = angular.copy(source.address_country);
                     	} else {
                     		scope.addressLine1 = angular.copy(source.streetAddress);
		                    scope.addressLine2 = angular.copy(source.apartmentNumber);
		                    scope.addressCity = angular.copy(source.city);
		                    scope.addressState = angular.copy(source.state);
		                    scope.addressZip = angular.copy(source.zipCode);
		                    scope.addressCountry = angular.copy(source.country);
                     	}
                     }

                 }
             }
         }]);
 })();
