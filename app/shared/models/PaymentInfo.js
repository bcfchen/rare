function PaymentInfo(obj) {
    if (obj) {
        this.number = obj.number;
        this.cvc = obj.cvc;
        this.expiry = obj.expiry;
        this.addressLine1 = obj.addressLine1;
        this.addressLine2 = obj.addressLine2;
        this.addressCity = obj.addressCity;
        this.addressState = obj.addressState;
        this.addressZip = obj.addressZip;
        this.email = obj.email;
    } else {
        this.number = undefined;
        this.cvc = undefined;
        this.expiry = undefined;
        this.addressLine1 = undefined;
        this.addressLine2 = undefined;
        this.addressCity = undefined;
        this.addressState = undefined;
        this.addressZip = undefined;
        this.email = undefined;
    }
}

PaymentInfo.prototype.setEmail = function(email){
    this.email = email;
}

PaymentInfo.prototype.setExpiry = function(){
    this.expiry = expiry;
}