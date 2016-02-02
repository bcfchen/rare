(function() {

    angular
        .module("rare")
        .factory("userBuilder", [userBuilder]);

    function userBuilder() {
        var service = {
            setAddress: setAddress,
            setFirstName: setFirstName,
            setLastName: setLastName,
            setPhoneNumber: setPhoneNumber,
            setExpiry: setExpiry,
            setEmail: setEmail,
            setPaymentInfo: setPaymentInfo,
            build: build
        };

        var user;

        init();

        return service;

        /* method implementations */
        function init() {
            user = new User();
        }

        function setExpiry(expiry){
            user.getPaymentInfo().setExpiry(expiry);
        }

        function setPaymentInfo(paymentInfo){
            user.setPaymentInfo(paymentInfo);
        }

        function setAddress(address) {
            user.setAddress(address);
        }

        function setFirstName(firstName) {
            user.firstName = firstName;
        }

        function setLastName(lastName) {
            user.lastName = lastName;
        }

        function setPhoneNumber(phoneNumber) {
            user.phoneNumber = phoneNumber;
        }

        function setEmail(email) {
            user.setEmail(email);
        }

        function build() {
            return user;
        }

    }
}());
