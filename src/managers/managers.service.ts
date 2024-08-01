import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Manager } from './entity/manager.entity';
import { CreateManagerDto } from './dto/manager.dto';
import * as fs from 'fs';
import * as path from 'path';
import { CustomersService } from 'src/customers/customers.service';

@Injectable()
export class ManagersService {
  private readonly filePath = path.resolve('src/managers/mock/mock-managers.json');
  private idCounter: number;

  constructor(
    private readonly customersService: CustomersService,
  ) {
    const managers = this.readManagers();
    this.idCounter = managers.length > 0 ? managers[managers.length - 1].id + 1 : 1;
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
      fs.writeFileSync(this.filePath, JSON.stringify(managers, null, 2), 'utf8');
      console.log('Managers written to file:', managers);
    } catch (error) {
      console.error(`Error writing managers: ${error.message}`);
    }
  }

  findById(id: number): Manager {
    const listOfManagers = this.readManagers();
    const manager = listOfManagers.find(m => m.id === id);
    if (!manager) {
      throw new NotFoundException(`Manager with id ${id} not found`);
    }
    return manager;
  }

  createManager(createManagerDto: CreateManagerDto): Manager {
    const listOfManagers = this.readManagers();
    const { fullName, cpf } = createManagerDto;

    const newManager = new Manager(
      this.idCounter++, 
      fullName, 
      cpf
    );

    listOfManagers.push(newManager);
    this.writeManagers(listOfManagers);

    console.log(`Manager created: ${newManager}`);

    return newManager;
  }

  findAll(): Manager[] {
    return this.readManagers();
  }

  removeManager(id: number): void {
    const listOfManagers = this.readManagers();
    const indexOfManager = listOfManagers.findIndex(manager => manager.id === id);

    if (indexOfManager < 0) {
      throw new NotFoundException(`Manager with id ${id} not found`);
    }

    listOfManagers.splice(indexOfManager, 1);
    this.writeManagers(listOfManagers);
  }

  associateCustomerToManager(managerId: number, customerId: number): void {
    const listOfManagers = this.readManagers();
    const manager = listOfManagers.find(m => m.id === managerId);

    if (!manager) {
      throw new NotFoundException(`Manager with id ${managerId} not found`);
    }

    const customer = this.customersService.findById(customerId);

    if (!customer) {
      throw new NotFoundException(`Customer with id ${customerId} not found`);
    }

    if (!manager.customers.find(c => c.id === customerId)) {
      manager.customers.push(customer);
      this.writeManagers(listOfManagers);
      console.log(`Customer with id ${customerId} associated with manager with id ${managerId}`);
    } else {
      console.log(`Customer with id ${customerId} is already associated with manager with id ${managerId}`);
    }
  }

  dissociateCustomerFromManager(managerId: number, customerId: number): void {
    const listOfManagers = this.readManagers();
    const manager = listOfManagers.find(m => m.id === managerId);

    if (!manager) {
      throw new NotFoundException(`Manager with id ${managerId} not found`);
    }

    const customerIndex = manager.customers.findIndex(c => c.id === customerId);

    if (customerIndex === -1) {
      throw new NotFoundException(`Customer with id ${customerId} is not associated with manager with id ${managerId}`);
    }

    manager.customers.splice(customerIndex, 1);
    this.writeManagers(listOfManagers);
    console.log(`Customer with id ${customerId} dissociated from manager with id ${managerId}`);
  }
}
