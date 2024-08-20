import { Injectable, NotFoundException } from '@nestjs/common';
import { Customer } from '../domain/customer.entity';
import { CustomersRepository } from '../adapters/outbound/customers.repository'; 
import { PersonFactory } from 'src/person/domain/person.factory'; 
import { PersonType } from 'src/person/domain/person.enum';
import { ManagersService } from 'src/managers/application/managers.service';
import { Address } from 'src/person/domain/address.interface';
import { fetchAddressByCep } from 'src/utils/address.util'; // Importa o utilitário para obter o endereço

@Injectable()
export class CustomersService {
  constructor(
    private readonly customerRepository: CustomersRepository,
    private readonly personFactory: PersonFactory,
    private readonly managersService: ManagersService,
  ) {}

  async updateCustomer(updatedCustomer: Customer): Promise<void> {
    const existingCustomer = await this.customerRepository.findById(updatedCustomer.id);
    if (!existingCustomer) {
      throw new NotFoundException(`Customer with ID ${updatedCustomer.id} not found`);
    }
    await this.customerRepository.save(updatedCustomer);
  }

  async findById(id: number): Promise<Customer> {
    const customer = await this.customerRepository.findById(id);
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    return customer;
  }

  async findAll(): Promise<Customer[]> {
    return this.customerRepository.findAll();
  }

  async createCustomer(
    fullName: string,
    cpf: string,
    birthOfDate: Date,
    email: string,
    phoneNumber: string,
    cep: string,
    managerId: number,
  ): Promise<Customer> {
    const manager = await this.managersService.findById(managerId);
    if (!manager) {
      throw new NotFoundException(`Manager with ID ${managerId} not found`);
    }

    const address: Address = await fetchAddressByCep(cep);

    const newCustomer = this.personFactory.createPerson(
      PersonType.Customer,
      await this.customerRepository.getNextId(),
      fullName,
      cpf,
      birthOfDate,
      email,
      phoneNumber,
      address,
      managerId,
    ) as Customer;

    await this.customerRepository.save(newCustomer);

    manager.customers.push(newCustomer.id);
    await this.managersService.updateManager(manager);

    return newCustomer;
  }

  async removeCustomer(id: number): Promise<void> {
    await this.customerRepository.remove(id);

    const managers = await this.managersService.findAll();
    for (const manager of managers) {
      const customerIndex = manager.customers.indexOf(id);
      if (customerIndex > -1) {
        manager.customers.splice(customerIndex, 1);
        await this.managersService.updateManager(manager);
      }
    }
  }
}
