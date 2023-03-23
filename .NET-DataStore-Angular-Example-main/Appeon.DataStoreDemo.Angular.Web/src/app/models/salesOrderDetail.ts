import { Customer } from "./customer";
import { CustomerDetail } from "./customerDetail";
import { SalesOrder } from "./salesOrder";
import { SalesOrderProduct } from "./salesOrderProduct";

export class SalesOrderDetail {
  constructor (
    public salesOrder: SalesOrder,
    public customer: Customer,
    public customerDetail: CustomerDetail,
    public salesOrderProducts: SalesOrderProduct[]
  ){

  }

  public static FromJson(json: any): SalesOrderDetail {
    return new SalesOrderDetail(
      SalesOrder.FromJson(json.salesOrder),
      Customer.FromJson(json.customer),
      CustomerDetail.FromJson(json.customerDetail),
      json.products.map(item => SalesOrderProduct.FromJson(item))
    );
  }
}
