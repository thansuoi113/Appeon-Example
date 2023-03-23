import { SalesOrderService } from "../services/sales-order/sales-order.service";

export class SalesOrderProduct {
  constructor(
    public id: number,
    public productId: number,
    public productName: string,
    public unitPrice: number,
    public orderQty: number,
    public unitPriceDiscount: number,
    public lineTotal: number,
    public modifiedDate: Date,
    public specialOfferId: number
  ){}

  public static FromJson(json: any) {
   return new SalesOrderProduct (
      json.id,
      json.productId,
      json.productName,
      json.unitPrice,
      json.orderQty,
      json.unitPriceDiscount,
      json.lineTotal,
      json.modifiedDate,
      json.specialOfferId
    );
  }
}
