import { SalesOrder } from 'src/app/models/salesOrder';
import { CustomerDetail } from './../models/customerDetail';
import { ShippingMethodService } from './../services/shippingMethods/shipping-method.service';
import { PNotifyService } from './../pnotify.service';
import { CustomerService } from './../services/customers/customer.service';
import { Observable, of as ObservableOf, Subject } from 'rxjs';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Customer } from '../models/customer';
import { catchError, delay } from 'rxjs/operators';
import { ShippingMethod } from '../models/shippingMethod';
import { SalesOrderService } from '../services/sales-order/sales-order.service';
import { SalesOrderDetail } from '../models/salesOrderDetail';
import { SalesOrderProduct } from '../models/salesOrderProduct';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { AddProductDialogComponent } from './dialogs/add-product-dialog/add-product-dialog.component';
import { YesNoDialogComponent } from '../dialogs/yes-no-dialog/yes-no-dialog.component';
import { SalesOrderDetailService } from '../services/sales-order/sales-order-detail.service';
import { Router } from '@angular/router';
import { CustomerAddress } from '../models/customerAddress';
import { CreditCard } from '../models/creditCard';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css'],
})
export class AddOrderComponent implements OnInit, AfterViewInit {
  @Input()
  edit: boolean = false;

  dataReady = false;
  model: SalesOrder = new SalesOrder();

  customers$: Subject<Customer[]> = new Subject<Customer[]>();
  loadingCustomers = false;
  customersFailed = false;

  shippingMethods$: Subject<ShippingMethod[]> = new Subject<ShippingMethod[]>();
  loadingShippingMethods = true;
  shippingMethodsFailed = false;

  customerDetails$: Subject<CustomerDetail> = new Subject<CustomerDetail>();
  loadingCustomerDetail = false;
  customerDetailFailed = false;

  customerAddresses$: Subject<CustomerAddress[]> = new Subject<CustomerAddress[]>();
  loadingCustomerAddress = false;
  customerAddressFailed = false;

  customerCards$: Subject<CreditCard[]> = new Subject<CreditCard[]>();
  loadingCustomerCards = false;
  customerCardsFailed = false;

  products$: Subject<SalesOrderProduct[]> = new Subject<SalesOrderProduct[]>();
  loadingProducts = false;
  productsFailed = false;

  modelToEdit: SalesOrderDetail;
  salesOrderId: number;

  submitting = false;

  faEdit = faEdit;
  faTrash = faTrash;

  constructor(
    private customerService: CustomerService,
    private shippingMethodsService: ShippingMethodService,
    private salesOrderService: SalesOrderService,
    private salesOrderDetailService: SalesOrderDetailService,
    private notify: PNotifyService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  initData() {
    this.loadCustomers();
    this.loadShippingMethods();
  }

  ngOnInit(): void {
    if (!this.edit)
      this.initData();
  }

  loadProducts(id: number): void {
    this.loadingProducts = true;
    this.salesOrderService.products(id)
      .subscribe(
        products => {
          this.loadingProducts = false;
          products = products.map(prod => {
            prod['salesOrderDetailID'] = prod.id;
            prod['salesOrderID'] = this.salesOrderId;
            return prod;
          });
          if (products == null)
            this.productsFailed = true;
          else {
            this.products$.next(products);
          }
        }
      );
  }

  addProduct() {
    const dialogRef = this.openDialog(null);

    dialogRef.afterClosed().subscribe(result => {
      if (result.success) {
        this.loadProducts(this.salesOrderId);
      }
    });
  }

  editProduct(model: SalesOrderProduct) {
    const dialogRef = this.openDialog(model);
    console.log(model);

    dialogRef.afterClosed().subscribe(result => {
      if (result.success) {
        this.loadProducts(this.salesOrderId);
      }
    });
  }

  deleteProduct(model: SalesOrderProduct) {
    const dialogRef = this.dialog.open(YesNoDialogComponent, {
      data: {
        title: 'Delete',
        text: 'Are you sure you want to remove this product from the order?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result.confirmed) {
        this.salesOrderDetailService.deleteDetail(model)
          .subscribe(result => {
            if (result)
              this.loadProducts(this.salesOrderId);
            else {
              this.notify.getPNotify().error({
                title: 'Error',
                text: 'Unable to delete entry'
              });
            }
          })
      }
    });
  }

  openDialog(model: SalesOrderProduct): MatDialogRef<AddProductDialogComponent, any> {
    const dialogConfig = new MatDialogConfig();
    const data = {
      id: this.salesOrderId,
      model: undefined
    };
    if (model)
      data.model = { ...model };
    dialogConfig.data = data;
    dialogConfig.panelClass = 'app-full-bleed-dialog';
    dialogConfig.disableClose = false;
    return this.dialog.open(AddProductDialogComponent, dialogConfig);
  }

  ngAfterViewInit(): void {
    //this.addProduct();
  }

  loadCustomers() {
    this.customersFailed = false;
    this.loadingCustomers = true;
    this.customerService.getCustomers().subscribe(
      (res) => {
        this.customers$.next(res);
        this.loadingCustomers = false;
        this.customersFailed = false;
      },
      (err) => {
        console.error(err);
        this.loadingCustomers = false;
        this.customersFailed = true;
      }
    );
  }
  loadShippingMethods() {
    this.shippingMethodsFailed = false;
    this.shippingMethodsService.get().subscribe(
      (res) => {
        this.shippingMethods$.next(res);
        this.loadingShippingMethods = false;
        this.shippingMethodsFailed = false;
      },
      (err) => {
        console.error(err);
        this.loadingShippingMethods = false;
        this.shippingMethodsFailed = true;
      }
    );
  }

  loadDetailsForCustomer(customerId: number) {
    this.loadingCustomerCards = true;
    this.customerCardsFailed = false;
    this.customerService.getCustomerCreditCards(customerId).subscribe(
      Cards => {
        this.loadingCustomerCards = false;
        this.customerCards$.next(Cards);

        if(Cards.length > 0) {
          this.model.creditCardID = Cards[0].id;
        }
      },
      err => {
        this.loadingCustomerCards = false;
        this.customerCardsFailed = true;
        console.error(err);
      }
    );
    this.loadingCustomerAddress = true;
    this.customerAddressFailed = false;
    this.customerService.getCustomerAddresses(customerId).subscribe(
      addresses => {
        this.loadingCustomerAddress = false;
        this.customerAddresses$.next(addresses);

        if(addresses.length > 0) {
          this.model.billToAddressID = addresses[0].id;
          this.model.shipToAddressID = addresses[0].id;
        }
      },
      err => {
        this.loadingCustomerAddress = false;
        this.customerAddressFailed = true;
        console.error(err);
      }
    );


    // this.loadingCustomerDetail = true;
    // this.customerDetailFailed = false;
    // this.customerService.getCustomerDetail(customerId).subscribe(
    //   (detail) => {
    //     this.loadingCustomerDetail = false;
    //     this.customerDetails$.next(detail);
    //     if (detail.cards.length > 0) {
    //       this.model.creditCardID = detail.cards[0].id;
    //     }
    //     if (detail.addresses.length > 0) {
    //       this.model.shipToAddressID = detail.addresses[0].id;
    //       this.model.billToAddressID = detail.addresses[0].id;
    //     }
    //   },
    //   (err) => {
    //     console.error(err);
    //     this.loadingCustomerDetail = false;
    //     this.customerDetailFailed = true;
    //   }
    // );
  }

  public setModelForEdit(detail: SalesOrderDetail) {
    this.salesOrderId = detail.salesOrder.salesOrderID;
    this.edit = true;
    this.dataReady = true;
    ObservableOf([1]).
      pipe(delay(10))
      .subscribe(res => {
        this.customers$.next([detail.customer]);
        // this.customerDetails$.next(detail.customerDetail);
        this.customerAddresses$.next(detail.customerDetail.addresses);
        this.customerCards$.next(detail.customerDetail.cards);
        this.products$.next(detail.salesOrderProducts);
        this.loadShippingMethods();
        this.model = detail.salesOrder;
      });
    this.loadCustomers();
  }

  create(formvalid: boolean) {
    if(!formvalid){
      this.notify.getPNotify().error({ title: 'Data Invalid!', text: 'The input data is not valid!' })
      return;
    }
    this.submitting = true;
    this.salesOrderService.create(this.model)
      .subscribe(result => {
        if (result) {
          this.notify.getPNotify().success({ title: 'Success', text: 'Sales Order created successfully!' })
          this.router.navigateByUrl(`salesOrders`)
        }
        else this.notify.getPNotify().error({ title: 'Error', text: 'Sales Order created Failed!' })
        this.submitting = false;
      },
        err => {
          console.error(err);
          this.submitting = false;
          this.notify.getPNotify().error({ title: 'Error', text: 'Sales Order Create Failed!' })
        });
  }

  cancel(){
    this.router.navigateByUrl(`salesOrders`);
  }
}
