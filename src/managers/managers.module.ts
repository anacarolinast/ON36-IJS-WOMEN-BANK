import { Module } from '@nestjs/common';
import { ManagersService } from './application/managers.service';
import { ManagersController } from './adapters/inbound/managers.controller';
import { PersonModule } from '../person/person.module';
import { ManagersRepository } from './adapters/outbound/managers.repository';
import { PersonFactory } from 'src/person/domain/person.factory';

@Module({
  imports: [PersonModule],
  providers: [ManagersService, ManagersRepository, PersonFactory],
  controllers: [ManagersController],
  exports: [ManagersService, ManagersRepository],
})
export class ManagersModule {}
