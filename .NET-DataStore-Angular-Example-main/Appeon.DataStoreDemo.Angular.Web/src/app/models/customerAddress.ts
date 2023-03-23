export class CustomerAddress {
  constructor(
    public id: number,
    public addressLine1: string,
    public addressLine2: string
  ) {}

  public static FromJson(json: any): CustomerAddress {
    return new CustomerAddress(json.id, json.addressLine1, json.addressLine2);
  }
}
