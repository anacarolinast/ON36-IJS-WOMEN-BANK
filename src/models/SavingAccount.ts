import { BaseAccount } from './BaseAccount';

export class SavingAccount extends BaseAccount {
    constructor(
        id: string,
        accountNumber: string,
        openingDate: Date,
        private interestRate: number
    ) {
        super(id, accountNumber, openingDate);
    }

    public deposit(value: number): void {
        this.balance += value;
    }

    public cashOut(value: number): void {
        if (this.balance >= value) {
            this.balance -= value;
        } else {
            console.log('Saldo insuficiente.');
        }
    }

    public loan(value: number): void {
        console.log('Empréstimos não disponíveis para contas poupança.');
    }

    public payBills(value: number): void {
        if (this.balance >= value) {
            this.balance -= value;
        } else {
            console.log('Saldo insuficiente.');
        }
    }

    public checkBalance(): number {
        return this.balance;
    }

    public getInterestRate(): number {
        return this.interestRate;
    }

    public setInterestRate(value: number): void {
        this.interestRate = value;
    }

    public applyInterest(): void {
        this.balance += this.balance * (this.interestRate / 100);
    }
}
