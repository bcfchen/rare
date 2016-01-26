function Address(obj)
{
	if (!obj){
		this.street = "";
		this.city = "San Francisco";
		this.state = "CA";
		this.zipCode = "";
	} else {
		this.street = obj.street;
		this.city = obj.city;
		this.state = obj.state;
		this.zipCode = obj.zipCode;
	}
}