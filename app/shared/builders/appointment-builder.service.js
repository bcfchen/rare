(function () {

    angular
        .module("rare")
        .factory("appointmentBuilder", [appointmentBuilder]);

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
        }

        function setSource(source){
            appointment.setSource(source);
        }

        function setPhoneNumber(phoneNumber){
            appointment.phoneNumber = phoneNumber;
        }

        function setTokenId(tokenId){
            appointment.tokenId = tokenId;
        }

        function setAddress(address){
        	appointment.address = address;
        }

        function setDate(date){
            appointment.setDate(date);
        }

        function getDate(){
        	return appointment.date;
        }

        function getTime(){
        	return appointment.time;
        }

        function setTime(time){
            appointment.setTime(time);
        }

        function setUserId(userId){
        	appointment.userId = userId;
        }

        function setProductId(productId){
        	appointment.productId = productId;
        }

        function setProductName(productName){
            appointment.productName = productName;
        }

        function setPrice(price){
            appointment.price = price;
        }

        function setTransactionId(transactionId){
        	appointment.transactionId = transactionId;
        }

        function build(){
        	return appointment;
        }

    }
}());