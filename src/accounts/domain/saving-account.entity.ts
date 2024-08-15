import { EventEmitter2 } from '@nestjs/event-emitter';
import { AccountStatus } from './account-status.enum';
import { AccountType } from './account-type.enum';
import { Account } from './account.interface'; 
import { BalanceUpdatedEvent } from './balance-updated.event';

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
    public eventEmitter: EventEmitter2,
    public socialCurrencyBalance: number
  ) {}

  private notifyBalanceChange() {
    this.eventEmitter.emit(
      'balance.changed',
      new BalanceUpdatedEvent(this.id, this.balance),
    );
  }

  deposit(amount: number): void {
    this.balance += amount;
    this.notifyBalanceChange();
  }
}
