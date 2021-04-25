import { Component } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Product } from "src/app/models/product";
import { CartService } from "src/app/services/cart.service";
import { ProductService } from "src/app/services/product.service";

@Component({
  selector: "products-area",
  templateUrl: "./products.component.html"
})
export class ProductsComponent {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private toastService:ToastrService,
  ) {}

  ngOnInit() {

   
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
      },
      (error) => console.log(error)
    );
  }

  handleAddToCart(productItem: Product) {
    const result=this.cartService.addProductToCart(productItem);
    if(result===0)
    {
      this.toastService.error("Product Out of stock");
    }
    else  this.toastService.success(productItem.name+ " Added to cart");
  }
}
