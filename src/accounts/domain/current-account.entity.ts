import { EventEmitter2 } from '@nestjs/event-emitter';
import { AccountStatus } from './account-status.enum';
import { AccountType } from './account-type.enum';
import { Account } from './account.interface'; 
import { BalanceUpdatedEvent } from './balance-updated.event';

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
