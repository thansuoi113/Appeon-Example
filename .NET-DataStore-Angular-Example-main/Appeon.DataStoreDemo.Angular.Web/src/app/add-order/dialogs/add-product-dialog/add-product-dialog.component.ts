import { AfterViewInit, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { of, Subject, Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Product } from 'src/app/models/product';
import { SalesOrderDetail } from 'src/app/models/salesOrderDetail';
import { SalesOrderProduct } from 'src/app/models/salesOrderProduct';
import { PNotifyService } from 'src/app/pnotify.service';
import { ProductsService } from 'src/app/services/products/products.service';
import { SalesOrderDetailService } from 'src/app/services/sales-order/sales-order-detail.service';
import { SalesOrderService } from 'src/app/services/sales-order/sales-order.service';

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.css']
})
export class AddProductDialogComponent implements OnInit, AfterViewInit, OnDestroy {
  faTimes = faTimes;
  loadingProducts = true;
  productsFailed = false;
  products$ = new Subject<Product[]>();
  subs: Subscription[] = [];
  edit = false;
  submitting = false;
  discountControl = new FormControl("", [Validators.max(1), Validators.min(0)]);

  model: SalesOrderProduct = {} as SalesOrderProduct;
  modelToEdit: SalesOrderProduct;
  salesOrderId: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialogRef<AddProductDialogComponent, any>,
    private productsService: ProductsService,
    private salesOrderService: SalesOrderService,
    private notify: PNotifyService,
    private salesOrderDetailService: SalesOrderDetailService
  ) {
    console.log(data);
    if (data) {
      this.modelToEdit = data.model;
      this.salesOrderId = data.id;
    }
  }

  setModel(model: SalesOrderProduct) {
    if (!model)
      return;
    of([])
      .pipe(delay(50))
      .subscribe(
        val => {

          this.products$.next([
            new Product(model.productId, model.productName, model.specialOfferId)
          ]);
          this.model = model;
          this.model['salesOrderID'] = this.salesOrderId;
          this.model['salesOrderDetailID'] = model.id;

          this.edit = true;
          this.loadProducts();
        }
      );
  }

  loadProducts() {
    this.loadingProducts = true;
    this.productsFailed = false;
    this.subs.push(this.productsService.getProducts()
      .subscribe(products => {
        this.loadingProducts = false;
        if (products == null)
          this.productsFailed = true;
        else
          this.products$.next(products);
      }));

  }

  ngAfterViewInit(): void {
    this.setModel(this.modelToEdit);
    this.loadProducts();
  }

  ngOnInit(): void {
  }


  closeDialog(success: boolean) {
    this.dialog.close({
      success: success
    });
  }

  saveChanges() {
    this.submitting = true;
    this.model.orderQty = Number(this.model.orderQty);
    this.model.unitPrice = Number(this.model.unitPrice);
    if (!this.edit) {
      this.salesOrderService.addProduct(this.salesOrderId, this.model)
        .subscribe(res => {
          this.submitting = false;
          if (res) {
            this.closeDialog(true);
          } else {
            this.notify.getPNotify().error({ title: 'Error', text: 'Could not create product' });
          }
        });
    } else {
      this.salesOrderDetailService.updateDetail(this.model)
        .subscribe(result => {
          this.submitting = false;
          if (result)
            this.closeDialog(true);
        });
    }
    console.log(this.model);
  }

  ngOnDestroy(): void {
    this.subs.forEach(item => item.unsubscribe());
  }

  productSelectionChanged(product: Product) {
    console.log(product);
    if (product) {
      this.model.productId = product.id;
      this.model.specialOfferId = product.specialOfferId;
    }
  }

}
