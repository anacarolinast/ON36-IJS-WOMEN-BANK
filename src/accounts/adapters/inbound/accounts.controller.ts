import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AccountsService } from 'src/accounts/application/accounts.service';
import { Account } from 'src/accounts/domain/account.interface';
import { AccountType } from 'src/accounts/domain/account-type.enum';
import { AccountStatus } from 'src/accounts/domain/account-status.enum';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  async createAccount(
    @Body('balance') balance: number,
    @Body('type') type: AccountType,
    @Body('customerId') customerId: number,
  ): Promise<Account> {
    return this.accountsService.createAccount(balance, type, customerId);
  }

  @Get()
  async findAll(): Promise<Account[]> {
    return this.accountsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<Account> {
    return this.accountsService.findById(id);
  }

  @Get(':id/balance')
  async checkBalance(@Param('id', ParseIntPipe) id: number): Promise<number> {
    return this.accountsService.checkBalance(id);
  }

  @Patch(':id/deposit')
  @HttpCode(HttpStatus.OK)
  async deposit(
    @Param('id', ParseIntPipe) id: number,
    @Body('amount') amount: number,
  ): Promise<Account> {
    return this.accountsService.deposit(id, amount);
  }

  @Patch(':id/cashout')
  @HttpCode(HttpStatus.OK)
  async cashOut(
    @Param('id', ParseIntPipe) id: number,
    @Body('amount') amount: number,
  ): Promise<Account> {
    return this.accountsService.cashOut(id, amount);
  }

  @Patch(':id/pay-bills')
  @HttpCode(HttpStatus.OK)
  async payBills(
    @Param('id', ParseIntPipe) id: number,
    @Body('amount') amount: number,
  ): Promise<Account> {
    return this.accountsService.payBills(id, amount);
  }

  @Patch(':id/status')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: AccountStatus,
  ): Promise<void> {
    return this.accountsService.updateStatusAccount(id, status);
  }

  @Patch(':id/type')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateType(
    @Param('id', ParseIntPipe) id: number,
    @Body('type') type: AccountType,
  ): Promise<void> {
    return this.accountsService.updateTypeAccount(id, type);
  }
}
