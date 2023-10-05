export class Ad {
    id;
    product;
    price;
    description;
    image;
    userId;
  
    constructor(id, product, price, description, image, userId) {
      this.id = id;
      this.product = product;
      this.price = price;
      this.description = description;
      this.image = image;
      this.userId = userId;
    }
  
    // Implementações de lógicas de negócio...
  }