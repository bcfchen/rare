(function () {

    angular
        .module("rare")
        .factory("userValidator", [userValidator]);

    function userValidator() {
        var service = {
            validate: validate,
            isValidPhoneNumber: isValidPhoneNumber
        };

        return service;

        /* method implementations */

        function validate(user){
            var firstNameValid = isValidValue(user.firstName);
            var lastNameValid = isValidValue(user.lastName);
            var phoneNumberValid = isValidPhoneNumber(user.phoneNumber);

            return {
                firstName: firstNameValid,
                lastName: lastNameValid,
                phoneNumber: phoneNumberValid
            };
        }

        function isValidPhoneNumber(phoneNumber){
        	if (!phoneNumber){
        		return false;
        	}
        	
        	var isValid = false;
            phoneNumber = phoneNumber.replace(/\D/g,'');
			var PHONE_REGEXP = /^[(]{0,1}[0-9]{3}[)\.\- ]{0,1}[0-9]{3}[\.\- ]{0,1}[0-9]{4}$/;

        	return PHONE_REGEXP.test(phoneNumber);
        }

        function isValidValue(value){
            return value !== null && value !== undefined && value.length > 0;
        }
    }
}());