function Product(rawProduct){
	this.name = rawProduct.name;
	this.image = rawProduct.image;
	this.price = rawProduct.price;
	this.hashtags = rawProduct.hashtags;
	this.description = rawProduct.description;
	this.address = rawProduct.address ? new Address(rawProduct.address) : null;
}