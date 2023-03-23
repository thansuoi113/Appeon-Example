
export class Product {
  constructor(public id: number,
    public name: string,
    public specialOfferId: number) {

  }

  public static FromJson(json: any): Product {
    return new Product(
      json.id,
      json.name,
      json.specialOfferId
    );
  }
}
