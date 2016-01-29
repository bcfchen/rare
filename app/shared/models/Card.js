function Card(obj){
	if (!obj){
		this.cardNumber = undefined;
		this.cvc = undefined;
		this.expMonth = undefined;
		this.expYear = undefined;
	} else {
		this.cardNumber = obj.cardNumber;
		this.cvc = obj.cvc;
		this.expMonth = obj.expMonth;
		this.expYear = obj.expYear;
	}
}