import { Account } from "../interfaces/account-interface"; 

export enum AccountType {
  CURRENT = 'Current',
  SAVING = 'Saving'
}

export enum AccountStatus {
  OPEN = 'Open',
  CLOSED = 'Closed',
}

export class BaseAccount implements Account {
    constructor(
      public id: number,
      public accountNumber: string,
      public balance: number = 0,
      public openingDate: Date,
      public type: AccountType,
      public status: AccountStatus,
      public customerId: number
    ) {}
  deposit(amount: number): void {
    throw new Error("Method not implemented.");
  }
  cashOut(amount: number): void {
    throw new Error("Method not implemented.");
  }
  payBills(amount: number): void {
    throw new Error("Method not implemented.");
  }
  checkBalance(): number {
    throw new Error("Method not implemented.");
  }
  }