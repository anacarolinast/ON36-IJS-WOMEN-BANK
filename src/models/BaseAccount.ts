import { Account } from '../interfaces/Account';

export abstract class BaseAccount implements Account {
    protected balance: number = 0;

    constructor(
        private readonly id: string,
        private readonly accountNumber: string,
        private readonly openingDate: Date
    ) {}

    public abstract deposit(valor: number): void;
    public abstract cashOut(valor: number): void;
    public abstract loan(valor: number): void;
    public abstract payBills(valor: number): void;
    public abstract checkBalance(): number;

    public getId(): string {
        return this.id;
    }

    public getAccountNumber(): string {
        return this.accountNumber;
    }

    public getOpeningDate(): Date {
        return this.openingDate;
    }
}
