import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Product } from 'src/app/models/product';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private api: ApiService) { }

  getProducts(): Observable<Product[]> {
    return this.api.get('/products')
    .pipe(
      map(result => result.map(item => new Product(item.product_Productid,
        item.product_Name,
        1))),
      catchError((err) => of(null))
    );
  }
}
