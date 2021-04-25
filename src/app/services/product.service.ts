import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { productsUrl } from "../config/api";

import { Product } from "../models/product";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(productsUrl).pipe(
      map((result: any) => {
        return result.data;
      })
    );
  }

  
}
