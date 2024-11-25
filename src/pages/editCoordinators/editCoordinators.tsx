import { useEffect, useState } from 'react';
import { links } from '../../api/api';
import { CoordinatorsForm } from '../../components/coordinatorsForm/coordinatorsForm';
import { CoordinatorType } from '../../type/CoordinatorsType';
import { useParams } from 'react-router-dom';
import { errorSwal } from '../../components/swal/errorSwal';
import Loading from '../../components/loading/loading';
import ErrorComponent from '../../components/error/error';

export function EditCoordinatorPage() {
    const { id } = useParams();
    const [coordinator, setCoordinator] = useState<CoordinatorType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getCoordinator = async () => {
            try {
                if (id) {
                    const response = await links.getCoordinator(id);
                    setCoordinator(response.data.model);
                }
            } catch (error) {
                errorSwal('Erro ao buscar coordenador');
            } finally {
                setLoading(false); // Marcar como carregado
            }
        };
        getCoordinator();
    }, [id]);

    const handleEditCoordinator = async (data: CoordinatorType) => {
        const response = await links.updateCoordinators(data);
        return { status: response.status };
    };
    

    if (loading) {
        return <Loading />;
    }

    if (!coordinator) {
        return <ErrorComponent error='Erro ao buscar um coordenador.' />
    }

    return <CoordinatorsForm mode="edit" initialData={coordinator} onSubmit={handleEditCoordinator} />;
}
