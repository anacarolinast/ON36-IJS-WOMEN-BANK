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
    import { Manager } from './entity/manager.entity';

@Controller('managers')
export class ManagersController {
    constructor(private readonly managersService: ManagersService) {}

    @Post()
    createManager(
      @Body('fullName') fullName: string,
      @Body('cpf') cpf: string,
      @Body('birthOfDate') birthOfDate: Date,
      @Body('email') email: string,
      @Body('phoneNumber') phoneNumber: string,
      @Body('address') address: string,
    ): Manager {
      return this.managersService.createManager(
        fullName,
        cpf,
        birthOfDate,
        email,
        phoneNumber,
        address,
      );
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
}
