export class CreateAccountDto {
    readonly id: number;
    readonly accountNumber: string;
    readonly balance: number;
    readonly openingDate: Date;
    readonly customerId: number;

    constructor(id: number, accountNumber: string, balance: number, openingDate: string, customerId: number) {
        this.id = id;
        this.accountNumber = accountNumber;
        this.balance = balance;
        this.openingDate = this.textoParaData(openingDate);
        this.customerId = customerId;
    }

    textoParaData(texto: string): Date {
        const match = texto.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
        if (!match) {
            throw new Error('Deve estar no formato dd/MM/yyyy');
        }
        const [day, month, year] = match.slice(1, 4).map(v => parseInt(v, 10));
        return new Date(year, month - 1, day);
    }
}