import { useContext, useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import api, { links } from "../../api/api";
import { Projects } from "../../type/projects";
import "./projetosPortal.css";
import Loading from "../loading/loading";
import documents from "../../type/documents";
import Anexos from "../anexos/anexos";
import Header from "../header/header";
import { AuthContext } from "../../contexts/auth/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProjectStatus } from "../../enums/ProjectStatus";
import {
  faCancel,
  faChevronCircleLeft,
  faEdit,
  faFileCircleQuestion,
} from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../sideBar/sideBar";
import ErrorComponent from "../error/error";
import { formatDate } from "../../utils/utils";
import ExportProjectButton from "../exportProjectButton/exportProjectButton";
import BlurText from "../blurText/blurText";

export default function ProjetoDetalhes() {
  const { id } = useParams<{ id?: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { projeto } = (location.state as { projeto?: Projects }) || {};
  const [projectData, setProjectData] = useState<Projects | null>(
    projeto || null
  );
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("Informações do Projeto");
  const [anexos, setAnexos] = useState<documents[]>([]);
  const { isAuthenticated } = useContext(AuthContext);
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);

  const fetchProjetoById = async (projectId: string) => {
    try {
      const response = await links.getProject(projectId);
      if (response.data) {
        setProjectData(response.data.model);
      } else {
        setError("Projeto não encontrado.");
      }
    } catch (error) {
      console.error("Erro ao buscar dados do projeto:", error);
      setError("Erro ao buscar dados do projeto.");
    }
  };

  useEffect(() => {
    if (id && !projectData) {
      fetchProjetoById(id);
    }
  }, [id, projectData]);

  useEffect(() => {
    if (projectData && projectData.documents) {
      const filteredAnexos = projectData.documents.filter((doc) => !doc.removed);
      setAnexos(filteredAnexos);
    }
  }, [projectData]);

  const handleDeleteClick = () => {
    setShowConfirmDelete(true); // Abre o pop-up de confirmação
  };

  const handleConfirmDelete = async () => {
    setShowConfirmDelete(false);
    if (projectData) {
      await handleDelete(projectData.projectId);
    }
  };

  const handleDelete = async (projectId: string) => {
    try {
      await links.deleteProjects(projectId);
      handleBackButtonClick();
    } catch (error) {
      console.error("Erro ao deletar projeto:", error);
    }
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleBackButtonClick = () => {
    navigate(isAuthenticated ? "/gerenciarProjetos" : "/");
  };

  if (error) {
    return <ErrorComponent error={error} />;
  }

  if (!projectData) {
    return (
      <div id="fundo">
        <Header />
        <Loading />
      </div>
    );
  }

  return (
    <div>
      {isAuthenticated && <Sidebar />}
      <div className={isAuthenticated ? "main-conteiner-auth" : ""}>
        <div id={isAuthenticated ? "fundo-autenticado" : "fundo"}>
          <div className="title">
            <h2>Detalhes do Projeto</h2>
            <button className="botao-voltar" onClick={handleBackButtonClick}>
              <FontAwesomeIcon icon={faChevronCircleLeft} />
              Voltar
            </button>
          </div>
        </div>
        <div className="tabs2">
          <button
            className={`tab2 ${activeTab === "Informações do Projeto" ? "active" : ""
              }`}
            onClick={() => handleTabClick("Informações do Projeto")}
          >
            Informações do Projeto
          </button>
          {anexos.length > 0 && (
            <button
              className={`tab2 ${activeTab === "Anexos" ? "active" : ""}`}
              onClick={() => handleTabClick("Anexos")}
            >
              Anexos
            </button>
          )}
        </div>
        <div className="dividir">
          <div id={isAuthenticated ? "detalhesProjetoAuth" : "detalhesProjeto"}>
            <div className="background-projects">
              {activeTab === "Informações do Projeto" && (
                <>
                  <div className="campo-projeto">
                    <label>
                      <strong>Referência:</strong>
                    </label>
                    <span>{projectData?.projectReference || <BlurText />}</span>
                  </div>
                  <div className="campo-projeto">
                    <label>
                      <strong>Empresa:</strong>
                    </label>
                    <span>{projectData?.projectCompany || <BlurText />}</span>
                  </div>
                  <div className="campo-projeto">
                    <label>
                      <strong>Objeto:</strong>
                    </label>
                    <span>{projectData?.projectObjective || <BlurText />}</span>
                  </div>
                  <div className="campo-projeto">
                    <label>
                      <strong>Coordenador:</strong>
                    </label>
                    <span>{projectData?.nameCoordinator || <BlurText />}</span>
                  </div>
                  <div className="campo-projeto">
                    <label>
                      <strong>Valor do Projeto:</strong>
                    </label>
                    <span>
                      {projectData?.projectValue != undefined
                        ? projectData.projectValue.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })
                        : <BlurText />}
                    </span>
                  </div>
                  <div className="campo-projeto">
                    <label>
                      <strong>Data de Início:</strong>
                    </label>
                    <span>
                      {projectData?.projectStartDate
                        ? formatDate(projectData.projectStartDate)
                        : <BlurText />}
                    </span>
                  </div>
                  <div className="campo-projeto">
                    <label>
                      <strong>Data de Término:</strong>
                    </label>
                    <span>
                      {projectData?.projectEndDate
                        ? formatDate(projectData.projectEndDate)
                        : <BlurText />}
                    </span>
                  </div>
                  <div className="campo-projeto">
                    <label>
                      <strong>Descrição:</strong>
                    </label>
                    <span>{projectData?.projectDescription || <BlurText />}</span>
                  </div>
                  <div className="campo-projeto">
                    <label>
                      <strong>Status:</strong>
                    </label>
                    <span>
                      {ProjectStatus[
                        projectData?.projectStatus as unknown as keyof typeof ProjectStatus
                      ] || <BlurText />}
                    </span>
                  </div>
                </>
              )}
              {activeTab === "Anexos" && (
                <div>
                  {anexos.length > 0 ? (
                    anexos.map((documento) => (
                      <div key={documento.fileUrl} className="anexo-item">
                        <Anexos
                          link={documento.fileUrl}
                          nome={documento.fileName}
                          tipo={documento.fileType}
                        />
                      </div>
                    ))
                  ) : (
                    <p>Nenhum documento disponível.</p>
                  )}
                </div>
              )}
            </div>
          </div>
          {isAuthenticated && (
            <>
              <div className="button-container">
                <ExportProjectButton
                  id={projectData.projectId}
                  format="pdf"
                  nome={projectData.projectReference ?? "Referencia_Indisponivel"}
                />
                <button
                  className="history-buttons"
                  onClick={() => navigate(`/historico-projeto/${id}`)}
                >
                  <FontAwesomeIcon icon={faFileCircleQuestion} />
                  Historico projeto
                </button>
                <button
                  className="buttons"
                  onClick={() => navigate(`/editar-projeto/${id}`)}
                >
                  <FontAwesomeIcon icon={faEdit} />
                  Editar
                </button>
                <button className="delete-buttons" onClick={handleDeleteClick}>
                  <FontAwesomeIcon icon={faCancel} /> Deletar Projeto
                </button>
              </div>
            </>
          )}
        </div>

        {showConfirmDelete && (
          <div className="modal">
            <div className="modal-content">
              <h1>Você tem certeza que deseja deletar este projeto?</h1>
              <div className="modal-button">
                <button className="buttons" onClick={handleConfirmDelete}>
                  Sim
                </button>
                <button
                  className="delete-buttons"
                  onClick={() => setShowConfirmDelete(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
