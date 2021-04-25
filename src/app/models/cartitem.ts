import { Product } from "./product";

export class CartItem {
 // id: number;
  productId: number;
  productName: string;
  qty: number;
  price: number;
  remaining: number=0 ;
  subTotal: number = 0;
  constructor(product: Product, qty = 1) {
   // this.id = id;
    this.productId = product.id;
    this.productName = product.name;
    this.price = product.price;
    this.qty = qty;
    this.remaining = product.quantity - qty;
    this.subTotal = qty * product.price;
  }
}
