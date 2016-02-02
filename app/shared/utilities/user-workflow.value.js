(function() {
    'use strict';
    angular.module('rare').value('userWorkflow', {
    	ADDRESS: "address",
    	CONTACT_INFO: "contactInfo",
    	VERIFY_PHONE: "verifyPhone",
    	PAYMENT_FORM: "paymentForm",
    	CONFIRMATION: "confirmation",
    	ORDER_SUCCESS: "orderSuccess"
    });
})();