function User(){
	this.name = "";
	this.addresses = {
		home: new Address(),
		work: new Address()
	};
	this.phoneNumber = null;
	this.email = "";
}

User.prototype.setName = function(name){
	this.name = name;
}

User.prototype.setPhoneNumber = function(phoneNumber){
	var formattedPhoneNumber = phoneNumber ? phoneNumber.toString().replace(/\D+/g, '') : null;
	this.phoneNumber = formattedPhoneNumber;
}

User.prototype.setAddress = function(type, address){
	this.addresses[type] = address;
}

User.prototype.setEmail = function(email){
	this.email = email;
}

