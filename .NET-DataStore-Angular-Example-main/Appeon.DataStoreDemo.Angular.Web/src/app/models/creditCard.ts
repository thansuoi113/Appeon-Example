export class CreditCard {
  constructor(public id: number, public type: string, public number: string) {}

  public static FromJson(json: any): CreditCard {
    return new CreditCard(json.id, json.type, json.number);
  }
}
