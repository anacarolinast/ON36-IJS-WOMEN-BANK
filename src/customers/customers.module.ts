import { Module } from '@nestjs/common';
import { CustomersService } from './application/customers.service'; 
import { CustomersController } from './adapters/inbound/customers.controller';
import { PersonFactory } from 'src/person/domain/person.factory'; 
import { CustomersRepository } from './adapters/outbound/customers.repository';
import { ManagersModule } from 'src/managers/managers.module'; 
import { PersonModule } from 'src/person/person.module';

@Module({
  imports: [PersonModule, ManagersModule],
  providers: [CustomersService, PersonFactory, CustomersRepository], 
  controllers: [CustomersController],
  exports: [CustomersService, CustomersRepository],
})
export class CustomersModule {}
