import React, { useState } from 'react';
import Sidebar from "../../components/sideBar/sideBar";
import { createCoordinators } from '../../type/createCoordinators';
import { links } from '../../api/api';
import { successSwal } from '../../components/swal/sucessSwal';
import { errorSwal } from '../../components/swal/errorSwal';

export function AddCoordinators() {
    const [coordinatorName, setCoordinatorName] = useState('');
    const [coordinatorCPF, setCoordinatorCPF] = useState('');
    const [coordinatorTelefone, setCoordinatorTelefone] = useState('');
    const [coordinatorEconomicActivity, setCoordinatorEconomicActivity] = useState('');

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCoordinatorName(e.target.value);
    };

    const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCoordinatorCPF(e.target.value);
    };

    const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCoordinatorTelefone(e.target.value);
    };

    const handleEconomicActivityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCoordinatorEconomicActivity(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const coordenador: createCoordinators = {
            coordinatorName,
            coordinatorCPF,
            coordinatorTelefone,
            coordinatorEconomicActivity
        }
        try {
            links.createCoordinators(coordenador);
            successSwal('Coordenador cadastrado com sucesso!');
            setCoordinatorCPF('');
            setCoordinatorEconomicActivity('');
            setCoordinatorName('');
            setCoordinatorTelefone('');
        } catch (error) {
            errorSwal('Erro ao cadastrar coordenador!');
        }
    }
    return (
        <>
            <Sidebar />
            <div className='main-conteiner-auth'>
                <div className="admin_center-header">
                    <h1>Adicionar Projetos</h1>
                    <div className="user">
                        <img src="/static/img/user.svg" alt="logo" />
                        <p>Admin</p>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="background-projects">
                    <div>
                        <div className="campo-projeto">
                            <label htmlFor="coordinatorName">Nome:</label>
                            <input type="text" name="coordinatorName" id="coordinatorName" value={coordinatorName} onChange={handleNameChange} />
                        </div>

                        <div className="campo-projeto">
                            <label htmlFor="coordinatorCPF">CPF:</label>
                            <input type="number" name="coordinatorCPF" id="coordinatorCPF" value={coordinatorCPF} onChange={handleCPFChange} />
                        </div>

                        <div className="campo-projeto">
                            <label htmlFor="coordinatorTelefone">Telefone:</label>
                            <input type="number" name="coordinatorTelefone" id="coordinatorTelefone" value={coordinatorTelefone} onChange={handleTelefoneChange} />
                        </div>

                        <div className="campo-projeto">
                            <label htmlFor="coordinatorEconomicActivity">Atividade economica:</label>
                            <input type="text" name="coordinatorEconomicActivity" id="coordinatorEconomicActivity" value={coordinatorEconomicActivity} onChange={handleEconomicActivityChange} />
                        </div>
                        <div className="campo-projeto">
                            <button type="submit">Criar coordenador</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}