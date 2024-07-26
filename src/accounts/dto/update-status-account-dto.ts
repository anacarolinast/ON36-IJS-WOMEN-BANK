import { AccountStatus } from "../entities/base-account.entity"; 

export class UpdateAccountStatusDto {
    readonly newStatus: AccountStatus;
    readonly customerId: number;
    readonly accountId: number;

    constructor(newStatus: AccountStatus, customerId: number, accountId: number){
        this.newStatus = newStatus;
        this.customerId = customerId;
        this.accountId = accountId;
    }
  }
