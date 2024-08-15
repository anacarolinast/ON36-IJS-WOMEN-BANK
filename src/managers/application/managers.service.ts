import { Injectable } from '@nestjs/common';
import { Manager } from '../domain/manager.entity';
import { PersonFactory } from 'src/person/domain/person.factory'; 
import { PersonType } from 'src/person/domain/person.enum';
import { ManagersRepository } from '../adapters/outbound/managers.repository'; 

@Injectable()
export class ManagersService {
  constructor(
    private readonly personFactory: PersonFactory,
    private readonly managersRepository: ManagersRepository,
  ) {}

  async updateManager(updatedManager: Manager): Promise<void> {
    await this.managersRepository.save(updatedManager);
  }

  async findById(id: number): Promise<Manager> {
    return this.managersRepository.findById(id);
  }

  async findAll(): Promise<Manager[]> {
    return this.managersRepository.findAll();
  }

  async createManager(
    fullName: string,
    cpf: string,
    birthOfDate: Date,
    email: string,
    phoneNumber: string,
    address: string,
  ): Promise<Manager> {
    const nextId = this.managersRepository.getNextId();

    const newManager = this.personFactory.createPerson(
      PersonType.Manager,
      nextId,
      fullName,
      cpf,
      birthOfDate,
      email,
      phoneNumber,
      address,
    ) as Manager;

    await this.managersRepository.save(newManager);
    return newManager;
  }

  async removeManager(id: number): Promise<void> {
    await this.managersRepository.remove(id);
  }
}
