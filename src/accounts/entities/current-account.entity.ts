import { AccountStatus, AccountType, BaseAccount } from "./base-account.entity";

export class CurrentAccount extends BaseAccount {
    constructor(
        id: number,
        accountNumber: string,
        balance: number = 0,
        openingDate: Date,
        customerId: number,
        public overdraftLimit: number
    ) {
        super(id, accountNumber, balance, openingDate, AccountType.CURRENT, AccountStatus.OPEN, customerId)
    }

    deposit(amount: number): void {
        this.balance += amount;
      }
    
      cashOut(amount: number): void {
        if (this.balance + this.overdraftLimit < amount) {
          throw new Error("Insufficient funds including overdraft.");
        }
        this.balance -= amount;
      }
    
      payBills(amount: number): void {
        this.cashOut(amount);
      }
    
      checkBalance(): number {
        return this.balance;
      }
}