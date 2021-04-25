import { Component } from "@angular/core";
import { CartService } from "src/app/services/cart.service";
import { map, reduce, mergeMap, filter } from "rxjs/operators";
import { Observable, from } from "rxjs";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal/";
import { CartComponent } from "../cart/cart.component";
import { fileURLToPath } from "url";
@Component({
  selector: "header-area",
  templateUrl: "./header.component.html"
})
export class HeaderComponent {
  bsModalRef: BsModalRef;
  isCollapsed = true;
  sum$: Observable<number>;
  constructor(
    private cartService: CartService,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.sum$ = this.cartService
      .getCartItems()
      .pipe(
        map((cart) =>
          cart ? cart.reduce((total, item) => total + item.qty, 0) : 0
        )
      );
  }

  openCart() {
    this.bsModalRef = this.modalService.show(CartComponent);
    this.bsModalRef.content.closeBtnName = "Close";
  }
  toggleCollapsed() {
    this.isCollapsed = !this.isCollapsed;
    console.log(this.isCollapsed);
  }
}
