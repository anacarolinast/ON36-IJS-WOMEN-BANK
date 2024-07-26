import { Injectable, NotFoundException } from '@nestjs/common';
import { Customer } from './entity/customer.entity';
import { CreateCustomerDto } from './dto/customer.dto';
import * as fs from 'fs';
import * as path from 'path';
import { AccountsService } from 'src/accounts/accounts.service';

@Injectable()
export class CustomersService {
  private readonly filePath = path.resolve('src/customers/mock/mock-customers.json');
  private idCounter: number;
  accountsService: AccountsService;

  constructor() {
    const customers = this.readCustomers();
    this.idCounter = customers.length > 0 ? customers[customers.length - 1].id + 1 : 1;
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
      fs.writeFileSync(this.filePath, JSON.stringify(customers, null, 2), 'utf8');
      console.log('Customers written to file:', customers);
    } catch (error) {
      console.error(`Error writing customers: ${error.message}`);
    }
  }

  findById(id: number): Customer {
    const listOfCustomers = this.readCustomers();
    const customer = listOfCustomers.find(c => c.id === id);
    if (!customer) {
      throw new NotFoundException(`Customer with id ${id} not found`);
    }
    return customer;
  }

  createCustomer(createCustomerDto: CreateCustomerDto): Customer {
    const listOfCustomers = this.readCustomers();
    const { fullName, cpf, address, phoneNumber } = createCustomerDto;
    const newCustomer = new Customer(this.accountsService, this.idCounter++, fullName, cpf, address, phoneNumber);
    listOfCustomers.push(newCustomer);
    this.writeCustomers(listOfCustomers);

    console.log(`Customer created: ${newCustomer}`);

    return newCustomer;
  }

  findAll(): Customer[] {
    return this.readCustomers();
  }

  removeCustomer(id: number): void {
    const listOfCustomers = this.readCustomers();
    const indexOfCustomer = listOfCustomers.findIndex(customer => customer.id === id);

    if (indexOfCustomer < 0) {
      throw new NotFoundException(`Customer with id ${id} not found`);
    }

    listOfCustomers.splice(indexOfCustomer, 1);
    this.writeCustomers(listOfCustomers);
  }
}
