import { Component, OnInit } from '@angular/core';
import { CartItem } from "src/app/models/cartitem";
import { Product } from "src/app/models/product";
import { CartService } from "src/app/services/cart.service";
import { ProductService } from "src/app/services/product.service";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartItems: CartItem[] = [];
  total: number;
  constructor(  private cartService: CartService,
    private productService: ProductService,
   ) { }

  ngOnInit(): void {

    this.cartService.getCartItems().subscribe(
      (data) => {      
        this.cartItems = data;

        this.total = this.cartItems.reduce(
          (sum, current) => sum + current.subTotal,
          0
        );
        
      },
      (error) => console.log(error)
    );
  }

}
