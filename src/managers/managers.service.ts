import { Injectable, NotFoundException } from '@nestjs/common';
import { Manager } from './entity/manager.entity';
import { PersonFactory } from '../person/factories/person.factory';
import { PersonType } from './../person/enums/person.enum';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ManagersService {
  private readonly filePath = path.resolve(
    'src/managers/mock/mock-managers.json',
  );
  private idCounter: number;

  constructor(private readonly personFactory: PersonFactory) {
    const managers = this.readManagers();
    this.idCounter =
      managers.length > 0 ? managers[managers.length - 1].id + 1 : 1;
    console.log(`Initialized ID Counter: ${this.idCounter}`);
  }

  private readManagers(): Manager[] {
    try {
      if (!fs.existsSync(this.filePath)) {
        console.log('File does not exist, returning empty array.');
        return [];
      }
      const data = fs.readFileSync(this.filePath, 'utf8');
      const managers = JSON.parse(data) as Manager[];
      console.log('Managers read from file: ', managers);
      return managers;
    } catch (error) {
      console.error(`Error reading managers: ${error.message}`);
      return [];
    }
  }

  private writeManagers(managers: Manager[]): void {
    try {
      fs.writeFileSync(
        this.filePath,
        JSON.stringify(managers, null, 2),
        'utf8',
      );
      console.log('Managers written to file:', managers);
    } catch (error) {
      console.error(`Error writing managers: ${error.message}`);
    }
  }

  updateManager(updatedManager: Manager): void {
    const managers = this.readManagers();
    const index = managers.findIndex(
      (manager) => manager.id === updatedManager.id,
    );
    if (index === -1) {
      throw new NotFoundException(
        `Customer with ID ${updatedManager.id} not found`,
      );
    }
    managers[index] = updatedManager;
    this.writeManagers(managers);
  }

  findById(id: number): Manager {
    const listOfManagers = this.readManagers();
    const manager = listOfManagers.find((m) => m.id === id);
    if (!manager) {
      throw new NotFoundException(`Manager with id ${id} not found`);
    }
    return manager;
  }

  findAll(): Manager[] {
    return this.readManagers();
  }

  createManager(
    fullName: string,
    cpf: string,
    birthOfDate: Date,
    email: string,
    phoneNumber: string,
    address: string,
  ): Manager {
    const managers = this.readManagers();

    const newManager = this.personFactory.createPerson(
      PersonType.Manager,
      this.idCounter++,
      fullName,
      cpf,
      birthOfDate,
      email,
      phoneNumber,
      address,
    ) as Manager;

    managers.push(newManager);
    this.writeManagers(managers);

    return newManager;
  }

  removeManager(id: number): void {
    let managers = this.readManagers();
    const managerIndex = managers.findIndex((m) => m.id === id);

    if (managerIndex === -1) {
      throw new NotFoundException(`Manager with id ${id} not found`);
    }

    managers = managers.filter((m) => m.id !== id);
    this.writeManagers(managers);
  }
}
