import { Injectable } from '@angular/core';
import { Observable, of as ObservableOf } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SalesOrder } from 'src/app/models/salesOrder';
import { SalesOrderProduct } from 'src/app/models/salesOrderProduct';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class SalesOrderDetailService {

  constructor(
    private api: ApiService
  ) { }

  updateDetail(detail: SalesOrderProduct): Observable<boolean> {
    return this.api.put('/salesOrderDetail', detail)
      .pipe(
        map(httpResponse => {
          return httpResponse.ok;
        }),
        catchError(err => {
          console.error(err);
          return ObservableOf(null)
        })
      );
  }

  deleteDetail(detail: SalesOrderProduct): Observable<boolean> {
    return this.api.delete(`/salesOrderDetail`, detail )
      .pipe(
        map(httpResponse => {
          return httpResponse.ok;
        }),
        catchError(err => {
          console.error(err);
          return ObservableOf(null)
        })
      );
  }
}
