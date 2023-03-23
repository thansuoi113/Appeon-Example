import { ApiService } from './../api/api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ShippingMethod } from 'src/app/models/shippingMethod';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShippingMethodService {

  constructor(private api: ApiService) { }

  public get(): Observable<ShippingMethod[]> {
    return this.api.get('/shippingMethods')
    .pipe(
      map(
        res => res.map(item => new ShippingMethod(item.shipmethodid, item.name, item.shipbase, item.shiprate))
      )
    );
  }
}
