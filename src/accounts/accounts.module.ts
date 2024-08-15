import { Module } from '@nestjs/common';
import { AccountsService } from './application/accounts.service';
import { AccountsController } from './adapters/inbound/accounts.controller'; 
import { AccountFactory } from './domain/account.factory';
import { CustomersModule } from 'src/customers/customers.module'; // Certifique-se de que CustomersModule está importado
import { ManagersModule } from 'src/managers/managers.module';
import { BalanceUpdatedListener } from './adapters/inbound/balance-updated.listener'; 
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AccountsRepository } from './adapters/outbound/accounts.repository';

@Module({
  imports: [CustomersModule, ManagersModule, EventEmitterModule.forRoot()],
  providers: [
    AccountsService,
    AccountFactory,
    BalanceUpdatedListener,
    AccountsRepository
  ],
  controllers: [AccountsController],
  exports: [AccountsService],
})
export class AccountsModule {}
