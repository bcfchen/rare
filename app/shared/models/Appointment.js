function Appointment(obj){
	if (!obj) {
		this.userPhone = "";
		this.transactionId = "";
		this.productKey = "";
		this.price = 0;
		this.address = "";
		this.schedule = "";
		this.cancelled = false;
	} else {
		this.userPhone = obj.userPhone;
		this.transactionId = obj.transactionId;
		this.productKey = obj.productKey;
		this.price = obj.price;
		this.address = new Address(obj.address);
		this.schedule = obj.schedule;
		this.cancelled = obj.cancelled;
	}
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

Appointment.prototype.setSchedule = function(schedule){
	this.schedule = schedule;
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

