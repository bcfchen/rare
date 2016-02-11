function PhoneUser(phoneNumber, userId){
	this.phone = phoneNumber;
	this.userId = userId;
}

PhoneUser.prototype.getUserId = function(){
	return this.userId;
}