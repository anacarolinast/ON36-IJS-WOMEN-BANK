import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountsModule } from './accounts/accounts.module';
import { CustomersModule } from './customers/customers.module';
import { ManagersModule } from './managers/managers.module';

@Module({
  imports: [AccountsModule, CustomersModule, ManagersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
