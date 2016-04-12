(function() {

    angular
        .module("rare")
        .factory("userBuilder", userBuilder);

    function userBuilder() {
        var service = {
            init: init,
            setAddress: setAddress,
            setFirstName: setFirstName,
            setLastName: setLastName,
            setPhoneNumber: setPhoneNumber,
            setExpiry: setExpiry,
            setEmail: setEmail,
            setPaymentBrand: setPaymentBrand,
            setPaymentInfo: setPaymentInfo,
            setPaymentAddress: setPaymentAddress,
            setStripeCustomerId: setStripeCustomerId,
            setCardNumber: setCardNumber,
            setPassword: setPassword,
            setUid: setUid,
            build: build
        };

        var user;

        init();

        return service;

        /* method implementations */
        function init(obj) {
            if (obj){
                // avoid user input getting overridden by new (empty) user data
                var existingAddress = user.getAddress();
                user = obj instanceof User ? obj : new User(obj);
                if (existingAddress){
                    user.setAddress(existingAddress);
                }
            } else {
                user = new User();
            }
        }

        function setUid(uid){
            user.setUid(uid);
            return this;
        }

        function setPassword(password){
            user.setPassword(password);
            return this;
        }

        function setCardNumber(cardNumber){
            user.setCardNumber(cardNumber);
            return this;
        }

        function setStripeCustomerId(customerId){
            user.setStripeCustomerId(customerId);
            return this;
        }

        function setExpiry(expiry){
            user.getPaymentInfo().setExpiry(expiry);
            return this;
        }

        function setPaymentBrand(brand){
            user.setBrand(brand);
            return this;
        }

        function setPaymentAddress(addressContainer){
            user.setPaymentAddress(addressContainer);
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
