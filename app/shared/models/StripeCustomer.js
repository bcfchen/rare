function StripeCustomer(obj){
	this.addressLine1 = obj.address_line1;
	this.addressLine2 = obj.address_line2;
	this.addressCity = obj.address_city;
	this.addressZip = obj.address_zip;
	this.addressState = obj.address_state;
	this.addressCountry = obj.address_country;
	this.exp_month = obj.exp_month;
	this.exp_year = obj.exp_year;
	this.expiry = obj.exp_month + "/" + obj.exp_year;
	this.customer = obj.customer;
	this.email = obj.email;
}