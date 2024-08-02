import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AppService } from './app.service';
import { AccountsModule } from './accounts/accounts.module';
import { CustomersModule } from './customers/customers.module';
import { ManagersModule } from './managers/managers.module';
import { PersonModule } from './person/person.module';

@Module({
  imports: [EventEmitterModule.forRoot(), AccountsModule, CustomersModule, ManagersModule, PersonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
