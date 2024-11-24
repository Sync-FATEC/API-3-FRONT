import { useEffect, useState } from 'react';
import { links } from '../../api/api';
import { useParams } from 'react-router-dom';
import { errorSwal } from '../../components/swal/errorSwal';
import Loading from '../../components/loading/loading';
import ErrorComponent from '../../components/error/error';
import { CompanyType } from '../../type/CompanyType';
import { CompanyForm } from '../../components/companyForm/companyForm';
import { UpdateCompanyDTO } from '../../type/updateCompany';

export function EditCompanyPage() {
    const { id } = useParams();
    const [Company, setCompany] = useState<CompanyType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getCompany = async () => {
            try {
                if (id) {
                    const response = await links.getCompany(id);
                    setCompany(response.data.model);
                }
            } catch (error) {
                errorSwal('Erro ao buscar empresa');
            } finally {
                setLoading(false);
            }
        };
        getCompany();
    }, [id]);

    const handleEditCompany = async (data: UpdateCompanyDTO) => {
        const response = await links.updateCompany(data);
        return { status: response.status };
    };
    

    if (loading) {
        return <Loading />;
    }

    if (!Company) {
        return <ErrorComponent error='Erro ao buscar um coordenador.' />
    }

    return <CompanyForm mode="edit" initialData={Company} onSubmit={handleEditCompany} />;
}
