(function () {

    angular
        .module("rare")
        .factory("cardValidator", [cardValidator]);

    function cardValidator() {
        var service = {
            validate: validate
        };

        return service;

        /* method implementations */

        function validate(card){
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