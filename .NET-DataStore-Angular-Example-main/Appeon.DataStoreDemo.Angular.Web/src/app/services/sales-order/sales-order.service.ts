import { map, catchError, flatMap, mergeMap } from 'rxjs/operators';
import { Page } from './../../models/page';
import { Observable, of as observableOf } from 'rxjs';
import { ApiService } from './../api/api.service';
import { Injectable } from '@angular/core';
import { SalesOrder } from 'src/app/models/salesOrder';
import { SalesOrderDetail } from 'src/app/models/salesOrderDetail';
import { SalesOrderProduct } from 'src/app/models/salesOrderProduct';
import { CustomerService } from '../customers/customer.service';
import { CustomerDetail } from 'src/app/models/customerDetail';
import { CustomerAddress } from 'src/app/models/customerAddress';
import { Customer } from 'src/app/models/customer';

@Injectable({
  providedIn: 'root',
})
export class SalesOrderService {
  constructor(public api: ApiService,
    public customerService: CustomerService) { }

  public getAll(
    page: number,
    pageSize: number
  ): Observable<Page<SalesOrder[]>> {
    return this.api
      .getWithParams(`/salesOrder/${page}/${pageSize}`, {
        page: page,
        pageSize: pageSize,
      })
      .pipe(
        map((item) => {
          const page = new Page<SalesOrder[]>();
          page.items = item.items.map((saleOrder: any) =>
            SalesOrder.FromJson(saleOrder)
          );
          page.pageIndex = item.pageIndex;
          page.pageSize = item.pageSize;
          page.totalItems = item.totalItems;
          return page;
        })
      );
  }

  public get(id: number): Observable<SalesOrderDetail> {
    return this.api.get('/salesOrder/' + id)
      .pipe(
        map(result => SalesOrderDetail.FromJson(result)
        ),
        catchError((err, obs) => observableOf(null))
      );
  }

  public deepGet(id: number): Observable<SalesOrderDetail> {
    let salesOrder: SalesOrderDetail = null;
    return this.api.get(`/salesOrder/${id}`)
      .pipe(
        mergeMap((result) => {
          salesOrder = new SalesOrderDetail(SalesOrder.FromJson(result),
            new Customer(result.customerID, 'N/A', 'N/A'),
            null,
            null);
          return this.customerService.getCustomerAddresses(salesOrder.salesOrder.customerID)
        }),
        mergeMap((result) => {
          salesOrder.customerDetail = new CustomerDetail(result, null);
          return this.customerService.getCustomerCreditCards(salesOrder.salesOrder.customerID);
        }),
        mergeMap(result => {
          // salesOrder.salesOrderProducts = result;
          salesOrder.customerDetail.cards = result;

          return this.products(salesOrder.salesOrder.salesOrderID);
        }),
        map(
          result => {
            salesOrder.salesOrderProducts = result;
            return salesOrder;
          }
        ),
        catchError((err, obs) => observableOf(null))
      );
  }

  public create(salesOrder: SalesOrder): Observable<boolean> {
    return this.api.post('/salesOrder/add', salesOrder).pipe(
      map((res) => {
        if (res.body == 1) {
          return true;
        }
      }),
      catchError((err, obs) => {
        return observableOf(false);
        // return observableOf(true);
      })
    );
  }

  public products(id: number): Observable<SalesOrderProduct[]> {
    return this.api.get(`/salesOrder/${id}/details`)
      .pipe(
        map(result => result.map(prod => new SalesOrderProduct(
          prod.salesOrderDetailID,
          prod.productID,
          prod.productName,
          prod.unitPrice,
          prod.orderQty,
          prod.unitPriceDiscount,
          prod.lineTotal,
          new Date(prod.modifiedDate),
          prod.specialOfferID)

        )),
        catchError((err) => {
          console.error(err);
          return observableOf(null);
        })
      )
  }

  public getAllUrl(): string {
    return this.api.getUrl('/salesOrder');
  }

  public addProduct(id: number, product: SalesOrderProduct): Observable<boolean> {
    product['salesOrderID'] = id;
    return this.api.post(`/salesOrderDetail`, product)
      .pipe(
        map(result => result.ok),
        catchError(err => observableOf(false))
      );
  }

  public delete(ids: number[]): Observable<boolean> {
    let params = "";
    for (let id of ids) {
      params += `${id},`;
    }
    params = params.slice(0, -1);
    return this.api.delete(`/SalesOrder/deleteSalesOrders?ids=${params}`)
      .pipe(
        map(
          result => {
            return result.ok;
          }
        ),
        catchError(err => {
          console.error(err);
          return observableOf(null);
        })
      );
  }

  public deleteOne(id: number): Observable<boolean> {
    return this.api.delete(`/salesOrder/${id}`)
      .pipe(
        map(
          result => {
            return result.status >= 200 && result.status <= 299;
          }
        ),
        catchError(err => {
          console.error(err);
          return observableOf(null);
        })
      );

  }
}
