import { Component, OnInit, EventEmitter, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { esLocale } from "ngx-bootstrap";
import { BsModalRef } from "ngx-bootstrap/modal";
import { ToastrService } from "ngx-toastr";
import { CartItem } from "src/app/models/cartitem";
import { Product } from "src/app/models/product";
import { CartService } from "src/app/services/cart.service";
import { ProductService } from "src/app/services/product.service";
@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"]
})
export class CartComponent implements OnInit {
  //itemform:FormGroup;
 // @ViewChild('f')
 // form: NgForm
  cartItems: CartItem[] = [];
  //public event: EventEmitter<any> = new EventEmitter();
  total: number;

  constructor(
    //private formBuilder: FormBuilder,
    private router :Router,
    public bsModalRef: BsModalRef,
    private cartService: CartService,
    private productService: ProductService,
    private toastService: ToastrService
  ) {}

  ngOnInit() {
   
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

  gotoCheckOut() {
    this.bsModalRef.hide();
    this.router.navigate(['checkout']);
   
  }

  removeFromCart(cartItem: CartItem) {

    const result=this.cartService.removeProductFromCart(cartItem.productId);
    if(result===1)
      this.toastService.success("Product Removed");
      else
      this.toastService.error("No product Available");
     
  }

  updateCart(qty: number, cartItem: CartItem,i:number) {
    
 
    if (cartItem.remaining===0 &&  qty > cartItem.qty  ) {
     //this.cartItems[i].qty =  cartItem.qty;
      console.log("Product Out of stock");
      this.toastService.error("Out of stock")
      return;
    }
    
    const stock=cartItem.qty + cartItem.remaining;
    const quantity= (stock-qty) < 0 ? stock:qty
    const result = this.cartService.updateCartQty(cartItem.productId,quantity);
      if(result===1)
      {
        //this.cartItems[i].qty = quantity;
        this.toastService.success("Quantity Updated")
      }
      else
      this.toastService.error("No Stock , Available stock updated")
        
   
 
     
  }
 
}
