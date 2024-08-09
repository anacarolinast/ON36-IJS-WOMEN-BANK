import { Injectable, NotFoundException } from '@nestjs/common';
import { Customer } from './entity/customer.entity';
import * as fs from 'fs';
import * as path from 'path';
import { PersonFactory } from 'src/person/factories/person.factory';
import { PersonType } from 'src/person/enums/person.enum';
import { ManagersService } from 'src/managers/managers.service';

@Injectable()
export class CustomersService {
  private readonly filePath = path.resolve(
    'src/customers/mock/mock-customers.json',
  );
  private idCounter: number;

  constructor(
    private readonly personFactory: PersonFactory,
    private readonly managersService: ManagersService,
  ) {
    const customers = this.readCustomers();
    this.idCounter =
      customers.length > 0 ? customers[customers.length - 1].id + 1 : 1;
    console.log(`Initialized ID Counter: ${this.idCounter}`);
  }

  private readCustomers(): Customer[] {
    try {
      if (!fs.existsSync(this.filePath)) {
        console.log('File does not exist, returning empty array.');
        return [];
      }

      const data = fs.readFileSync(this.filePath, 'utf8');
      const customers = JSON.parse(data) as Customer[];
      console.log('Customers read from file:', customers);
      return customers;
    } catch (error) {
      console.error(`Error reading customers: ${error.message}`);
      return [];
    }
  }

  private writeCustomers(customers: Customer[]): void {
    try {
      fs.writeFileSync(
        this.filePath,
        JSON.stringify(customers, null, 2),
        'utf8',
      );
      console.log('Customers written to file:', customers);
    } catch (error) {
      console.error(`Error writing customers: ${error.message}`);
    }
  }

  updateCustomer(updatedCustomer: Customer): void {
    const customers = this.readCustomers();
    const index = customers.findIndex(
      (customer) => customer.id === updatedCustomer.id,
    );
    if (index === -1) {
      throw new NotFoundException(
        `Customer with ID ${updatedCustomer.id} not found`,
      );
    }
    customers[index] = updatedCustomer;
    this.writeCustomers(customers);
  }

  findById(id: number): Customer {
    const listOfCustomers = this.readCustomers();
    const customer = listOfCustomers.find((c) => c.id === id);
    if (!customer) {
      throw new NotFoundException(`Customer with id ${id} not found`);
    }
    return customer;
  }

  findAll(): Customer[] {
    return this.readCustomers();
  }

  createCustomer(
    fullName: string,
    cpf: string,
    birthOfDate: Date,
    email: string,
    phoneNumber: string,
    address: string,
    managerId: number,
  ): Customer {
    const customers = this.readCustomers();
    const manager = this.managersService.findById(managerId);

    if (!manager) {
      throw new NotFoundException(`Manager with ID ${managerId} not found`);
    }

    const newCustomer = this.personFactory.createPerson(
      PersonType.Customer,
      this.idCounter++,
      fullName,
      cpf,
      birthOfDate,
      email,
      phoneNumber,
      address,
      managerId,
    ) as Customer;

    customers.push(newCustomer);
    this.writeCustomers(customers);

    manager.customers.push(newCustomer.id);
    this.managersService.updateManager(manager);

    return newCustomer;
  }

  removeCustomer(id: number): void {
    let listOfCustomers = this.readCustomers();
    const indexOfCustomer = listOfCustomers.findIndex(
      (customer) => customer.id === id,
    );

    if (indexOfCustomer < 0) {
      throw new NotFoundException(`Customer with id ${id} not found`);
    }

    listOfCustomers.splice(indexOfCustomer, 1);
    this.writeCustomers(listOfCustomers);

    const managers = this.managersService.findAll();
    for (const manager of managers) {
      const customerIndex = manager.customers.indexOf(id);
      if (customerIndex > -1) {
        manager.customers.splice(customerIndex, 1);
        this.managersService.updateManager(manager);
      }
    }
  }
}
