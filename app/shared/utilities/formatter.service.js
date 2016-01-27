(function () {

    angular
        .module("rare")
        .factory("formatterService", [formatterService]);

    function formatterService() {
        var service = {
            formatPhoneNumber: formatPhoneNumber
        };

        return service;

        /* method implementations */

        function formatPhoneNumber(phoneNumber){
            if (!phoneNumber){
            	return null;
            }
            
            return phoneNumber.toString().replace(/\D+/g, '');
        }

    }
}());