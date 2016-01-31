(function() {
    'use strict';
    angular.module('rare').value('constants', {
    	FIREBASE_URL: "https://nailartist.firebaseio.com",
    	SERVER_URL: "https://morning-island-6861.herokuapp.com",
    	BUFFER_HOURS: 2,
    	TWILIO_MSG: "Your RARE Nails verification code is ",
    	PRIVACY_POLICY_URL: "http://www.rarenails.co/privacy-policy",
    	CANCELLATION_POLICY_URL: "http://www.rarenails.co/terms-of-use"
    });
})();