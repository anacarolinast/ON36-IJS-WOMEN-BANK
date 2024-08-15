import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { Customer } from 'src/customers/domain/customer.entity'; 

@Injectable()
export class CustomersRepository {
  private readonly filePath = path.resolve('./src/customers/adapters/outbound/mock/mock-customers.json');
  private idCounter: number;

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

  public getNextId(): number {
    const customers = this.readCustomers();
    return customers.length > 0 ? Math.max(...customers.map(c => c.id)) + 1 : 1;
  }

  public async findById(id: number): Promise<Customer | null> {
    const customers = this.readCustomers();
    return customers.find(customer => customer.id === id) || null;
  }

  public async save(customer: Customer): Promise<void> {
    const customers = this.readCustomers();
    const index = customers.findIndex(c => c.id === customer.id);

    if (index > -1) {
      customers[index] = customer;
    } else {
      customers.push(customer);
    }

    this.writeCustomers(customers);
  }

  public async findAll(): Promise<Customer[]> {
    return this.readCustomers();
  }

  public async remove(id: number): Promise<void> {
    let customers = this.readCustomers();
    const index = customers.findIndex(customer => customer.id === id);

    if (index < 0) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }

    customers.splice(index, 1);
    this.writeCustomers(customers);
  }
}
