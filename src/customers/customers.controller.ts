import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Patch,
    Delete,
    ParseIntPipe,
  } from '@nestjs/common';
  import { CustomersService } from './customers.service';
  import { Customer } from './entity/customer.entity';
  
  @Controller('customers')
  export class CustomersController {
      constructor(private readonly customersService: CustomersService) {}

      @Post(':managerId')
    createCustomer(
        @Param('managerId', ParseIntPipe) managerId: number,
        @Body() createCustomerDto: {
            fullName: string;
            cpf: string;
            birthOfDate: Date;
            email: string;
            phoneNumber: string;
            address: string;
        }
    ): Customer {
        const { fullName, cpf, birthOfDate, email, phoneNumber, address } = createCustomerDto;
        return this.customersService.createCustomer(
            fullName,
            cpf,
            birthOfDate,
            email,
            phoneNumber,
            address,
            managerId
        );
    }
      
      @Get()
      findAll(): Customer[] {
          return this.customersService.findAll();
      }
      
      @Get(':id')
      findById(@Param('id', ParseIntPipe) id: number): Customer {
          return this.customersService.findById(id);
      }
      
      @Delete(':id')
      removeCustomer(@Param('id', ParseIntPipe) id: number): void {
          return this.customersService.removeCustomer(id);
      }
  }
  