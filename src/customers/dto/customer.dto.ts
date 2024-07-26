export class CreateCustomerDto {
    readonly id: number;
    readonly fullName: string;
    readonly cpf: string;
    readonly address: string;
    readonly phoneNumber: string;

    constructor(id: number, fullName: string, cpf: string, address: string, phoneNumber: string) {
        this.id = id;
        this.fullName = fullName;
        this.cpf = cpf;
        this.address = address;
        this.phoneNumber = phoneNumber;
    }
}