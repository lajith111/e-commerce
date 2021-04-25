import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ProductsComponent } from './components/products/products.component';

const routes: Routes = [  
  { path: 'products', component: ProductsComponent },  
  { path: 'checkout', component: CheckoutComponent },  
  { path: '', redirectTo: 'products', pathMatch: 'full' }, 
];  

@NgModule({  
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],  
  exports: [RouterModule]  
})  
export class AppRoutingModule { }