import { Account } from 'src/accounts/domain/account.interface'; 
import * as path from 'path';
import * as fs from 'fs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountsRepository {
  private readonly filePath = path.resolve('./src/accounts/adapters/outbound/mock/mock-accounts.json');

  private readAccounts(): Account[] {
    if (!fs.existsSync(this.filePath)) {
      return [];
    }
    const data = fs.readFileSync(this.filePath, 'utf8');
    return JSON.parse(data) as Account[];
  }

  private writeAccounts(accounts: Account[]): void {
    fs.writeFileSync(this.filePath, JSON.stringify(accounts, null, 2), 'utf8');
  }

  public getNextId(): number {
    const accounts = this.readAccounts();
    return accounts.length > 0 ? Math.max(...accounts.map(acc => acc.id)) + 1 : 1;
  }

  public async findById(id: number): Promise<Account | null> {
    const accounts = this.readAccounts();
    return accounts.find(account => account.id === id) || null;
  }

  public async save(account: Account): Promise<void> {
    const accounts = this.readAccounts();
    const index = accounts.findIndex(acc => acc.id === account.id);

    if (index > -1) {
      accounts[index] = account;
    } else {
      accounts.push(account); 
    }

    this.writeAccounts(accounts);
  }

  public async findAll(): Promise<Account[]> {
    return this.readAccounts();
  }
}
