import { Injectable } from '@nestjs/common';
import { AccountType } from '../enums/account-type.enum';
import { Account } from '../interfaces/account.interface';
import { SavingAccount } from '../entities/saving-account.entity';
import { AccountStatus } from '../enums/account-status.enum';
import { CurrentAccount } from '../entities/current-account.entity';

@Injectable()
export class AccountFactory {
  createAccount(
    id: number,
    accountNumber: string,
    balance: number,
    openingDate: Date,
    type: AccountType,
    status: AccountStatus.Open,
    customerId: number,
    overdraftLimit?: number,
    interestRate?: number,
  ): Account {
    switch (type) {
      case AccountType.Current:
        return new CurrentAccount(
          id,
          accountNumber,
          balance,
          openingDate,
          status,
          overdraftLimit,
          customerId,
        );
      case AccountType.Saving:
        return new SavingAccount(
          id,
          accountNumber,
          balance,
          openingDate,
          status,
          interestRate,
          customerId,
        );
    }
  }
}
