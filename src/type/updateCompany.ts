export type UpdateCompanyDTO = {
    id: string;
    corporateName: string;
    cnpj: string;
    phone: string;
    privateCompany: boolean;
    addressId: string;
    addressStreet: string;
    addressNumber: string;
    addressNeighborhood: string;
    addressCity: string;
    addressState: string;
    addressZipCode: string;
};