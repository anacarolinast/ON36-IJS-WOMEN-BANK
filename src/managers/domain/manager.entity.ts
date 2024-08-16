import { Address } from 'src/person/domain/address.interface';
import { Person } from 'src/person/domain/person.interface';

export class Manager implements Person {
  constructor(
    public id: number,
    public fullName: string,
    public cpf: string,
    public birthOfDate: Date,
    public email: string,
    public phoneNumber: string,
    public address: Address,
    public customers: number[] = [],
  ) {}
}
