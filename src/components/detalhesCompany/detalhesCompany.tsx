import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Sidebar from "../sideBar/sideBar";
import {
  faCancel,
  faChevronCircleLeft,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { links } from "../../api/api";
import { errorSwal } from "../swal/errorSwal";
import ButtonProject from "../ButtonProject/ButtonProject";
import { formatCEP, formatCNPJ, formatPhone } from "../../utils/utils";
import { CompanyType } from "../../type/CompanyType";
import './detalhesCompany.css';
import Loading from "../loading/loading";

export function DetalhesCompany() {
  const navigate = useNavigate();
  const [Empresa, setEmpresa] = useState<CompanyType | null>(null);
  const { id } = useParams();

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  const handleDeleteButtonClick = async () => {
    try {
      if (id) {
        await links.deleteCompany(id);
        navigate(-1);
      }
    } catch (error) {
      errorSwal("Erro ao deletar Empresa");
    }
  };

  useEffect(() => {
    const getCompany = async () => {
      try {
        if (id) {
          const response = await links.getCompany(id);
          setEmpresa(response.data.model);
        }
      } catch (error) {
        errorSwal("Erro ao buscar Empresa");
      }
    };
    getCompany();
  }, [id]);

  if (!Empresa) {
    return <Loading />
  }

  return (
    <>
      <Sidebar />
      <div className="main-conteiner-auth">
        <div className="admin_center-header">
          <div className="title">
            <h2>Detalhes da Empresa</h2>
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
        <div className="dividir">
          <div id="detalhesCompany">
            <div className="background-projects">
              <div className="campo-projeto">
                <label>
                  <strong>Nome:</strong>
                </label>
                <span>{Empresa.corporateName || "Não disponível"}</span>
              </div>
              <div className="campo-projeto">
                <label>
                  <strong>CNPJ:</strong>
                </label>
                <span>{Empresa.cnpj ? formatCNPJ(Empresa.cnpj) : "Não disponível"}</span>
              </div>
              <div className="campo-projeto">
                <label>
                  <strong>Telefone:</strong>
                </label>
                <span>{Empresa.phone ? formatPhone(Empresa.phone) : "Não disponível"}</span>
              </div>
              <div className="campo-projeto">
                <label>
                  <strong>Endereço:</strong>
                </label>
                <span>
                  {Empresa.address
                    ? `${Empresa.address.state}, ${Empresa.address.city}, ${Empresa.address.neighborhood}, ${Empresa.address.street}, ${Empresa.address.number}, ${formatCEP(Empresa.address.zipCode)}`
                    : "Não disponível"}
                </span>
              </div>
            </div>
          </div>
          <div className="button-container">
            <ButtonProject
              text="Editar"
              color="blue"
              iconButton={faEdit}
              action={() => {
                navigate(`/Empresa/editar/${id}`);
              }}
            />
            <ButtonProject
              text="Deletar"
              color="red"
              iconButton={faCancel}
              action={() => handleDeleteButtonClick()}
            />
          </div>
        </div>
      </div>
    </>
  );
}
