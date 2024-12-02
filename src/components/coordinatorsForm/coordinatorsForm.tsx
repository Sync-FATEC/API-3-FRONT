import React, { useState, useEffect } from 'react';
import Sidebar from "../../components/sideBar/sideBar";
import { createCoordinators } from '../../type/createCoordinators';
import { successSwal } from '../../components/swal/sucessSwal';
import { errorSwal } from '../../components/swal/errorSwal';
import { formatCPF, formatPhone, formatRG, validateCPF } from '../../utils/utils';
import { CoordinatorType } from '../../type/CoordinatorsType';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { UpdateCoordinators } from '../../type/updateCoodinators';
import AddressFields from '../endereco/AddressFields';

type CoordinatorsFormProps = {
    initialData?: CoordinatorType;
    onSubmit: (data: UpdateCoordinators) => Promise<{ status: number }>;
    mode: 'create' | 'edit';
};

export function CoordinatorsForm({ initialData, onSubmit, mode }: CoordinatorsFormProps) {
    const [coordinatorId] = useState(initialData?.coordinatorId || '');
    const [coordinatorName, setCoordinatorName] = useState(initialData?.coordinatorName || '');
    const [coordinatorCPF, setCoordinatorCPF] = useState(initialData?.coordinatorCPF || '');
    const [coordinatorTelefone, setCoordinatorTelefone] = useState(initialData?.coordinatorTelefone || '');
    const [coordinatorEconomicActivity, setCoordinatorEconomicActivity] = useState(initialData?.coordinatorEconomicActivity || '');
    const [coordinatorRG, setCoordinatorRG] = useState(initialData?.coordinatorRG || '');
    const [coordinatorMaritalStatus, setCoordinatorMaritalStatus] = useState(initialData?.coordinatorMaritalStatus || '');
    const [coordinatorNacionality, setCoordinatorNacionality] = useState(initialData?.coordinatorNacionality || '');
    const [addressId] = useState(initialData?.address?.id || '');
    const [addressStreet, setAddressStreet] = useState(initialData?.address?.street || '');
    const [addressNumber, setAddressNumber] = useState(initialData?.address?.number || '');
    const [addressNeighborhood, setAddressNeighborhood] = useState(initialData?.address?.neighborhood || '');
    const [addressCity, setAddressCity] = useState(initialData?.address?.city || '');
    const [addressState, setAddressState] = useState(initialData?.address?.state || '');
    const [addressZipCode, setAddressZipCode] = useState(initialData?.address?.zipCode || '');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const unformattedCPF = coordinatorCPF.replace(/[^\d]/g, '');
        const unformattedPhone = coordinatorTelefone.replace(/[^\d]/g, '');

        const coordinator: UpdateCoordinators = {
            coordinatorId,
            coordinatorName,
            coordinatorCPF: unformattedCPF,
            coordinatorTelefone: unformattedPhone,
            coordinatorEconomicActivity,
            coordinatorRG,
            coordinatorMaritalStatus,
            coordinatorNacionality,
            addressId,
            addressStreet,
            addressNumber,
            addressNeighborhood,
            addressCity,
            addressState,
            addressZipCode,
        };

        if (!validateCPF(unformattedCPF) && unformattedCPF.length > 0) {
            errorSwal('CPF inválido!');
            return;
        }

        try {
            const response = await onSubmit(coordinator);
            if (response?.status === 200 || response?.status === 201) {
                successSwal(`Coordenador ${mode === 'create' ? 'cadastrado' : 'editado'} com sucesso!`);
                if (mode === 'create') {
                    setCoordinatorName('');
                    setCoordinatorCPF('');
                    setCoordinatorTelefone('');
                    setCoordinatorEconomicActivity('');
                }
                navigate(-1);
            } else {
                throw new Error('Erro ao processar a solicitação');
            }
        } catch (error) {
            errorSwal(`Erro ao ${mode === 'create' ? 'cadastrar' : 'editar'} coordenador!`);
        }
    };

    const handleBackButtonClick = () => {
        navigate(-1);
    };

    return (
        <>
            <Sidebar />
            <div className='main-conteiner-auth'>
                <div className="admin_center-header">
                    <div className='title'>
                        <h1>{mode === 'create' ? 'Adicionar Coordenador' : 'Editar Coordenador'}</h1>
                        <button className="botao-voltar" onClick={handleBackButtonClick}>
                            <FontAwesomeIcon icon={faChevronCircleLeft} />
                            Voltar
                        </button>
                    </div>
                    <div className="user">
                        <img src="/static/img/user.svg" alt="logo" />
                        <p>Admin</p>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="background-projects">
                    <div>
                        <div className="campo-projeto">
                            <label htmlFor="coordinatorName">Nome:</label>
                            <input type="text" id="coordinatorName" value={coordinatorName} onChange={(e) => setCoordinatorName(e.target.value)} />
                        </div>

                        <div className="campo-projeto">
                            <label htmlFor="coordinatorCPF">CPF:</label>
                            <input type="text" id="coordinatorCPF" value={formatCPF(coordinatorCPF)} onChange={(e) => setCoordinatorCPF(e.target.value.replace(/[^\d]/g, ''))} maxLength={14} />
                        </div>

                        <div className="campo-projeto">
                            <label htmlFor="coordinatorRG">RG:</label>
                            <input type="text" id="coordinatorRG" value={formatRG(coordinatorRG)} onChange={(e) => setCoordinatorRG(e.target.value)} maxLength={9} />
                        </div>

                        <div className="campo-projeto">
                            <label htmlFor="coordinatorTelefone">Telefone:</label>
                            <input type="text" id="coordinatorTelefone" value={formatPhone(coordinatorTelefone)} onChange={(e) => setCoordinatorTelefone(e.target.value.replace(/[^\d]/g, ''))} maxLength={11} />
                        </div>

                        <div className="campo-projeto">
                            <label htmlFor="coordinatorEconomicActivity">Atividade econômica:</label>
                            <input type="text" id="coordinatorEconomicActivity" value={coordinatorEconomicActivity} onChange={(e) => setCoordinatorEconomicActivity(e.target.value)} />
                        </div>

                        <div className="campo-projeto">
                            <label htmlFor="coordinatorMaritalStatus">Estado civil:</label>
                            <select id="coordinatorMaritalStatus" value={coordinatorMaritalStatus} onChange={(e) => setCoordinatorMaritalStatus(e.target.value)}>
                                <option value="">Selecione</option>
                                <option value="Solteiro">Solteiro</option>
                                <option value="Casado">Casado</option>
                                <option value="Divorciado">Divorciado</option>
                                <option value="Viuvo">Viúvo</option>
                            </select>
                        </div>

                        <div className="campo-projeto">
                            <label htmlFor="coordinatorNacionality">Nacionalidade:</label>
                            <input type="text" id="coordinatorNacionality" value={coordinatorNacionality} onChange={(e) => setCoordinatorNacionality(e.target.value)} />
                        </div>

                        <AddressFields
                            addressStreet={addressStreet}
                            addressNumber={addressNumber}
                            addressNeighborhood={addressNeighborhood}
                            addressCity={addressCity}
                            addressState={addressState}
                            addressZipCode={addressZipCode}
                            setAddressStreet={setAddressStreet}
                            setAddressNumber={setAddressNumber}
                            setAddressNeighborhood={setAddressNeighborhood}
                            setAddressCity={setAddressCity}
                            setAddressState={setAddressState}
                            setAddressZipCode={setAddressZipCode}
                            />

                        <div className="campo-projeto">
                            <button className='btn btn-cadastrar' type="submit">{mode === 'create' ? 'Criar' : 'Salvar Alterações'}</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
