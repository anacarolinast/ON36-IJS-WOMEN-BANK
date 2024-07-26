import {
    AccountStatus,
    BaseAccount,
  } from 'src/accounts/entities/base-account.entity';
  import { AccountsService } from 'src/accounts/accounts.service';
  import { AccountType } from 'src/accounts/entities/base-account.entity';
  import { CreateCurrentAccountDto } from 'src/accounts/dto/create-current-account-dto';
  import { CreateSavingAccountDto } from 'src/accounts/dto/create-saving-account.dto';
  import { UpdateAccountTypeDto } from 'src/accounts/dto/update-type-account-dto';  
  import { UpdateAccountStatusDto } from 'src/accounts/dto/update-status-account-dto'; 
  
  export class Customer {
    constructor(
      private readonly accountsService: AccountsService,
      public id: number,
      public fullName: string,
      public cpf: string,
      public address: string,
      public phoneNumber: string,
      public accounts: BaseAccount[] = [],
    ) {}
  
    async openCurrentAccount(dto: CreateCurrentAccountDto): Promise<BaseAccount> {
      return this.accountsService.createCurrentAccount(dto);
    }
  
    async openSavingAccount(dto: CreateSavingAccountDto): Promise<BaseAccount> {
      return this.accountsService.createSavingAccount(dto);
    }
  
    async closeAccount(
      accountId: number,
      newStatus: AccountStatus,
    ): Promise<void> {
      const closeAccountDto: UpdateAccountStatusDto = {
        customerId: this.id,
        accountId: accountId,
        newStatus: newStatus,
      };
      await this.accountsService.updateAccountStatus(closeAccountDto);
    }
  
    async updateAccountType(
      accountId: number,
      newType: AccountType,
    ): Promise<void> {
      const updateAccountTypeDto: UpdateAccountTypeDto = {
        customerId: this.id,
        accountId: accountId,
        newType: newType,
      };
      await this.accountsService.updateAccountType(updateAccountTypeDto);
    }
  }
  