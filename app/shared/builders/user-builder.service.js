(function () {

    angular
        .module("rare")
        .factory("userBuilder", [userBuilder]);

    function userBuilder() {
        var service = {
            setAddress: setAddress,
            setFirstName: setFirstName,
            setLastName: setLastName,
            setPhoneNumber: setPhoneNumber,
            setEmail: setEmail,
            build: build
        };

        var user;

        init();

        return service;

        /* method implementations */
        function init(){
            user = new User();
        }

        function setAddress(address){
        	user.setAddress(address);
        }

        function setFirstName(firstName){
        	user.firstName = firstName;
        }

        function setLastName(lastName){
            user.lastName = lastName;
        }

        function setPhoneNumber(phoneNumber){
        	user.phoneNumber = phoneNumber;
        }

        function setEmail(email){
        	user.email = email;
        }

        function build(){
        	return user;
        }

    }
}());