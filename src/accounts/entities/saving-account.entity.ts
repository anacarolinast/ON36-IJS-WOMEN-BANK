import { EventEmitter2 } from '@nestjs/event-emitter';
import { AccountStatus } from '../enums/account-status.enum';
import { AccountType } from '../enums/account-type.enum';
import { Account } from '../interfaces/account.interface';
import { BalanceUpdatedEvent } from '../events/balance-updated.event';

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
