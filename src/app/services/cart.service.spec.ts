/* tslint:disable:no-unused-variable */

import { ToastrService } from "ngx-toastr";
import { CartService } from "./cart.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CartItem } from "../models/cartitem";


describe("CartService", () => {
  let service: CartService;
  let toastr:ToastrService
  beforeEach(() => {
    service = new CartService(toastr);
  });

  it("should create a cart in an array", () => {
    const product = { id:1,name: 'string',description: 'stri',price: 10.0,quantity: 10,image: 'path'};
     service.addProductToCart(product);
     expect(service.getList.length).toBeGreaterThanOrEqual(1);
  });

  


  it("should update a update product from the array of cart", () => {
    const product1 = { id:1,name: 'P1',description: 'stri',price: 10.0,quantity: 10,image: 'path'};
    const product2 = { id:2,name: 'P2',description: 'stri',price: 30.0,quantity: 100,image: 'path'};
    
    //added product 3 quanity
    service.addProductToCart(product1);
    service.addProductToCart(product1);
    service.addProductToCart(product1);

    service.addProductToCart(product2);
    service.updateCartQty(product1.id,5);
    let carts=service.getList;
    let cartItem = carts.filter((item) => item.productId === product1.id).shift();

    expect(cartItem.qty).toEqual(5);
  });

  it("should remove a created product from the array of cart", () => {
    const product1 = { id:1,name: 'P1',description: 'stri',price: 10.0,quantity: 10,image: 'path'};
    const product2 = { id:2,name: 'P2',description: 'stri',price: 30.0,quantity: 100,image: 'path'};
    service.addProductToCart(product1);
    service.addProductToCart(product2);
    service.removeProductFromCart(1);
    expect(service.getList.length).toEqual(1);
  });


  it("should not Add a  product to cart if Out of stock", () => {
    const product1 = { id:1,name: 'P1',description: 'stri',price: 10.0,quantity: 3,image: 'path'};
  
    //added product 3 quanity
    service.addProductToCart(product1);
    service.addProductToCart(product1);
    service.addProductToCart(product1);
    
    //Add to cart
    service.addProductToCart(product1);
    

    let carts=service.getList;
    let cartItem = carts.filter((item) => item.productId === product1.id).shift();

    expect(cartItem.qty).toEqual(3);
  });


  it("should not Update a  product to cart if Out of stock", () => {
    const product1 = { id:1,name: 'P1',description: 'stri',price: 10.0,quantity: 3,image: 'path'};
  
    //added product 3 quanity
    service.addProductToCart(product1);
    service.addProductToCart(product1);
    service.addProductToCart(product1);
    
    //update qty 5
    service.updateCartQty(product1.id,5);
    

    let carts=service.getList;
    let cartItem = carts.filter((item) => item.productId === product1.id).shift();

    expect(cartItem.qty).toEqual(3);
  });

});