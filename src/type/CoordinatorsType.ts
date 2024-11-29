export type CoordinatorType = {
    coordinatorId: string;
    coordinatorName: string;
    coordinatorCPF: string;
    coordinatorTelefone: string;
    coordinatorEconomicActivity: string;
    coordinatorRG: string;
    coordinatorNacionality: string;
    coordinatorMaritalStatus: string;
    address: {
        id: string;
        street: string;
        number: string;
        neighborhood: string;
        city: string;
        state: string;
        zipCode: string;
    };
};