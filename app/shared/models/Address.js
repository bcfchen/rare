function Address(obj)
{
	if (!obj){
		this.streetAddress = undefined;
		this.apartmentNumber = undefined;
		this.city = "San Francisco";
		this.state = "CA";
		this.country = "USA";
		this.zipCode = undefined;
		this.specialInstructions = undefined;
	} else {
		this.streetAddress = obj.streetAddress;
		this.apartmentNumber = obj.apartmentNumber;
		this.city = "San Francisco";
		this.state = "CA";
		this.zipCode = obj.zipCode;
		this.country = "USA";
		this.specialInstructions = obj.specialInstructions;
	}
}