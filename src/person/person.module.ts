import { Module } from '@nestjs/common';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';
import { PersonFactory } from './factories/person.factory';

@Module({
  controllers: [PersonController],
  providers: [PersonService, PersonFactory],
  exports: [PersonFactory],
})
export class PersonModule {}
