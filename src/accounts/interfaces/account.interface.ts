import { AccountStatus } from '../enums/account-status.enum';
import { AccountType } from '../enums/account-type.enum';

export interface Account {
  id: number;
  accountNumber: string;
  balance: number;
  openingDate: Date;
  type: AccountType;
  status: AccountStatus;
  customerId: number;
}
