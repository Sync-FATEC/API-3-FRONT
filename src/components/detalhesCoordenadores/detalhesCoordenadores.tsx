import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Sidebar from "../sideBar/sideBar";
import {
  faCancel,
  faChevronCircleLeft,
  faEdit,
  faFileCircleQuestion,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CoordinatorType } from "../../type/CoordinatorsType";
import { links } from "../../api/api";
import { errorSwal } from "../swal/errorSwal";
import ButtonProject from "../ButtonProject/ButtonProject";
import "./detalhesCoordenadores.css";
import { formatCPF, formatPhone, formatRG } from "../../utils/utils";

export function DetalhesCoordenadores() {
  const navigate = useNavigate();
  const [coordenador, setCoordenador] = useState<CoordinatorType | null>(null);
  const { id } = useParams();

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  const handleDeleteButtonClick = async () => {
    try {
      if (id) {
        await links.deleteCoordinator(id);
        navigate(-1);
      }
    } catch (error) {
      errorSwal("Erro ao deletar coordenador");
    }
  };

  useEffect(() => {
    console.log(id);

    const getCoordinator = async () => {
      try {
        if (id) {
          const response = await links.getCoordinator(id);
          setCoordenador(response.data.model);
        }
      } catch (error) {
        errorSwal("Erro ao buscar coordenador");
      }
    };
    getCoordinator();
  }, [id]);

  return (
    <>
      <Sidebar />
      <div className="main-conteiner-auth">
        <div className="admin_center-header">
          <div className="title">
            <h2>Detalhes do Projeto</h2>
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
          <div id="detalhesCoordenadores">
            <div className="background-projects">
              <div className="campo-projeto">
                <label>
                  <strong>Nome:</strong>
                </label>
                <span>{coordenador?.coordinatorName || "Não disponível"}</span>
              </div>
              <div className="campo-projeto">
                <label>
                  <strong>CPF:</strong>
                </label>
                <span>{coordenador?.coordinatorCPF ? formatCPF(coordenador.coordinatorCPF) : "Não disponível"}</span>
              </div>
              <div className="campo-projeto">
                <label>
                  <strong>RG:</strong>
                </label>
                <span>{coordenador?.coordinatorRG ? formatRG(coordenador.coordinatorRG) : "Não disponível"}</span>
              </div>
              <div className="campo-projeto">
                <label>
                  <strong>Telefone:</strong>
                </label>
                <span>
                  {coordenador?.coordinatorTelefone ? formatPhone(coordenador.coordinatorTelefone) : "Não disponível"}
                </span>
              </div>
              <div className="campo-projeto">
                <label>
                  <strong>Atividade Econômica:</strong>
                </label>
                <span>
                  {coordenador?.coordinatorEconomicActivity || "Não disponível"}
                </span>
              </div>
              <div className="campo-projeto">
                <label>
                  <strong>Estado Civil:</strong>
                </label>
                <span>{coordenador?.coordinatorMaritalStatus || "Não disponível"}</span>
              </div>
              <div className="campo-projeto">
                <label>
                  <strong>Nacionalidade:</strong>
                </label>
                <span>{coordenador?.coordinatorNacionality || "Não disponível"}</span>
              </div>
            </div>
          </div>
          <div className="button-container">
            <ButtonProject
              text="Editar"
              color="blue"
              iconButton={faEdit}
              action={() => {
                navigate(`/coordenador/editar/${id}`);
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
