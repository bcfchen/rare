function BillingAddress(address) {
    this.addressLine1 = angular.copy(address.streetAddress);
    this.addressLine2 = angular.copy(address.apartmentNumber);
    this.addressCity = angular.copy(address.city);
    this.addressState = angular.copy(address.state);
    this.addressZip = angular.copy(address.zipCode);
    this.addressCountry = angular.copy(address.country)
}
