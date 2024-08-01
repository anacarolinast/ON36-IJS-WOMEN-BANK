import { AccountType } from "../entities/base-account.entity"; 

export class UpdateAccountTypeDto {
    readonly newType: AccountType;
    readonly customerId: number;
    readonly accountId: number;

    constructor(newType: AccountType, customerId: number, accountId: number) {
        this.newType = newType;
        this.customerId = customerId;
        this.accountId = accountId;
      }
}
