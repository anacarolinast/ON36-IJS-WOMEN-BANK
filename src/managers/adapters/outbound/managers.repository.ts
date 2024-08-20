import { Injectable, NotFoundException } from '@nestjs/common';
import { Manager } from 'src/managers/domain/manager.entity'; 
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ManagersRepository {
  private readonly filePath = path.resolve('./src/managers/adapters/outbound/mock/mock-managers.json');
  private idCounter: number;

  constructor() {
    const managers = this.readManagers();
    this.idCounter = managers.length > 0 ? managers[managers.length - 1].id + 1 : 1;
    console.log(`Initialized ID Counter: ${this.idCounter}`);
  }

  private readManagers(): Manager[] {
    try {
      if (!fs.existsSync(this.filePath)) {
        console.log('File does not exist, returning empty array.');
        return [];
      }
      const data = fs.readFileSync(this.filePath, 'utf8');
      return JSON.parse(data) as Manager[];
    } catch (error) {
      console.error(`Error reading managers: ${error.message}`);
      return [];
    }
  }

  private writeManagers(managers: Manager[]): void {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(managers, null, 2), 'utf8');
      console.log('Managers written to file:', managers);
    } catch (error) {
      console.error(`Error writing managers: ${error.message}`);
    }
  }

  public getNextId(): number {
    const managers = this.readManagers();
    return managers.length > 0 ? Math.max(...managers.map(manager => manager.id)) + 1 : 1;
  }

  public async findById(id: number): Promise<Manager> {
    const managers = this.readManagers();
    const manager = managers.find(m => m.id === id);
    if (!manager) {
      throw new NotFoundException(`Manager with id ${id} not found`);
    }
    return manager;
  }

  public async save(manager: Manager): Promise<void> {
    const managers = this.readManagers();
    const index = managers.findIndex(m => m.id === manager.id);

    if (index > -1) {
      managers[index] = manager;
    } else {
      managers.push(manager);
    }

    this.writeManagers(managers);
  }

  public async findAll(): Promise<Manager[]> {
    return this.readManagers();
  }

  public async remove(id: number): Promise<void> {
    let managers = this.readManagers();
    const managerIndex = managers.findIndex(m => m.id === id);

    if (managerIndex === -1) {
      throw new NotFoundException(`Manager with id ${id} not found`);
    }

    managers = managers.filter(m => m.id !== id);
    this.writeManagers(managers);
  }
}
