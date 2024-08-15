import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ManagersService } from 'src/managers/application/managers.service';
import { Manager } from 'src/managers/domain/manager.entity';

@Controller('managers')
export class ManagersController {
  constructor(private readonly managersService: ManagersService) {}

  @Post()
  async createManager(
    @Body() body: {
      fullName: string;
      cpf: string;
      birthOfDate: string;
      email: string;
      phoneNumber: string;
      address: string;
    },
  ): Promise<Manager> {
    const { fullName, cpf, birthOfDate, email, phoneNumber, address } = body;
    
    try {
      return await this.managersService.createManager(
        fullName,
        cpf,
        new Date(birthOfDate),
        email,
        phoneNumber,
        address,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll(): Promise<Manager[]> {
    return await this.managersService.findAll();
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<Manager> {
    try {
      return await this.managersService.findById(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Delete(':id')
  async removeManager(@Param('id', ParseIntPipe) id: number): Promise<void> {
    try {
      await this.managersService.removeManager(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
