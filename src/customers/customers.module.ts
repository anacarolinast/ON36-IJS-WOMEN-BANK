import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { PersonFactory } from 'src/person/factories/person.factory';
import { ManagersService } from 'src/managers/managers.service';
import { PersonModule } from 'src/person/person.module';

@Module({
  imports: [PersonModule],
  providers: [CustomersService, PersonFactory, ManagersService],
  controllers: [CustomersController],
  exports: [CustomersService],
})
export class CustomersModule {}
