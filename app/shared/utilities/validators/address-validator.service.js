(function () {

    angular
        .module("rare")
        .factory("addressValidator", [addressValidator]);

    function addressValidator() {
        var service = {
            validate: validate,
            validateZipCode: validateZipCode
        };

        var SF_ZIPCODES = [94102,94103,94104,94105,94107,94108,94109,94110,94111,94114,94115,94117,94118,94121,94122,94123,94129,94133,94158];

        return service;

        /* method implementations */

        function validate(address){
            var streetValid = isValidValue(address.streetAddress);
            var apartmentValid = isValidValue(address.apartmentNumber);
            var zipValid = validateZipCode(address.zipCode);

            return {
                streetAddress: streetValid,
                apartmentNumber: apartmentValid,
                zipCode: zipValid
            };
        }

        function validateZipCode(zipCode){
            if (!zipCode){
                return false;
            }

            return SF_ZIPCODES.indexOf(Number(zipCode)) > -1;
        }

        function isValidValue(value){
            return value !== null && value !== undefined && value.length > 0;
        }
    }
}());