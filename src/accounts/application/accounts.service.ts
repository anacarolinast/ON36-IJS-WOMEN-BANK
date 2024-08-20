import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AccountFactory } from '../domain/account.factory';
import { AccountType } from '../domain/account-type.enum';
import { AccountStatus } from '../domain/account-status.enum';
import { CustomersService } from 'src/customers/application/customers.service';
import { AccountsRepository } from '../adapters/outbound/accounts.repository';
import { BalanceUpdatedEvent } from '../domain/balance-updated.event';
import { Account } from '../domain/account.interface'; 

@Injectable()
export class AccountsService {
  private idCounter: number;

  constructor(
    private readonly accountRepository: AccountsRepository,
    private readonly accountFactory: AccountFactory,
    private readonly customersService: CustomersService,
    private readonly eventEmitter: EventEmitter2,
  ) {
    this.idCounter = this.accountRepository.getNextId();
  }

  private generateAccountNumber(): string {
    return Math.random().toString().slice(2, 14).padStart(12, '0');
  }

  async createAccount(
    balance: number,
    type: AccountType,
    customerId: number,
    overdraftLimit?: number,
    interestRate?: number,
  ): Promise<Account> {
    const customer = await this.customersService.findById(customerId);
    const accountNumber = this.generateAccountNumber();
    const openingDate = new Date();
    const status = AccountStatus.Open;

    const existingAccount = await this.accountRepository.findAll();
    if (existingAccount.some(account => account.accountNumber === accountNumber)) {
      throw new ConflictException('Account with the generated number already exists');
    }

    if (existingAccount.some(account => account.customerId === customerId && account.type === type)) {
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

    await this.accountRepository.save(newAccount);

    customer.accounts.push(newAccount);
    await this.customersService.updateCustomer(customer);

    return newAccount;
  }

  async updateStatusAccount(accountId: number, newStatus: AccountStatus): Promise<void> {
    const account = await this.accountRepository.findById(accountId);
    if (!account) {
      throw new NotFoundException(`Account with ID ${accountId} not found`);
    }
    account.status = newStatus;
    await this.accountRepository.save(account);
  }

  async updateTypeAccount(accountId: number, newType: AccountType): Promise<void> {
    const account = await this.accountRepository.findById(accountId);
    if (!account) {
      throw new NotFoundException(`Account with ID ${accountId} not found`);
    }
    account.type = newType;
    await this.accountRepository.save(account);
  }

  async findById(id: number): Promise<Account> {
    const account = await this.accountRepository.findById(id);
    if (!account) {
      throw new NotFoundException(`Account with id ${id} not found`);
    }
    return account;
  }

  async findAll(): Promise<Account[]> {
    return this.accountRepository.findAll();
  }

  async checkBalance(id: number): Promise<number> {
    const account = await this.findById(id);
    return account.balance;
  }

  async deposit(id: number, amount: number): Promise<Account> {
    const account = await this.findById(id);
    account.balance += amount;
    await this.accountRepository.save(account);

    this.eventEmitter.emit(
      'balance.updated',
      new BalanceUpdatedEvent(account.id, account.balance),
    );

    return account;
  }

  async cashOut(id: number, amount: number): Promise<Account> {
    const account = await this.findById(id);
    account.balance -= amount;
    await this.accountRepository.save(account);

    this.eventEmitter.emit(
      'balance.updated',
      new BalanceUpdatedEvent(account.id, account.balance),
    );

    return account;
  }

  async payBills(id: number, amount: number): Promise<Account> {
    return this.cashOut(id, amount);
  }
}
