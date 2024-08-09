import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { Account } from './interfaces/account.interface';
import { AccountType } from './enums/account-type.enum';
import { AccountStatus } from './enums/account-status.enum'; 

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  createAccount(
    @Body('balance') balance: number,
    @Body('type') type: AccountType,
    @Body('customerId') customerId: number,
  ): Account {
    return this.accountsService.createAccount(balance, type, customerId);
  }

  @Get()
  findAll(): Account[] {
    return this.accountsService.findAll();
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number): Account {
    return this.accountsService.findById(id);
  }

  @Get(':id/balance')
  checkBalance(@Param('id', ParseIntPipe) id: number): number {
    return this.accountsService.checkBalance(id);
  }

  @Patch(':id/deposit')
  deposit(
    @Param('id', ParseIntPipe) id: number,
    @Body('amount') amount: number,
  ): Account {
    return this.accountsService.deposit(id, amount);
  }

  @Patch(':id/cashout')
  cashOut(
    @Param('id', ParseIntPipe) id: number,
    @Body('amount') amount: number,
  ): Account {
    return this.accountsService.cashOut(id, amount);
  }

  @Patch(':id/pay-bills')
  payBills(
    @Param('id', ParseIntPipe) id: number,
    @Body('amount') amount: number,
  ): Account {
    return this.accountsService.payBills(id, amount);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: AccountStatus,
  ): void {
    this.accountsService.updateStatusAccount(id, status);
  }

  @Patch(':id/type')
  updateType(
    @Param('id', ParseIntPipe) id: number,
    @Body('type') type: AccountType,
  ): void {
    this.accountsService.updateTypeAccount(id, type);
  }
}
