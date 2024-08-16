import { Address } from "./address.interface";

export interface Person {
    id: number;
    fullName: string;
    cpf: string;
    birthOfDate: Date;
    email: string;
    phoneNumber: string;
    address: Address;
}