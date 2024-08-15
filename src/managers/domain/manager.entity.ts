import { Person } from 'src/person/domain/person.interface';

export class Manager implements Person {
  constructor(
    public id: number,
    public fullName: string,
    public cpf: string,
    public birthOfDate: Date,
    public email: string,
    public phoneNumber: string,
    public address: string,
    public customers: number[] = [],
  ) {}
}
