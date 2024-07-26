export interface Account {
    deposit(valor: number): void;
    cashOut(valor: number): void;
    payBills(valor: number): void;
    checkBalance(): number;
}