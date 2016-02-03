function PaymentInfo(obj) {
    if (obj) {
        this.number = obj.number ? obj.number : null
        this.cvc = obj.cvc ? obj.cvc : null
        this.expiry = obj.expiry ? obj.expiry : null
        this.addressLine1 = obj.addressLine1;
        this.addressLine2 = obj.addressLine2 ? obj.addressLine2 : null
        this.addressCity = obj.addressCity;
        this.addressState = obj.addressState;
        this.addressZip = obj.addressZip;
        this.email = obj.email;
    } else {
        this.number = "";
        this.cvc = "";
        this.expiry = "";
        this.addressLine1 = "";
        this.addressLine2 = "";
        this.addressCity = "";
        this.addressState = "";
        this.addressZip = "";
        this.email = "";
    }
}

PaymentInfo.prototype.setEmail = function(email){
    this.email = email;
}

PaymentInfo.prototype.setExpiry = function(expiry){
    this.expiry = expiry;
}