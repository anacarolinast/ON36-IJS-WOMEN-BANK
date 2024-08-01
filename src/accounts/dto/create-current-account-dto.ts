import { CreateAccountDto } from "./create-account-dto"; 

export class CreateCurrentAccountDto extends CreateAccountDto {
  readonly overdraftLimit: number;

  constructor(
    id: number,
    accountNumber: string,
    balance: number,
    openingDate: string,
    overdraftLimit: number,
    customerId?: number,
  ) {
    super(id, accountNumber, balance, openingDate, customerId);
    this.overdraftLimit = overdraftLimit;
  }
}
