import { Customer } from "src/customers/entity/customer.entity";

export class CreateManagerDto {
    constructor(
        public id: number,
        public fullName: string,
        public cpf: string,
        public customers: Customer[] = []
    ) {}
}