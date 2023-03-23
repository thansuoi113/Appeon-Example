import { SelectionEmptyDialogComponent } from './dialogs/selection-empty-dialog/selection-empty-dialog.component';
import { Router } from '@angular/router';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { environment } from './../../environments/environment';
import { SalesOrderService } from './../services/sales-order/sales-order.service';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { SalesOrder } from '../models/salesOrder';
import { Page } from '../models/page';
import { Observer, Subject, Observable, merge, of as observableOf, Subscription } from 'rxjs';
import * as moment from 'moment';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteDialogComponent } from './dialogs/confirm-delete-dialog/confirm-delete-dialog.component';
import { EventEmitter } from 'events';
import { YesNoDialogComponent } from '../dialogs/yes-no-dialog/yes-no-dialog.component';
import { PNotifyService } from '../pnotify.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent implements OnInit, AfterViewInit, OnDestroy {
  salesOrders: SalesOrder[];
  salesOrders$: Subject<SalesOrder[]> = new Subject<SalesOrder[]>();
  selection: SelectionModel<SalesOrder> = new SelectionModel<SalesOrder>(
    true,
    []
  );
  selected: SalesOrder;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  updateRequestedEventEmitter: EventEmitter = new EventEmitter();

  subs: Subscription[] = [];

  results = 0;
  tableColumns = [
    'select',
    'operation',
    'salesOrderID',
    'orderDate',
    'customerID',
    'status',
    'salesOrderNumber',
    'shipToAddressID',
    'subTotal',
    'taxAmt',
    'freight',
    'totalDue',
    'modifiedDate',
  ];
  loading = true;
  faEdit = faEdit;
  constructor(
    private salesOrdersService: SalesOrderService,
    private dialog: MatDialog,
    private notify: PNotifyService
  ) { }
  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  ngOnInit(): void {
  }

  loadData() {
    this.loading = true;
    this.subs.push(this.salesOrdersService.getAll(
      this.paginator.pageIndex + 1,
      this.paginator.pageSize
    )
      .subscribe(data => {
        this.loading = false;
        this.salesOrders$.next(data.items);
        this.results = data.totalItems;
      }, err => {
        this.loading = false;
      }));
  }

  ngAfterViewInit(): void {
    this.paginator.page.subscribe(pageEvent => {
      this.loadData();
    });
    this.loadData();
  }

  deleteEntries() {
    console.log(this.selection);
    if (this.selection.isEmpty()) {
      // if (!this.selected) {
      this.dialog.open(SelectionEmptyDialogComponent, {
        width: '450px'
      });
    } else {
      const dialogRef = this.dialog.open(YesNoDialogComponent, {
        width: '450px',
        data: {
          confirmed: false,
          title: 'Delete',
          text: 'Are you sure you want to delete these orders?'
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result.confirmed) {
          this.loading = true;
          this.salesOrdersService.delete(this.selection.selected.map(item => item.salesOrderID))
            .subscribe(
              result => {
                this.loading = false;
                if (result) {
                  this.selected = null;
                  this.loadData();
                }
                else {
                  this.notify.getPNotify().error({
                    text: "The server could not perform the requested action",
                  });
                }
              }
            ),
            (err) => {
              this.notify.getPNotify().error({
                title: "Error",
                text: "Error processing request",
              });
            }
        }
        this.selection.clear();
      });
    }
  }
}
