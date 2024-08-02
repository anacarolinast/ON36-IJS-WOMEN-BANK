import { AccountStatus } from '../enums/account-status.enum';
import { AccountType } from '../enums/account-type.enum';
import { Account } from '../interfaces/account.interface';

export class CurrentAccount implements Account {
  type = AccountType.Current;

  constructor(
    public id: number,
    public accountNumber: string,
    public balance: number,
    public openingDate: Date,
    public status: AccountStatus.Open,
    public overdraftLimit: number,
    public customerId: number,
  ) {}
}
