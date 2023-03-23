export class ShippingMethod {
  constructor(
    public id: number,
    public name: string,
    public shipBase: number,
    public shipRate: number
  ) {}

  public static FromJson(json: any): ShippingMethod {
    return new ShippingMethod(
      json.shipmethodid,
      json.name,
      json.shipbase,
      json.shiprate
    );
  }
}
