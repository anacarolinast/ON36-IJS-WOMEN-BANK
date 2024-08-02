import { Module } from '@nestjs/common';
import { ManagersService } from './managers.service';
import { ManagersController } from './managers.controller';
import { CustomersModule } from '../customers/customers.module';
import { PersonModule } from '../person/person.module';

@Module({
  imports: [CustomersModule, PersonModule],
  providers: [ManagersService],
  controllers: [ManagersController],
  exports: [ManagersService]
})
export class ManagersModule {}
