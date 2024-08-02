import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { AccountFactory } from './factories/account.factory';
import { CustomersService } from 'src/customers/customers.service';
import { PersonModule } from 'src/person/person.module';
import { ManagersModule } from 'src/managers/managers.module';

@Module({
  imports: [PersonModule, ManagersModule],
  providers: [AccountsService, AccountFactory, CustomersService],
  controllers: [AccountsController],
  exports: [AccountsService]
})
export class AccountsModule {}
