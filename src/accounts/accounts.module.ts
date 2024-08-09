import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { AccountFactory } from './factories/account.factory';
import { CustomersService } from 'src/customers/customers.service';
import { PersonModule } from 'src/person/person.module';
import { ManagersModule } from 'src/managers/managers.module';
import { BalanceUpdatedListener } from './listeners/balance-updated.listener';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [PersonModule, ManagersModule, EventEmitterModule.forRoot()],
  providers: [AccountsService, AccountFactory, CustomersService, BalanceUpdatedListener],
  controllers: [AccountsController],
  exports: [AccountsService]
})
export class AccountsModule {}
