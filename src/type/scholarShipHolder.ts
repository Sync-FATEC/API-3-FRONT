
export type RegisterScholarshipHolder = {
    id?: string;
    cpf: string;
    rg: string;
    name: string;
    email: string;
    nationality: string;
    grantId: string;
    address: {
        id?: string;
        street: string;
        number: string;
        neighborhood: string;
        city: string;
        state: string;
        zipCode: string;
    };
}

export type ListScholarshipHolder = {
    id: string;
    cpf: string;
    rg: string;
    name: string;
    email: string;
    nationality: string;
}

export type UpdateScholarShipHolder = {
    id: string;
    cpf: string;
    rg: string;
    name: string;
    email: string;
    nationality: string;
    address: {
        id: string;
        street: string;
        number: string;
        neighborhood: string;
        city: string;
        state: string;
        zipCode: string;
    };
}