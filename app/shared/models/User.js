function User(obj){
	if (!obj){
		this.firstName = undefined;
		this.lastName = undefined;
		this.address = undefined;
		this.phoneNumber = undefined;
		this.email = undefined;
		this.stripeCustomerId = stripeCustomerId;
	} else {
		this.firstName = obj.firstName;
		this.lastName = obj.lastName;
		this.address = new Address(obj.address);
		this.phoneNumber = obj.phoneNumber;
		this.email = obj.email;
		this.stripeCustomerId = obj.stripeCustomerId;
	}
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



