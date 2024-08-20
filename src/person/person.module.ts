import { Module } from '@nestjs/common';
import { PersonController } from './adapters/inbound/person.controller';
import { PersonService } from './application/person.service';
import { PersonFactory } from './domain/person.factory'; 

@Module({
  controllers: [PersonController],
  providers: [PersonService, PersonFactory],
  exports: [PersonFactory],
})
export class PersonModule {}
