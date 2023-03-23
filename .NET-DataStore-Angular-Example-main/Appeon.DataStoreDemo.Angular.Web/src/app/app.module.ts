import { ShippingMethodService } from './services/shippingMethods/shipping-method.service';
import { SalesOrderService } from './services/sales-order/sales-order.service';
import { SidebarService } from './services/ui/sidebar.service';
import { SessionService } from './services/session/session.service';
import { LoginService } from './services/login/login.service';
import { ReportsService } from './services/reports/reports.service';
import { ApiService } from './services/api/api.service';
import { PNotifyService } from './pnotify.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgxEchartsModule } from 'ngx-echarts';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { LoginComponent } from './login/login.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NavbarComponent } from './navbar/navbar/navbar.component';
import { TemplateComponent } from './template/template/template.component';
import { DrawerRailModule } from 'angular-material-rail-drawer';
import { OrderListComponent } from './order-list/order-list.component';
import { AddOrderComponent } from './add-order/add-order.component';
import { OrderEditComponent } from './order-edit/order-edit.component';
import { SelectionEmptyDialogComponent } from './order-list/dialogs/selection-empty-dialog/selection-empty-dialog.component';
import { ConfirmDeleteDialogComponent } from './order-list/dialogs/confirm-delete-dialog/confirm-delete-dialog.component';
import { FooterComponentComponent } from './footer-component/footer-component.component';
import { CustomerService } from './services/customers/customer.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { AddProductDialogComponent } from './add-order/dialogs/add-product-dialog/add-product-dialog.component';
import { ProductsService } from './services/products/products.service';
import { YesNoDialogComponent } from './dialogs/yes-no-dialog/yes-no-dialog.component';
import { MinDirective } from './directives/min.directive';
import { MaxDirective } from './directives/max.directive';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    LoginComponent,
    SidebarComponent,
    NavbarComponent,
    TemplateComponent,
    OrderListComponent,
    AddOrderComponent,
    OrderEditComponent,
    SelectionEmptyDialogComponent,
    ConfirmDeleteDialogComponent,
    FooterComponentComponent,
    AddProductDialogComponent,
    YesNoDialogComponent,
    MinDirective,
    MaxDirective,
  ],
  imports: [
    MatDialogModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    NgSelectModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: '',
        component: TemplateComponent,
        children: [
          {
            path: '',
            component: HomeComponent,
          },
          { path: 'counter', component: CounterComponent },
          {
            path: 'salesOrders',
            children: [
              {
                path: '',
                component: OrderListComponent,
                pathMatch: 'full'
              },
              {
                path: 'add',
                component: AddOrderComponent,
                pathMatch: 'full'
              },
              {
                path: 'edit/:id',
                component: OrderEditComponent,
                pathMatch: 'full'
              },
            ],
          },
        ],
      },
      { path: 'login', component: LoginComponent },
    ]),
    FontAwesomeModule,
    NgbDropdownModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatExpansionModule,
    MatListModule,
    DrawerRailModule,
    MatMenuModule,
    MatTableModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatDialogModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ],
  providers: [
    PNotifyService,
    ApiService,
    LoginService,
    ReportsService,
    SessionService,
    SidebarService,
    SalesOrderService,
    CustomerService,
    ShippingMethodService,
    ProductsService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
