function Appointment(obj){
	if (!obj) {
		this.userPhone = "";
		this.transactionId = "";
		this.productKey = "";
		this.price = 0;
		this.address = "";
		this.date = "";
		this.time = "";
		this.cancelled = false;
	} else {
		this.userPhone = obj.userPhone;
		this.transactionId = obj.transactionId;
		this.productKey = obj.productKey;
		this.price = obj.price;
		this.address = new Address(obj.address);
		this.date = obj.date;
		this.time = obj.time;
		this.cancelled = obj.cancelled;
	}
}

Appointment.prototype.setPrice = function(price){
	this.price = price;
}

Appointment.prototype.getPrice = function(){
	return this.price;
}

Appointment.prototype.setUserPhone = function(phone){
	var formattedPhone = phone ? phone.toString().replace(/\D+/g, '') : null;
	this.userPhone = formattedPhone
}

Appointment.prototype.setTransactionId = function(transactionId){
	this.transactionId = transactionId;
}

Appointment.prototype.getTransactionId = function(){
	return this.transactionId;
}

Appointment.prototype.setProductKey = function(productKey){
	this.productKey = productKey;
}

Appointment.prototype.getProductKey = function(){
	return this.productKey;
}

Appointment.prototype.setAddress = function(address){
	this.address = address;
}

Appointment.prototype.setDate = function(scheduleDate){
	this.date = scheduleDate.displayDateStrWithYear;
}

Appointment.prototype.setTime = function(scheduleTime){
	this.time = scheduleTime.displayTimeStr;
}

Appointment.prototype.isCancelled = function(){
	return this.cancelled;
}

Appointment.prototype.isInFuture = function(){
	var apptDate = this.schedule.date.replace(/-/g, '/');
	var appointmentDateTimeObj = new moment(apptDate + " " + this.schedule.time);
	return appointmentDateTimeObj > new moment();
}

Appointment.prototype.getAppointmentDateTime = function(){
	var apptDate = this.schedule.date.replace(/-/g, '/');
	var scheduleObj = new moment(apptDate + " " + this.schedule.time);
	
	return {
		date: scheduleObj.format("MMM DD"),
		time: scheduleObj.format("h:mm A")
	}
}

