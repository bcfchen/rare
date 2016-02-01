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
            setTransactionId: setTransactionId,
            setPrice: setPrice,
            build: build
        };

        var appointment;

        initialize();

        return service;

        /* method implementations */
        function initialize(){
            appointment = new Appointment();
        }

        function setAddress(address){
        	appointment.address = address;
        }

        function setDate(date){
        	appointment.date = date;
            appointment.setDate(date);
        }

        function getDate(){
        	return appointment.date;
        }

        function getTime(){
        	return appointment.time;
        }

        function setTime(time){
        	appointment.time = time;
            appointment.setTime(time);
        }

        function setUserId(userId){
        	appointment.userId = userId;
        }

        function setProductId(productId){
        	appointment.productId = productId;
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