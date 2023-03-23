import { SalesOrderService } from './../services/sales-order/sales-order.service';
import { AddOrderComponent } from './../add-order/add-order.component';
import { AfterViewInit, Component, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { SalesOrder } from '../models/salesOrder';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.css'],
})
export class OrderEditComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(AddOrderComponent)
  addOrderComponent: AddOrderComponent;

  loadedModel: SalesOrder;
  loadingModel = true;
  loadModelFailed = false;
  modelId: number;

  private subs: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private salesOrderService: SalesOrderService
  ) { }
  ngOnDestroy(): void {
    this.subs.forEach(element => {
      element.unsubscribe();
    });
  }

  ngAfterViewInit(): void {
  }

  loadModel() {
    const that = this;
    this.loadModelFailed = false;
    this.loadingModel = true;
    console.log('loading model');
    this.subs.push(this.salesOrderService.deepGet(this.modelId)
      .subscribe(result => {
        this.loadingModel = false;
        if (result != null) {
          that.loadedModel = result.salesOrder;
          that.addOrderComponent.setModelForEdit(result);
        }
        else {
          this.loadModelFailed = true;
        }
      }));
  }

  ngOnInit(): void {
    this.subs.push(this.route.params.subscribe(
      params => {
        this.modelId = params.id;
        this.loadModel();
      }
    ));
  }

  loadProducts(){

  }

}
