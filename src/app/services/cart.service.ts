import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { CartItem } from "../models/cartitem";
import { Product } from "../models/product";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: "root"
})
export class CartService {
  private cartObs$: BehaviorSubject<CartItem[]> = new BehaviorSubject([]);
  
  constructor(private toastr:ToastrService) {}

  getCartItems(): Observable<CartItem[]> {
    return this.cartObs$.asObservable();
  }
  get getList():CartItem[]
  {
    let carts: CartItem[] = [];
    
    this.getCartItems().subscribe(
      (data) => {

              carts= data;
      },
      (error) => console.log(error)
    );
    return carts;
    
  }
  
  
  addProductToCart(product: Product):number {
    let cartItems: CartItem[] = [];

    cartItems=this.getList;

    let cartItem = cartItems
      .filter((item) => item.productId === product.id)
      .shift();

    if (cartItem &&  (cartItem.remaining <= 0)) {
        //this.toastr.error("Product Out of stock");
        console.log("Product Out of stock");
        return 0;
     }

    if (cartItem) {
      
        cartItem.remaining--;
        cartItem.qty++;
        cartItem.subTotal = cartItem.qty * product.price;
      
    } 
    else {
         cartItems.push(new CartItem(product));
    }

    this.cartObs$.next(cartItems);
    return 1;
  //  this.toastr.success("Added to cart");

    // this.getCartItems().subscribe(
    //   (data) => console.log(data),
    //   (error) => console.log(error)
    // );
  }

  updateCartQty(productId: number, qty: number): number {
    let cartItems: CartItem[] = [];

    cartItems=this.getList;
  
    if (!cartItems || !cartItems.length) {
      console.log("No Cart To Update");
      return 0;
    }

    let cartItem = cartItems.filter((item) => item.productId === productId).shift();

    if (cartItem) {
        
      if (cartItem.qty + cartItem.remaining - qty < 0) {
        this.cartObs$.next(cartItems);
        console.log("Product Out of stock," + cartItem.remaining + "Available");
        return 0;
      }

      cartItem.remaining = cartItem.qty + cartItem.remaining - qty;
      cartItem.qty = qty;
      cartItem.subTotal = cartItem.qty * cartItem.price;
    }

    this.cartObs$.next(cartItems);

    return 1;
  }

  removeProductFromCart(productId: number):number {
    let cartItems: CartItem[] = [];
    
    cartItems=this.getList;
    
    if (!cartItems || !cartItems.length) {
      console.log("Product not Available");
      return 0;
    }

    cartItems.forEach((item, index) => {
      if (item.productId === productId) cartItems.splice(index, 1);
    });

    this.cartObs$.next(cartItems);

     return 1;
    // this.getCartItems().subscribe(
    //   (data) => console.log(data),
    //   (error) => console.log(error)
    // );
  }
}
