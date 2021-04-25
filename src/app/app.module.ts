import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { JumbotronComponent } from './components/jumbotron/jumbotron.component';
import { ProductsComponent } from './components/products/products.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductService } from './services/product.service';
import { CartService } from './services/cart.service';
import { HttpClientModule } from '@angular/common/http';
import { CartComponent } from './components/cart/cart.component';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
   
    ModalModule.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ToastrModule.forRoot(), // ToastrModule added
    CollapseModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    JumbotronComponent,
    ProductsComponent,
    FooterComponent,
    CartComponent,
    CheckoutComponent
  ],
  providers: [BsModalService, ProductService, CartService],
  bootstrap: [AppComponent],
  entryComponents: [CartComponent]
})
export class AppModule {}
