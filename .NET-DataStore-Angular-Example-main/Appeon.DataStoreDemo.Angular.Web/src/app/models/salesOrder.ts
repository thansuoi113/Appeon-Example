export class SalesOrder {
  salesOrderID: number;
  revisionNumber: number;
  orderDate: Date;
  dueDate: Date;
  shipDate: Date;
  status: number;
  onlineOrderFlag: boolean;
  salesOrderNumber: string;
  purchaseOrderNumber: string;
  accountNumber: string;
  customerID: number;
  salesPersonID: number;
  territoryID: number;
  billToAddressID: number;
  shipToAddressID: number;
  shipMethodID: number;
  creditCardID: number;
  creditCardApprovalCode: string;
  currencyRateID: number;
  subTotal: number;
  taxAmt: number;
  freight: number;
  totalDue: number;
  comment?: any;
  modifiedDate: Date;

  public static FromJson(json: any): SalesOrder {
    let obj = new SalesOrder();
    obj.salesOrderID = json.salesOrderID;;
    obj.revisionNumber = json.revisionNumber;;
    obj.orderDate = json.orderDate;
    obj.dueDate = json.dueDate;
    obj.shipDate = json.shipDate;
    obj.status = json.status;
    obj.onlineOrderFlag = json.onlineOrderFlag;
    obj.salesOrderNumber = json.salesOrderNumber;
    obj.purchaseOrderNumber = json.purchaseOrderNumber;
    obj.accountNumber = json.accountNumber;
    obj.customerID = json.customerID;
    obj.salesPersonID = json.salesPersonID;
    obj.territoryID = json.territoryID;
    obj.shipToAddressID = json.billToAddressID;
    obj.shipToAddressID = json.shipToAddressID;
    obj.shipMethodID = json.shipMethodID;
    obj.creditCardID = json.creditCardID;
    obj.creditCardApprovalCode = json.creditCardApprovalCode;;
    obj.currencyRateID = json.currencyRateID;
    obj.subTotal = json.subTotal;
    obj.taxAmt = json.taxAmt;
    obj.freight = json.freight;
    obj.totalDue = json.totalDue;
    obj.comment = json.comment;
    obj.modifiedDate = json.modifiedDate;
    return obj;
  }
}
