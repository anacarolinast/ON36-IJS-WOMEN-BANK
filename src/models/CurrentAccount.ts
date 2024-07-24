import { BaseAccount } from './BaseAccount';

export class CurrentAccount extends BaseAccount {
    constructor(
        id: string,
        accountNumber: string,
        openingDate: Date,
        private overdraftLimit: number
    ) {
        super(id, accountNumber, openingDate);
    }

    public deposit(value: number): void {
        this.balance += value;
    }

    public cashOut(value: number): void {
        if (this.balance + this.overdraftLimit >= value) {
            this.balance -= value;
        } else {
            console.log('Saldo insuficiente, incluindo o limite do cheque especial.');
        }
    }

    public loan(value: number): void {
        this.balance += value;
    }

    public payBills(value: number): void {
        if (this.balance + this.overdraftLimit >= value) {
            this.balance -= value;
        } else {
            console.log('Saldo insuficiente, incluindo o limite do cheque especial.');
        }
    }

    public checkBalance(): number {
        return this.balance;
    }

    public getOverdraftLimit(): number {
        return this.overdraftLimit;
    }

    public setOverdraftLimit(newLimit: number): void {
        this.overdraftLimit = newLimit;
    }
}
