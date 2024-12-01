import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';
import Sidebar from "../sideBar/sideBar";
import { successSwal } from '../swal/sucessSwal';
import { errorSwal } from '../swal/errorSwal';
import { useNavigate } from 'react-router-dom';
import { CompanyType } from '../../type/CompanyType';
import { formatCNPJ, formatPhone } from '../../utils/utils';
import { UpdateCompanyDTO } from '../../type/updateCompany';
import AddressFields from '../endereco/AddressFields';

type CompanyFormProps = {
  initialData?: CompanyType;
  onSubmit: (data: UpdateCompanyDTO) => Promise<{ status: number }>;
  mode: 'create' | 'edit';
};

export function CompanyForm({ initialData, onSubmit, mode }: CompanyFormProps) {
  const [id] = useState(initialData?.id || '');
  const [corporateName, setCorporateName] = useState(initialData?.corporateName || '');
  const [cnpj, setCnpj] = useState(initialData?.cnpj || '');
  const [phone, setPhone] = useState(initialData?.phone || '');
  const [privateCompany, setPrivateCompany] = useState(initialData?.privateCompany || false);
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

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  return (
    <>
      <Sidebar />
      <div className="main-conteiner-auth">
        <div className="admin_center-header">
        <div className='title'>
            <h1>{mode === 'create' ? 'Adicionar Empresa' : 'Editar Empresa'}</h1>
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
            {/* Campos do formulário */}
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
              <button className="btn btn-cadastrar" type="submit">{mode === 'create' ? 'Criar' : 'Salvar Alterações'}</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
