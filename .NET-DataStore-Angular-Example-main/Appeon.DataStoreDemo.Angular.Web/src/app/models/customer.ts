

export class Customer {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string
  ){}

  public static FromJson(json: any) {
    return new Customer(
      json.id,
      json.firstName,
      json.lastName
    );
  }
}
