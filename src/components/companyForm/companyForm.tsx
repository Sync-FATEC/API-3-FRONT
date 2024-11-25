import React, { useState } from 'react';
import Sidebar from "../sideBar/sideBar";
import { successSwal } from '../swal/sucessSwal';
import { errorSwal } from '../swal/errorSwal';
import { useNavigate } from 'react-router-dom';
import { CompanyType } from '../../type/CompanyType';
import { formatCEP, formatCNPJ, formatPhone } from '../../utils/utils';
import { UpdateCompanyDTO } from '../../type/updateCompany';

type CompanyFormProps = {
    initialData?: CompanyType;
    onSubmit: (data: UpdateCompanyDTO) => Promise<{ status: number }>;
    mode: 'create' | 'edit';
};

export function CompanyForm({ initialData, onSubmit, mode }: CompanyFormProps) {
    const [id] = useState(initialData?.id || ''); // Default to an empty string if id is missing
    const [corporateName, setCorporateName] = useState(initialData?.corporateName || '');
    const [cnpj, setCnpj] = useState(initialData?.cnpj || '');
    const [phone, setPhone] = useState(initialData?.phone || '');
    const [privateCompany, setPrivateCompany] = useState(initialData?.privateCompany || false);
    const [addressId] = useState(initialData?.address?.id || ''); // Ensure addressId is defaulted to an empty string if missing
    const [addressStreet, setAddressStreet] = useState(initialData?.address?.street || '');
    const [addressNumber, setAddressNumber] = useState(initialData?.address?.number || '');
    const [addressNeighborhood, setAddressNeighborhood] = useState(initialData?.address?.neighborhood || '');
    const [addressCity, setAddressCity] = useState(initialData?.address?.city || '');
    const [addressState, setAddressState] = useState(initialData?.address?.state || '');
    const [addressZipCode, setAddressZipCode] = useState(initialData?.address?.zipCode || '');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const unformattedCNPJ = cnpj.replace(/[^\d]/g, '');
        const unformattedPhone = phone.replace(/[^\d]/g, '');

        const company: UpdateCompanyDTO = {
            id,
            corporateName,
            cnpj: unformattedCNPJ,
            phone: unformattedPhone,
            privateCompany,
            addressId,
            addressStreet,
            addressNumber,
            addressNeighborhood,
            addressCity,
            addressState,
            addressZipCode,
        };

        if (unformattedCNPJ.length !== 14 && unformattedCNPJ.length > 0) {
            errorSwal('CNPJ inválido!');
            return;
        }

        try {
            const response = await onSubmit(company);
            if (response?.status === 200 || response?.status === 201) {
                successSwal(`Empresa ${mode === 'create' ? 'cadastrada' : 'editada'} com sucesso!`);
                if (mode === 'create') {
                    setCorporateName('');
                    setCnpj('');
                    setPhone('');
                    setPrivateCompany(false);
                    setAddressStreet('');
                    setAddressNumber('');
                    setAddressNeighborhood('');
                    setAddressCity('');
                    setAddressState('');
                    setAddressZipCode('');
                }
                navigate(-1);
            } else {
                throw new Error('Erro ao processar a solicitação');
            }
        } catch (error) {
            errorSwal(`Erro ao ${mode === 'create' ? 'cadastrar' : 'editar'} empresa!`);
        }
    };

    return (
        <>
            <Sidebar />
            <div className='main-conteiner-auth'>
                <div className="admin_center-header">
                    <h1>{mode === 'create' ? 'Adicionar Empresa' : 'Editar Empresa'}</h1>
                    <div className="user">
                        <img src="/static/img/user.svg" alt="logo" />
                        <p>Admin</p>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="background-projects">
                    <div>
                        <div className="campo-projeto">
                            <label htmlFor="corporateName">Nome Empresarial:</label>
                            <input
                                type="text"
                                id="corporateName"
                                value={corporateName}
                                onChange={(e) => setCorporateName(e.target.value)}
                            />
                        </div>

                        <div className="campo-projeto">
                            <label htmlFor="cnpj">CNPJ:</label>
                            <input
                                type="text"
                                id="cnpj"
                                value={formatCNPJ(cnpj)}
                                onChange={(e) => setCnpj(e.target.value.replace(/[^\d]/g, ''))}
                                maxLength={18}
                            />
                        </div>

                        <div className="campo-projeto">
                            <label htmlFor="phone">Telefone:</label>
                            <input
                                type="text"
                                id="phone"
                                value={formatPhone(phone)}
                                onChange={(e) => setPhone(e.target.value.replace(/[^\d]/g, ''))}
                                maxLength={15}
                            />
                        </div>

                        <div className="campo-projeto">
                            <label htmlFor="privateCompany">Empresa Privada:</label>
                            <input
                                type="checkbox"
                                id="privateCompany"
                                checked={privateCompany}
                                onChange={(e) => setPrivateCompany(e.target.checked)}
                            />
                        </div>

                        <div className="campo-projeto">
                            <label htmlFor="addressStreet">Rua:</label>
                            <input
                                type="text"
                                id="addressStreet"
                                value={addressStreet}
                                onChange={(e) => setAddressStreet(e.target.value)}
                            />
                        </div>

                        <div className="campo-projeto">
                            <label htmlFor="addressNumber">Número:</label>
                            <input
                                type="text"
                                id="addressNumber"
                                value={addressNumber}
                                onChange={(e) => setAddressNumber(e.target.value)}
                            />
                        </div>

                        <div className="campo-projeto">
                            <label htmlFor="addressNeighborhood">Bairro:</label>
                            <input
                                type="text"
                                id="addressNeighborhood"
                                value={addressNeighborhood}
                                onChange={(e) => setAddressNeighborhood(e.target.value)}
                            />
                        </div>

                        <div className="campo-projeto">
                            <label htmlFor="addressCity">Cidade:</label>
                            <input
                                type="text"
                                id="addressCity"
                                value={addressCity}
                                onChange={(e) => setAddressCity(e.target.value)}
                            />
                        </div>

                        <div className="campo-projeto">
                            <label htmlFor="addressState">Estado:</label>
                            <input
                                type="text"
                                id="addressState"
                                value={addressState}
                                onChange={(e) => setAddressState(e.target.value)}
                            />
                        </div>

                        <div className="campo-projeto">
                            <label htmlFor="addressZipCode">CEP:</label>
                            <input
                                type="text"
                                id="addressZipCode"
                                maxLength={9}
                                value={formatCEP(addressZipCode)}
                                onChange={(e) => setAddressZipCode(e.target.value)}
                            />
                        </div>

                        <div className="campo-projeto">
                            <button className='btn btn-cadastrar' type="submit">{mode === 'create' ? 'Criar' : 'Salvar Alterações'}</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
