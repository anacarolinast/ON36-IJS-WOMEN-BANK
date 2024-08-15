import { Account } from 'src/accounts/domain/account.interface'; 
import { Person } from 'src/person/domain/person.interface';

export class Customer implements Person {
  constructor(
    public id: number,
    public fullName: string,
    public cpf: string,
    public birthOfDate: Date,
    public email: string,
    public phoneNumber: string,
    public address: string,
    public managerId: number,
    public accounts: Account[] = [],
  ) {}
}
