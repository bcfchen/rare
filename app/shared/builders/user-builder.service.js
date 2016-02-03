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
            setStripeCustomerId: setStripeCustomerId,
            build: build
        };

        var user;

        init();

        return service;

        /* method implementations */
        function init() {
            user = new User();
        }

        function setStripeCustomerId(customerId){
            user.setStripeCustomerId(customerId);
            return this;
        }

        function setExpiry(expiry){
            user.getPaymentInfo().setExpiry(expiry);
            return this;
        }

        function setPaymentInfo(paymentInfo){
            user.setPaymentInfo(paymentInfo);
            return this;
        }

        function setAddress(address) {
            user.setAddress(address);
            return this;
        }

        function setFirstName(firstName) {
            user.firstName = firstName;
            return this;
        }

        function setLastName(lastName) {
            user.lastName = lastName;
            return this;
        }

        function setPhoneNumber(phoneNumber) {
            user.phoneNumber = phoneNumber;
            return this;
        }

        function setEmail(email) {
            user.setEmail(email);
            return this;
        }

        function build() {
            return user;
        }

    }
}());
