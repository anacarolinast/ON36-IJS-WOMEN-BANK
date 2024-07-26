import { CreateAccountDto } from "./create-account-dto"; 

export class CreateSavingAccountDto extends CreateAccountDto {
  readonly interestRate: number;

  constructor(
    id: number,
    accountNumber: string,
    balance: number,
    openingDate: string,
    interestRate: number,
    customerId?: number,
  ) {
    super(id, accountNumber, balance, openingDate, customerId);
    this.interestRate = interestRate;
  }
}
