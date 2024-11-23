import { links } from '../../api/api';
import { CoordinatorsForm } from '../../components/coordinatorsForm/coordinatorsForm';
import { createCoordinators } from '../../type/createCoordinators';

export function AddCoordinators() {
    const handleCreateCoordinator = async (data: createCoordinators) => {
        await links.createCoordinators(data);
        return { status: 200 };
    };

    return <CoordinatorsForm mode="create" onSubmit={handleCreateCoordinator} />;
}
