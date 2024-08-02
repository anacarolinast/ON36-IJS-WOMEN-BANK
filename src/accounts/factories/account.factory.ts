import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CurrentAccount } from '../entities/current-account.entity';
import { SavingAccount } from '../entities/saving-account.entity'; 
import { AccountType } from '../enums/account-type.enum'; 
import { AccountStatus } from '../enums/account-status.enum'; 
import { Account } from '../interfaces/account.interface'; 

@Injectable()
export class AccountFactory {
  constructor(private readonly eventEmitter: EventEmitter2) {}

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
          customerId,
          overdraftLimit!,
          this.eventEmitter,
        );
      case AccountType.Saving:
        return new SavingAccount(
          id,
          accountNumber,
          balance,
          openingDate,
          status,
          customerId,
          interestRate!,
          this.eventEmitter, 
        );
      default:
        throw new Error('Invalid account type');
    }
  }
}
