import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Patch,
    ParseIntPipe,
    ConflictException,
    NotFoundException,
  } from '@nestjs/common';
  import { AccountsService } from './accounts.service';
  import { CreateCurrentAccountDto } from './dto/create-current-account-dto'; 
  import { CreateSavingAccountDto } from './dto/create-saving-account.dto';
  import { UpdateAccountTypeDto } from './dto/update-type-account-dto'; 
  import { CurrentAccount } from './entities/current-account.entity';
  import { SavingAccount } from './entities/saving-account.entity';
  import { BaseAccount } from './entities/base-account.entity';
  import { UpdateAccountStatusDto } from './dto/update-status-account-dto'; 
  
  @Controller('accounts')
  export class AccountsController {
    constructor(private readonly accountsService: AccountsService) {}
  
    @Post('/current')
    async createCurrentAccount(
      @Body() createCurrentAccountDto: CreateCurrentAccountDto,
    ): Promise<CurrentAccount> {
      try {
        return await this.accountsService.createCurrentAccount(
          createCurrentAccountDto,
        );
      } catch (error) {
        if (error instanceof ConflictException) {
          throw new ConflictException(error.message);
        }
        throw error;
      }
    }
  
    @Post('/saving')
    async createSavingAccount(
      @Body() createSavingAccountDto: CreateSavingAccountDto,
    ): Promise<SavingAccount> {
      try {
        return await this.accountsService.createSavingAccount(
          createSavingAccountDto,
        );
      } catch (error) {
        if (error instanceof ConflictException) {
          throw new ConflictException(error.message);
        }
        throw error;
      }
    }
  
    @Get()
    async findAll(): Promise<BaseAccount[]> {
      return await this.accountsService.findAll();
    }
  
    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number): Promise<BaseAccount> {
      try {
        return await this.accountsService.findById(id);
      } catch (error) {
        if (error instanceof NotFoundException) {
          throw new NotFoundException(error.message);
        }
        throw error;
      }
    }
  
    @Delete(':id')
    async removeAccount(@Param('id', ParseIntPipe) id: number): Promise<void> {
      try {
        return this.accountsService.removeAccount(id);
      } catch (error) {
        if (error instanceof NotFoundException) {
          throw new NotFoundException(error.message);
        }
        throw error;
      }
    }
  
    @Get(':id/balance')
    async checkBalance(@Param('id', ParseIntPipe) id: number): Promise<number> {
      return this.accountsService.checkBalance(id);
    }
  
    @Patch(':id/deposit')
    async deposit(
      @Param('id', ParseIntPipe) id: number,
      @Body('amount') amount: number,
    ): Promise<BaseAccount> {
      return this.accountsService.deposit(id, amount);
    }
  
    @Patch(':id/cashout')
    async cashOut(
      @Param('id', ParseIntPipe) id: number,
      @Body('amount') amount: number,
    ): Promise<BaseAccount> {
      return this.accountsService.cashOut(id, amount);
    }
  
    @Patch(':id/pay-bills')
    async payBills(
      @Param('id', ParseIntPipe) id: number,
      @Body('amount') amount: number,
    ): Promise<BaseAccount> {
      return this.accountsService.payBills(id, amount);
    }
  
    @Patch(':customerId/accounts/:accountId/type')
    async updateAccountType(
      @Param('customerId', ParseIntPipe) customerId: number,
      @Param('accountId', ParseIntPipe) accountId: number,
      @Body() updateAccountTypeDto: UpdateAccountTypeDto,
    ): Promise<void> {
      const dto: UpdateAccountTypeDto = {
        newType: updateAccountTypeDto.newType,
        customerId: customerId,
        accountId: accountId,
      };
      return this.accountsService.updateAccountType(dto);
    }
  
    @Patch(':customerId/accounts/:accountId/status')
    async updateAccountStatus(
      @Param('customerId', ParseIntPipe) customerId: number,
      @Param('accountId', ParseIntPipe) accountId: number,
      @Body() updateAccountStatusDto: UpdateAccountStatusDto,
    ): Promise<void> {
      const dto: UpdateAccountStatusDto = {
        newStatus: updateAccountStatusDto.newStatus,
        customerId: customerId,
        accountId: accountId,
      };
      return this.accountsService.updateAccountStatus(dto);
    }
  }
  