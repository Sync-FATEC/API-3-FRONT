export type CompanyType = {
    id: string;
    corporateName: string;
    cnpj: string;
    phone: string;
    privateCompany: boolean;
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
