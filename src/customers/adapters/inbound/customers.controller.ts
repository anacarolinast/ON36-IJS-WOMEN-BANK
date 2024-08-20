import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CustomersService } from 'src/customers/application/customers.service'; 
import { Customer } from 'src/customers/domain/customer.entity';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post(':managerId')
  @HttpCode(HttpStatus.CREATED)
  async createCustomer(
    @Param('managerId', ParseIntPipe) managerId: number,
    @Body()
    createCustomerDto: {
      fullName: string;
      cpf: string;
      birthOfDate: string;
      email: string;
      phoneNumber: string;
      cep: string;
    },
  ): Promise<Customer> {
    const { fullName, cpf, birthOfDate, email, phoneNumber, cep } = createCustomerDto;

    return this.customersService.createCustomer(
      fullName,
      cpf,
      new Date(birthOfDate),
      email,
      phoneNumber,
      cep,
      managerId,
    );
  }

  @Get()
  async findAll(): Promise<Customer[]> {
    return this.customersService.findAll();
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<Customer> {
    return this.customersService.findById(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeCustomer(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.customersService.removeCustomer(id);
  }
}
