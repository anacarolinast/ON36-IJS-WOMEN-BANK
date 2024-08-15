import { AccountStatus } from '../domain/account-status.enum';
import { AccountType } from '../domain/account-type.enum';

export interface Account {
  id: number;
  accountNumber: string;
  balance: number;
  openingDate: Date;
  type: AccountType;
  status: AccountStatus;
  customerId: number;
  socialCurrencyBalance: number;
}
