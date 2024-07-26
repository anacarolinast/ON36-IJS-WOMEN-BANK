import { AccountStatus, AccountType, BaseAccount } from "./base-account.entity";

export class SavingAccount extends BaseAccount {
    constructor(
        id: number,
        accountNumber: string,
        balance: number,
        openingDate: Date,
        customerId: number,
        public interestRate: number
    ) {
        super(id, accountNumber, balance, openingDate, AccountType.SAVING, AccountStatus.OPEN, customerId)
    }

    deposit(amount: number): void {
        this.balance += amount;
      }
    
      cashOut(amount: number): void {
        if (this.balance < amount) {
          throw new Error("Insufficient funds.");
        }
        this.balance -= amount;
      }
    
      payBills(amount: number): void {
        this.cashOut(amount); 
      }
    
      checkBalance(): number {
        return this.balance;
      }
    
      applyInterest(): void {
        this.balance += this.balance * this.interestRate / 100;
      }
}