import { AccountStatus } from '../enums/account-status.enum';
import { AccountType } from '../enums/account-type.enum';
import { Account } from '../interfaces/account.interface';

export class SavingAccount implements Account {
  type = AccountType.Saving;

  constructor(
    public id: number,
    public accountNumber: string,
    public balance: number,
    public openingDate: Date,
    public status: AccountStatus.Open,
    public interestRate: number,
    public customerId: number,
  ) {}
}
