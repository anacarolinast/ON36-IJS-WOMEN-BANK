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
  import { CreateCustomerDto } from './dto/customer.dto';
  import { Customer } from './entity/customer.entity';
  
  @Controller('customers')
  export class CustomersController {
      constructor(private readonly customersService: CustomersService) {}
      
      @Post()
      createCustomer(@Body() createCustomerDto: CreateCustomerDto): Customer {
          return this.customersService.createCustomer(createCustomerDto);
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
  