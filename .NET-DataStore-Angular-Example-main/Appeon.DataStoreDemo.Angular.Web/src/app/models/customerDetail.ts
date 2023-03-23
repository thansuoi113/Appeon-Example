import { CreditCard } from './creditCard';
import { CustomerAddress } from './customerAddress';

export class CustomerDetail {
  constructor(
    public addresses: CustomerAddress[],
    public cards: CreditCard[]
  ) {
  }

  public static FromJson(json: any): CustomerDetail {
    return new CustomerDetail(
      json.addresses.map((add: any) => CustomerAddress.FromJson(add)),
      json.creditCards.map((cc: any) => CreditCard.FromJson(cc))
    );
  }
}
