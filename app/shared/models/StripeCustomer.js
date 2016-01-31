function StripeCustomer(obj){
	this.address_line1 = obj.address_line1;
	this.address_line2 = obj.address_line2;
	this.address_city = obj.address_city;
	this.address_zip = obj.address_zip;
	this.address_state = obj.address_state;
	this.address_country = obj.address_country;
	this.exp_month = obj.exp_month;
	this.exp_year = obj.exp_year;
	this.customer = obj.customer;
}