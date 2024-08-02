import { Account } from './interfaces/account.interface';
import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { AccountFactory } from './factories/account.factory';
import { AccountType } from './enums/account-type.enum';
import { AccountStatus } from './enums/account-status.enum';
import { CustomersService } from 'src/customers/customers.service';

@Injectable()
export class AccountsService {
  private readonly filePath = path.resolve('src/accounts/mock/mock-accounts.json');
  private idCounter: number;

  constructor(
    private readonly accountFactory: AccountFactory,
    private readonly customersService: CustomersService 
  ) {
    const accounts = this.readAccounts();
    this.idCounter = accounts.length > 0 ? accounts[accounts.length - 1].id + 1 : 1;
    console.log(`Initialized ID Counter: ${this.idCounter}`);
  }

  private generateAccountNumber(): string {
    return Math.random().toString().slice(2, 14).padStart(12, '0');
  }

  private readAccounts(): Account[] {
    try {
      if (!fs.existsSync(this.filePath)) {
        console.log('File does not exist, returning empty array.');
        return [];
      }

      const data = fs.readFileSync(this.filePath, 'utf8');
      return JSON.parse(data) as Account[];
    } catch (error) {
      console.error(`Error reading accounts: ${error.message}`);
      return [];
    }
  }

  private writeAccounts(accounts: Account[]): void {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(accounts, null, 2), 'utf8');
    } catch (error) {
      console.error(`Error writing accounts: ${error.message}`);
    }
  }
  

  createAccount(
    balance: number,
    type: AccountType,
    customerId: number,
    overdraftLimit?: number,
    interestRate?: number,
  ): Account {
    const accounts = this.readAccounts();
    const customer = this.customersService.findById(customerId);

    const accountNumber = this.generateAccountNumber();
    const openingDate = new Date();
    const status = AccountStatus.Open;

    const existingAccountNumber = accounts.find(account => account.accountNumber === accountNumber);
    if (existingAccountNumber) {
      throw new ConflictException('Account with the generated number already exists');
    }

    const existingTypeAccount = accounts.some(
      (account) =>
        account.customerId === customerId && account.type === type
    );
    if (existingTypeAccount) {
      throw new ConflictException('Customer already has an account of this type');
    }

    const newAccount = this.accountFactory.createAccount(
      this.idCounter++,
      accountNumber,
      balance,
      openingDate,
      type,
      status,
      customerId,
      overdraftLimit,
      interestRate,
    );

    accounts.push(newAccount);
    this.writeAccounts(accounts);

    customer.accounts.push(newAccount);
    this.customersService.updateCustomer(customer);

    return newAccount;
  }

  updateStatusAccount(accountId: number, newStatus: AccountStatus): void {
    const accounts = this.readAccounts();
    const account = accounts.find(acc => acc.id === accountId);
    if (!account) {
      throw new NotFoundException(`Account with ID ${accountId} not found`);
    }
    account.status = newStatus;
    this.writeAccounts(accounts);
  }

  updateTypeAccount(accountId: number, newType: AccountType): void {
    const accounts = this.readAccounts();
    const account = accounts.find(acc => acc.id === accountId);
    if (!account) {
      throw new NotFoundException(`Account with ID ${accountId} not found`);
    }
    account.type = newType;
    this.writeAccounts(accounts);
  }

  findById(id: number): Account {
    const accounts = this.readAccounts();
    const account = accounts.find(account => account.id === id);
    if (!account) {
      throw new NotFoundException(`Account with id ${id} not found`);
    }
    return account;
  }

  findAll(): Account[] {
    return this.readAccounts();
  }

  checkBalance(id: number): number {
    const account = this.findById(id);
    return account.balance;
  }

  deposit(id: number, amount: number): Account {
    const account = this.findById(id);
    account.balance += amount;
    this.writeAccounts(this.readAccounts());
    return account;
  }

  cashOut(id: number, amount: number): Account {
    const account = this.findById(id);
    account.balance -= amount;
    this.writeAccounts(this.readAccounts());
    return account;
  }

  payBills(id: number, amount: number): Account {
    return this.cashOut(id, amount);
  }
}
