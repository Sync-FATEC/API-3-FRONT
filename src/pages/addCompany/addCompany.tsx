import { links } from '../../api/api';
import { CompanyForm } from '../../components/companyForm/companyForm';
import { createCompany } from '../../type/createCompany';

export function AddCompany() {
    const handleCreateCompany = async (data: createCompany) => {
        await links.createCompany(data);
        return { status: 200 };
    };

    return <CompanyForm mode="create" onSubmit={handleCreateCompany} />;
}
