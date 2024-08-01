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
    import { ManagersService } from './managers.service';
    import { CreateManagerDto } from './dto/manager.dto';
    import { Manager } from './entity/manager.entity';
import { Customer } from 'src/customers/entity/customer.entity';

@Controller('managers')
export class ManagersController {
    constructor(private readonly managersService: ManagersService) {}

    @Post()
    createManager(@Body() createManagerDto: CreateManagerDto): Manager {
        return this.managersService.createManager(createManagerDto);
    }

    @Get()
    findAll(): Manager[] {
        return this.managersService.findAll();
    }

    @Get(':id')
    findById(@Param('id', ParseIntPipe) id: number): Manager {
        return this.managersService.findById(id);
    }

    @Delete(':id')
    removeManager(@Param('id', ParseIntPipe) id: number): void {
        return this.managersService.removeManager(id);
    }

    @Post(':managerId/customers/:customerId')
    associateCustomerToManager(
    @Param('managerId', ParseIntPipe) managerId: number,
    @Param('customerId', ParseIntPipe) customerId: number
  ): void {
    return this.managersService.associateCustomerToManager(managerId, customerId);
  }

  @Delete(':managerId/customers/:customerId')
  dissociateCustomerFromManager(
    @Param('managerId', ParseIntPipe) managerId: number,
    @Param('customerId', ParseIntPipe) customerId: number
  ): void {
    return this.managersService.dissociateCustomerFromManager(managerId, customerId);
  }
}
