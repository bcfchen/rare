function Address(obj)
{
	if (!obj){
		this.streetAddress = "";
		this.apartmentNumber = "";
		this.city = "San Francisco";
		this.state = "CA";
		this.country = "USA";
		this.zipCode = "";
		this.specialInstructions = "";
	} else {
		this.streetAddress = obj.streetAddress;
		this.apartmentNumber = obj.apartmentNumber;
		this.city = "San Francisco";
		this.state = "CA";
		this.zipCode = obj.zipCode;
		this.country = "USA";
		this.specialInstructions = obj.specialInstructions ? obj.specialInstructions : null;
	}
}