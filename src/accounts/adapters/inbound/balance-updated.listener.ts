import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { BalanceUpdatedEvent } from 'src/accounts/domain/balance-updated.event'; 

@Injectable()
export class BalanceUpdatedListener {
  @OnEvent('balance.updated')
  handleBalanceChangedEvent(event: BalanceUpdatedEvent) {
    console.log(
      `Account ${event.accountId} has a new balance of ${event.newBalance}`,
    );
  }
}
