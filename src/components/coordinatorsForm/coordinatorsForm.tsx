import React, { useState, useEffect } from 'react';
import Sidebar from "../../components/sideBar/sideBar";
import { createCoordinators } from '../../type/createCoordinators';
import { successSwal } from '../../components/swal/sucessSwal';
import { errorSwal } from '../../components/swal/errorSwal';
import { formatCPF, formatPhone, validateCPF } from '../../utils/utils';
import { CoordinatorType } from '../../type/CoordinatorsType';
import { useNavigate } from 'react-router-dom';

type CoordinatorsFormProps = {
    initialData?: CoordinatorType;
    onSubmit: (data: CoordinatorType) => Promise<{ status: number }>;
    mode: 'create' | 'edit';
};

export function CoordinatorsForm({ initialData, onSubmit, mode }: CoordinatorsFormProps) {
    const [coordinatorId] = useState(initialData?.coordinatorId || '');
    const [coordinatorName, setCoordinatorName] = useState(initialData?.coordinatorName || '');
    const [coordinatorCPF, setCoordinatorCPF] = useState(initialData?.coordinatorCPF || '');
    const [coordinatorTelefone, setCoordinatorTelefone] = useState(initialData?.coordinatorTelefone || '');
    const [coordinatorEconomicActivity, setCoordinatorEconomicActivity] = useState(initialData?.coordinatorEconomicActivity || '');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const unformattedCPF = coordinatorCPF.replace(/[^\d]/g, '');
        const unformattedPhone = coordinatorTelefone.replace(/[^\d]/g, '');

        const coordinator: CoordinatorType = {
            coordinatorId,
            coordinatorName,
            coordinatorCPF: unformattedCPF,
            coordinatorTelefone: unformattedPhone,
            coordinatorEconomicActivity,
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

    return (
        <>
            <Sidebar />
            <div className='main-conteiner-auth'>
                <div className="admin_center-header">
                    <h1>{mode === 'create' ? 'Adicionar Coordenador' : 'Editar Coordenador'}</h1>
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
                            <label htmlFor="coordinatorTelefone">Telefone:</label>
                            <input type="text" id="coordinatorTelefone" value={formatPhone(coordinatorTelefone)} onChange={(e) => setCoordinatorTelefone(e.target.value.replace(/[^\d]/g, ''))} maxLength={11} />
                        </div>

                        <div className="campo-projeto">
                            <label htmlFor="coordinatorEconomicActivity">Atividade econômica:</label>
                            <input type="text" id="coordinatorEconomicActivity" value={coordinatorEconomicActivity} onChange={(e) => setCoordinatorEconomicActivity(e.target.value)} />
                        </div>

                        <div className="campo-projeto">
                            <button type="submit">{mode === 'create' ? 'Criar' : 'Salvar Alterações'}</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
