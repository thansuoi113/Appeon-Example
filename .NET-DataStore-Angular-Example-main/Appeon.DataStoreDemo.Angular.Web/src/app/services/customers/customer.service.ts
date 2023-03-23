import { Observable } from 'rxjs';
import { ApiService } from './../api/api.service';
import { Injectable } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { map } from 'rxjs/operators';
import { CustomerDetail } from 'src/app/models/customerDetail';
import { CustomerAddress } from 'src/app/models/customerAddress';
import { CreditCard } from 'src/app/models/creditCard';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private api: ApiService) { }

  public getCustomers(): Observable<Customer[]> {
    return this.api.get('/customers')
    .pipe(
      map((result) => {
        return result.map((item) => new Customer(item.customer_Customerid, item.person_Firstname, item.person_Lastname))
      })
    );
  }

  public getCustomerDetail(customerId: number): Observable<CustomerDetail> {
    return this.api.get(`/customers/${customerId}`)
    .pipe(
      map(res =>   CustomerDetail.FromJson(res))
    );
  }

  public getCustomerAddresses(customerId: number): Observable<CustomerAddress[]> {
    return this.api.get(`/Customers/CustomerAddress/${customerId}`)
    .pipe(
      map(res =>   res.map(item => new CustomerAddress(item.businessentityaddress_Addressid, item.address_Addressline1, item.address_Addressline2)))
    );
  }

  public getCustomerCreditCards(customerId: number): Observable<CreditCard[]> {
    return this.api.get(`/Customers/Creditcard/${customerId}`)
    .pipe(
      map(res => res.map(item => new CreditCard(item.creditcard_Creditcardid, item.creditcard_Creditcardtype, item.creditcard_Cardnumber)))
    );
  }
}
