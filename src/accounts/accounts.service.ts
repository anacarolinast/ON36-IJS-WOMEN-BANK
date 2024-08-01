import {
    Injectable,
    NotFoundException,
    ConflictException,
  } from '@nestjs/common';
  import { CurrentAccount } from './entities/current-account.entity';
  import { SavingAccount } from './entities/saving-account.entity';
  import { CreateCurrentAccountDto } from './dto/create-current-account-dto'; 
  import { CreateSavingAccountDto } from './dto/create-saving-account.dto';
  import { UpdateAccountTypeDto } from './dto/update-type-account-dto'; 
  import * as fs from 'fs';
  import * as path from 'path';
  import {
    AccountType,
    BaseAccount,
  } from './entities/base-account.entity';
  import { CustomersService } from 'src/customers/customers.service';
  import { UpdateAccountStatusDto } from './dto/update-status-account-dto';
  
  @Injectable()
  export class AccountsService {
    private readonly filePath = path.resolve(
      'src/accounts/mock/mock-accounts.json',
    );
    private readonly customersFilePath = path.resolve(
      'src/customers/mock/mock-customers.json',
    );
    private idCounter: number;
  
    constructor(private readonly customersService: CustomersService) {
      const accounts = this.readAccounts();
      this.idCounter =
        accounts.length > 0 ? accounts[accounts.length - 1].id + 1 : 1;
      console.log(`Initialized ID Counter: ${this.idCounter}`);
    }
  
    private readAccounts(): BaseAccount[] {
      try {
        if (!fs.existsSync(this.filePath)) {
          console.log('File does not exist, returning empty array.');
          return [];
        }
  
        const data = fs.readFileSync(this.filePath, 'utf8');
        return JSON.parse(data) as BaseAccount[];
      } catch (error) {
        console.error(`Error reading accounts: ${error.message}`);
        return [];
      }
    }
  
    private writeAccounts(accounts: BaseAccount[]): void {
      try {
        fs.writeFileSync(
          this.filePath,
          JSON.stringify(accounts, null, 2),
          'utf8',
        );
      } catch (error) {
        console.error(`Error writing accounts: ${error.message}`);
      }
    }
  
    private readCustomers(): any[] {
      try {
        if (!fs.existsSync(this.customersFilePath)) {
          console.log('File does not exist, returning empty array.');
          return [];
        }
  
        const data = fs.readFileSync(this.customersFilePath, 'utf8');
        return JSON.parse(data);
      } catch (error) {
        console.error(`Error reading customers: ${error.message}`);
        return [];
      }
    }
  
    private writeCustomers(customers: any[]): void {
      try {
        fs.writeFileSync(
          this.customersFilePath,
          JSON.stringify(customers, null, 2),
          'utf8',
        );
      } catch (error) {
        console.error(`Error writing customers: ${error.message}`);
      }
    }
  
    checkBalance(id: number): number {
    const listOfAccounts = this.readAccounts();
    const account = listOfAccounts.find(account => account.id === id);
  
    if (!account) {
      throw new NotFoundException('Account not found');
    }
  
    return account.balance;
  }
  
  
    deposit(id: number, amount: number): BaseAccount {
      const listOfAccounts = this.readAccounts();
      const account = listOfAccounts.find(account => account.id === id);
    
      if (!account) {
        throw new NotFoundException('Account not found');
      }
      account.balance += amount; 
    
      this.writeAccounts(listOfAccounts);
      return account;
    }
    
    cashOut(id: number, amount: number): BaseAccount {
      const listOfAccounts = this.readAccounts();
      const account = listOfAccounts.find(account => account.id === id);
    
      if (!account) {
        throw new NotFoundException('Account not found');
      }
      account.balance -= amount; 
    
      this.writeAccounts(listOfAccounts);
      return account;
    }
  
    payBills(id: number, amount: number): BaseAccount {
      return this.cashOut(id, amount);
    }  
  
    private accountExistsForCustomer(
      customerId: number,
      accountType: AccountType,
    ): boolean {
      const accounts = this.readAccounts();
      return accounts.some(
        (account) =>
          account.customerId === customerId && account.type === accountType,
      );
    }
  
    async createCurrentAccount(
      createAccountDto: CreateCurrentAccountDto,
    ): Promise<CurrentAccount> {
      if (
        this.accountExistsForCustomer(
          createAccountDto.customerId,
          AccountType.CURRENT,
        )
      ) {
        throw new ConflictException(
          `Customer with id ${createAccountDto.customerId} already has a current account`,
        );
      }
  
      const listOfAccounts = this.readAccounts();
      const customers = this.readCustomers();
      const newAccount = new CurrentAccount(
        this.idCounter++,
        createAccountDto.accountNumber,
        createAccountDto.balance,
        new Date(createAccountDto.openingDate),
        createAccountDto.customerId,
        createAccountDto.overdraftLimit,
      );
  
      listOfAccounts.push(newAccount);
      this.writeAccounts(listOfAccounts);
  
      const customer = customers.find(
        (customer) => customer.id === createAccountDto.customerId,
      );
      if (customer) {
        customer.accounts.push({
          id: newAccount.id,
          accountNumber: newAccount.accountNumber,
          balance: newAccount.balance,
          openingDate: newAccount.openingDate.toISOString(),
          type: 'current',
          status: 'open',
          overdraftLimit: newAccount.overdraftLimit,
        });
        this.writeCustomers(customers);
      } else {
        throw new NotFoundException(
          `Customer with id ${createAccountDto.customerId} not found`,
        );
      }
  
      return newAccount;
    }
  
    async createSavingAccount(
      createAccountDto: CreateSavingAccountDto,
    ): Promise<SavingAccount> {
      if (
        this.accountExistsForCustomer(
          createAccountDto.customerId,
          AccountType.SAVING,
        )
      ) {
        throw new ConflictException(
          `Customer with id ${createAccountDto.customerId} already has a saving account`,
        );
      }
  
      const listOfAccounts = this.readAccounts();
      const customers = this.readCustomers();
      const newAccount = new SavingAccount(
        this.idCounter++,
        createAccountDto.accountNumber,
        createAccountDto.balance,
        new Date(createAccountDto.openingDate),
        createAccountDto.customerId,
        createAccountDto.interestRate,
      );
  
      listOfAccounts.push(newAccount);
      this.writeAccounts(listOfAccounts);
  
      const customer = customers.find(
        (customer) => customer.id === createAccountDto.customerId,
      );
      if (customer) {
        customer.accounts.push({
          id: newAccount.id,
          accountNumber: newAccount.accountNumber,
          balance: newAccount.balance,
          openingDate: newAccount.openingDate.toISOString(),
          type: 'saving',
          status: 'open',
          interestRate: newAccount.interestRate,
        });
        this.writeCustomers(customers);
      } else {
        throw new NotFoundException(
          `Customer with id ${createAccountDto.customerId} not found`,
        );
      }
  
      return newAccount;
    }
  
    async updateAccountStatus(statusDto: UpdateAccountStatusDto): Promise<void> {
      const { newStatus, customerId, accountId } = statusDto;
      const [accounts, customers] = await Promise.all([
        this.readAccounts(),
        this.readCustomers(),
      ]);
  
      const account = accounts.find((acc) => acc.id === accountId);
      if (!account) {
        throw new NotFoundException(`Account with ID ${accountId} not found`);
      }
  
      const customer = customers.find((cust) => cust.id === customerId);
      if (!customer) {
        throw new NotFoundException(`Customer with ID ${customerId} not found`);
      }
  
      const accountBelongsToCustomer = customer.accounts.some(
        (acc) => acc.id === accountId,
      );
      if (!accountBelongsToCustomer) {
        throw new NotFoundException(
          `Account with ID ${accountId} does not belong to customer with ID ${customerId}`,
        );
      }
  
      account.status = newStatus;
  
      customer.accounts = customer.accounts.map((acc) =>
        acc.id === accountId ? { ...acc, status: newStatus } : acc,
      );
  
      this.writeAccounts(accounts);
      this.writeCustomers(customers);
    }
  
    async updateAccountType(typeDto: UpdateAccountTypeDto): Promise<void> {
      const { newType, customerId, accountId } = typeDto;
  
      const [accounts, customers] = await Promise.all([
        this.readAccounts(),
        this.readCustomers(),
      ]);
  
      const account = accounts.find((acc) => acc.id === accountId);
      if (!account) {
        throw new NotFoundException(`Account with ID ${accountId} not found`);
      }
  
      const customer = customers.find((cust) => cust.id === customerId);
      if (!customer) {
        throw new NotFoundException(`Customer with ID ${customerId} not found`);
      }
  
      const accountBelongsToCustomer = customer.accounts.some(
        (acc) => acc.id === accountId,
      );
      if (!accountBelongsToCustomer) {
        throw new NotFoundException(
          `Account with ID ${accountId} does not belong to customer with ID ${customerId}`,
        );
      }
  
      const hasExistingAccountOfType = accounts.some(
        (acc) =>
          acc.customerId === customerId &&
          acc.type === newType &&
          acc.id !== accountId,
      );
  
      if (hasExistingAccountOfType) {
        throw new ConflictException(
          `Customer with ID ${customerId} already has a ${newType} account`,
        );
      }
  
      account.type = newType;
  
      const updatedCustomerAccounts = customer.accounts.map((acc) =>
        acc.id === accountId ? { ...acc, type: newType } : acc,
      );
  
      customer.accounts = updatedCustomerAccounts;
  
      await Promise.all([
        this.writeAccounts(accounts),
        this.writeCustomers(customers),
      ]);
    }
  
    async findById(id: number): Promise<BaseAccount> {
      const accounts = this.readAccounts();
      const account = accounts.find((account) => account.id === id);
      if (!account) {
        throw new NotFoundException(`Account with id ${id} not found`);
      }
      return account;
    }
  
    async findAll(): Promise<BaseAccount[]> {
      return this.readAccounts();
    }
  
    async removeAccount(id: number): Promise<void> {
      const accounts = this.readAccounts();
      const index = accounts.findIndex((account) => account.id === id);
  
      if (index < 0) {
        throw new NotFoundException('Account not found');
      }
      accounts.splice(index, 1);
      this.writeAccounts(accounts);
  
      const customers = this.readCustomers();
      customers.forEach((customer) => {
        customer.accounts = customer.accounts.filter(
          (account) => account.id !== id,
        );
      });
      this.writeCustomers(customers);
    }
  }
  