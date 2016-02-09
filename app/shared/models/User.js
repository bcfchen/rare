function User(obj){
	if (!obj){
		this.firstName = null;
		this.lastName = null;
		this.address = null;
		this.phoneNumber = null;
		this.email = null;
		this.stripeCustomerId = null;
		this.paymentInfo = null;
		this.id = null;
	} else {
		this.id = obj.$id;
		this.firstName = obj.firstName;
		this.lastName = obj.lastName;
		this.address = new Address(obj.address);
		this.phoneNumber = obj.phoneNumber;
		this.email = obj.email;
		this.stripeCustomerId = obj.stripeCustomerId;
		this.paymentInfo = new PaymentInfo(obj.paymentInfo);
	}
}

User.prototype.getId = function(){
	return this.id
}

User.prototype.setCardNumber = function(cardNumber){
	this.paymentInfo.setCardNumber(cardNumber);
}

User.prototype.setPaymentInfo = function(paymentInfo){
	this.paymentInfo = new PaymentInfo(paymentInfo);
}

User.prototype.setPaymentAddress = function(addressContainer){
	this.paymentInfo.setAddress(addressContainer);
}

User.prototype.getPaymentInfo = function(){
	return this.paymentInfo;
}

User.prototype.setFirstName = function(firstName){
	this.firstName = firstName;
}

User.prototype.setLastName = function(lastName){
	this.lastName = lastName;
}

User.prototype.getFirstName = function(){
	return this.firstName;
}

User.prototype.getLastName = function(){
	return this.lastName;
}

User.prototype.setPhoneNumber = function(phoneNumber){
	var formattedPhoneNumber = phoneNumber ? phoneNumber.toString().replace(/\D+/g, '') : null;
	this.phoneNumber = formattedPhoneNumber;
}

User.prototype.getPhoneNumber = function(){
	return this.phoneNumber;
}

User.prototype.setAddress = function(address){
	this.address= new Address(address);
}

User.prototype.getAddress = function(){
	return this.address;
}

User.prototype.setEmail = function(email){
	this.email = email;
	if (this.paymentInfo){
		this.paymentInfo.setEmail(email);
	}
}

User.prototype.getEmail = function(){
	return this.email;
}

User.prototype.setStripeCustomerId = function(customerId){
	this.stripeCustomerId = customerId;
}

User.prototype.getStripeCustomerId = function(){
	return this.stripeCustomerId;
}



