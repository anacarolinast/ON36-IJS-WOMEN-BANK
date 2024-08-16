import { Injectable } from '@nestjs/common';
import { Person } from '../domain/person.interface';
import { PersonType } from '../domain/person.enum';
import { Customer } from 'src/customers/domain/customer.entity'; 
import { Manager } from 'src/managers/domain/manager.entity'; 
import { Address } from './address.interface';

@Injectable()
export class PersonFactory {
  createPerson(
    type: PersonType,
    id: number,
    fullName: string,
    cpf: string,
    birthOfDate: Date,
    email: string,
    phoneNumber: string,
    address: Address,
    managerId?: number,
  ): Person {
    switch (type) {
      case PersonType.Customer:
        if (managerId === undefined) {
          throw new Error('managerId is required for Customer');
        }
        return new Customer(
          id,
          fullName,
          cpf,
          birthOfDate,
          email,
          phoneNumber,
          address,
          managerId,
        );
      case PersonType.Manager:
        return new Manager(
          id,
          fullName,
          cpf,
          birthOfDate,
          email,
          phoneNumber,
          address,
        );
      default:
        throw new Error('Invalid person type');
    }
  }
}
