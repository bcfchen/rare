(function () {
    angular
        .module("rare")
        .factory("appointmentBuilder", appointmentBuilder);

    function appointmentBuilder() {
        var service = {
            setAddress: setAddress,
            setDate: setDate,
            getDate: getDate,
            setTime: setTime,
            getTime: getTime,
            setUserId: setUserId,
            setProductId: setProductId,
            setProductName: setProductName,
            setTokenId: setTokenId,
            setTransactionId: setTransactionId,
            setPrice: setPrice,
            setPhoneNumber: setPhoneNumber,
            setSource: setSource,
            build: build
        };

        var appointment;

        initialize();

        return service;

        /* method implementations */
        function initialize(){
            appointment = new Appointment();
            return this;
        }

        function setSource(source){
            appointment.setSource(source);
            return this;
        }

        function setPhoneNumber(phoneNumber){
            appointment.phoneNumber = phoneNumber;
            return this;
        }

        function setTokenId(tokenId){
            appointment.tokenId = tokenId;
            return this;
        }

        function setAddress(address){
        	appointment.address = address;
            return this;
        }

        function setDate(date){
            appointment.setDate(date);
            return this;
        }

        function getDate(){
        	return appointment.date;
        }

        function getTime(){
        	return appointment.time;
        }

        function setTime(time){
            appointment.setTime(time);
            return this;
        }

        function setUserId(userId){
        	appointment.userId = userId;
            return this;
        }

        function setProductId(productId){
        	appointment.productId = productId;
            return this;
        }

        function setProductName(productName){
            appointment.productName = productName;
            return this;
        }

        function setPrice(price){
            appointment.price = price;
            return this;
        }

        function setTransactionId(transactionId){
        	appointment.transactionId = transactionId;
            return this;
        }

        function build(){
        	return appointment;
        }

    }
}());