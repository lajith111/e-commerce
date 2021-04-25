export class Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;

  constructor(id, name, description = "", price = 0, image) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.image = image;
  }
}
