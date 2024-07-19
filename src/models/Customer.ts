import { BaseAccount } from './BaseAccount';
import { CurrentAccount } from './CurrentAccount';
import { SavingAccount } from './SavingAccount';

export class Customer {
    private accounts: { [accountType: string]: BaseAccount } = {};

    public constructor(
        private ID: string,
        private fullName: string,
        private address: string,
        private phoneNumber: string
    ) {}

    public getID(): string {
        return this.ID;
    }

    public getName(): string {
        return this.fullName;
    }

    public getAddress(): string {
        return this.address;
    }

    public getPhoneNumber(): string {
        return this.phoneNumber;
    }

    public setAddress(newAddress: string): void {
        this.address = newAddress;
    }

    public setPhoneNumber(newPhoneNumber: string): void {
        this.phoneNumber = newPhoneNumber;
    }

    public createCurrentAccount(
        id: string,
        accountNumber: string,
        openingDate: Date,
        overdraftLimit: number
    ): void {
        this.accounts['current'] = new CurrentAccount(id, accountNumber, openingDate, overdraftLimit);
    }

    public createSavingAccount(
        id: string,
        accountNumber: string,
        openingDate: Date,
        interestRate: number
    ): void {
        this.accounts['saving'] = new SavingAccount(id, accountNumber, openingDate, interestRate);
    }

    public getCurrentAccount(): CurrentAccount | undefined {
        return this.accounts['current'] as CurrentAccount | undefined;
    }

    public getSavingAccount(): SavingAccount | undefined {
        return this.accounts['saving'] as SavingAccount | undefined;
    }
}
