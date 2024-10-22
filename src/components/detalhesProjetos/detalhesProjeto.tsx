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
  const [contratos, setContratos] = useState<documents[]>([]);
  const [planos, setPlanos] = useState<documents[]>([]);
  const [termos, setTermos] = useState<documents[]>([]);
  const [outros, setOutros] = useState<documents[]>([]);
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
      const newContratos: documents[] = [];
      const newPlanos: documents[] = [];
      const newTermos: documents[] = [];
      const newOutros: documents[] = [];

      projectData.documents.forEach((doc) => {
        if (!doc.removed) {
          if (doc.fileType === "CONTRATO") {
            newContratos.push(doc);
          } else if (doc.fileType === "PLANO_DE_TRABALHO") {
            newPlanos.push(doc);
          } else if (doc.fileType === "TERMO_ADITIVO") {
            newTermos.push(doc);
          } else {
            newOutros.push(doc);
          }
        }
      });

      setContratos(newContratos);
      setPlanos(newPlanos);
      setTermos(newTermos);
      setOutros(newOutros);
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const localDate = new Date(
      date.getTime() + date.getTimezoneOffset() * 60000
    );
    return localDate.toLocaleDateString("pt-BR");
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
        <div id={isAuthenticated ? "detalhesProjetoAuth" : "detalhesProjeto"}>
          <div className="tabs2">
            <button
              className={`tab2 ${
                activeTab === "Informações do Projeto" ? "active" : ""
              }`}
              onClick={() => handleTabClick("Informações do Projeto")}
            >
              Informações do Projeto
            </button>

            {contratos.length > 0 && contratos.some((doc) => !doc.removed) && (
              <button
                className={`tab2 ${activeTab === "Contratos" ? "active" : ""}`}
                onClick={() => handleTabClick("Contratos")}
              >
                Contratos
              </button>
            )}


            {planos.length > 0 && planos.some((doc) => !doc.removed) && (
              <button
                className={`tab2 ${
                  activeTab === "Planos de trabalhos" ? "active" : ""
                }`}
                onClick={() => handleTabClick("Planos de trabalhos")}
              >
                Planos de Trabalhos
              </button>
            )}

            {termos.length > 0 && termos.some((doc) => !doc.removed) && (
              <button
                className={`tab2 ${
                  activeTab === "Termos aditivo" ? "active" : ""
                }`}
                onClick={() => handleTabClick("Termos aditivo")}
              >
                Termos Aditivo
              </button>
            )}
            {outros.length > 0 && outros.some((doc) => !doc.removed) && (
              <button
                className={`tab2 ${activeTab === "Outros" ? "active" : ""}`}
                onClick={() => handleTabClick("Outros")}
              >
                Outros
              </button>
            )}
          </div>

          <div className="background-projects">
            {activeTab === "Informações do Projeto" && (
              <>
                <div className="campo-projeto">
                  <label>
                    <strong>Referência:</strong>
                  </label>
                  <span>
                    {projectData?.projectReference ||
                      "Referência não disponível"}
                  </span>
                </div>
                <div className="campo-projeto">
                  <label>
                    <strong>Empresa:</strong>
                  </label>
                  <span>
                    {projectData?.projectCompany || "Empresa não disponível"}
                  </span>
                </div>
                <div className="campo-projeto">
                  <label>
                    <strong>Objeto:</strong>
                  </label>
                  <span>
                    {projectData?.projectObjective || "Objeto não disponível"}
                  </span>
                </div>
                <div className="campo-projeto">
                  <label>
                    <strong>Coordenador:</strong>
                  </label>
                  <span>
                    {projectData?.nameCoordinator ||
                      "Coordenador não disponível"}
                  </span>
                </div>
                <div className="campo-projeto">
                  <label>
                    <strong>Valor do Projeto:</strong>
                  </label>
                  <span>
                    {projectData?.projectValue !== undefined
                      ? projectData.projectValue.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })
                      : "Valor não disponível"}
                  </span>
                </div>
                <div className="campo-projeto">
                  <label>
                    <strong>Data de Início:</strong>
                  </label>
                  <span>
                    {projectData?.projectStartDate
                      ? formatDate(projectData.projectStartDate)
                      : "Data de início não disponível"}
                  </span>
                </div>
                <div className="campo-projeto">
                  <label>
                    <strong>Data de Término:</strong>
                  </label>
                  <span>
                    {projectData?.projectEndDate
                      ? formatDate(projectData.projectEndDate)
                      : "Data de término não disponível"}
                  </span>
                </div>
                <div className="campo-projeto">
                  <label>
                    <strong>Descrição:</strong>
                  </label>
                  <span>
                    {projectData?.projectDescription ||
                      "Descrição não disponível"}
                  </span>
                </div>
                <div className="campo-projeto">
                  <label>
                    <strong>Status:</strong>
                  </label>
                  <span>
                    {ProjectStatus[
                      projectData?.projectStatus as unknown as keyof typeof ProjectStatus
                    ] || "Status não disponível"}
                  </span>
                </div>
              </>
            )}

            {activeTab === "Contratos" && (
              <div>
                {contratos.filter((documento) => !documento.removed).length >
                0 ? (
                  <div>
                    {contratos
                      .filter((cont) => !cont.removed)
                      .map((cont) => (
                        <Anexos
                          key={cont.fileUrl}
                          link={cont.fileUrl}
                          nome={cont.fileName}
                        />
                      ))}
                  </div>
                ) : (
                  <p>Nenhum contrato disponível.</p>
                )}
              </div>
            )}

            {activeTab === "Planos de trabalhos" && (
              <div>
                {planos.filter((documento) => !documento.removed).length > 0 ? (
                    <div>
                    {planos
                      .filter((cont) => !cont.removed)
                      .map((cont) => (
                      <Anexos
                        key={cont.fileUrl}
                        link={cont.fileUrl}
                        nome={cont.fileName}
                      />
                      ))}
                    </div>
                ) : (
                  <p>Nenhum plano de trabalho disponível.</p>
                )}
              </div>
            )}

            {activeTab === "Termos aditivo" && (
              <div>
                {termos.filter((documento) => !documento.removed).length > 0 ? (
                    <div>
                    {termos
                      .filter((cont) => !cont.removed)
                      .map((cont) => (
                      <Anexos
                        key={cont.fileUrl}
                        link={cont.fileUrl}
                        nome={cont.fileName}
                      />
                      ))}
                    </div>
                ) : (
                  <p>Nenhum termo aditivo disponível.</p>
                )}
              </div>
            )}

            {activeTab === "Outros" && (
              <div>
                {outros.filter((documento) => !documento.removed).length > 0 ? (
                    <div>
                    {outros
                      .filter((cont) => !cont.removed)
                      .map((cont) => (
                      <Anexos
                        key={cont.fileUrl}
                        link={cont.fileUrl}
                        nome={cont.fileName}
                      />
                      ))}
                    </div>
                ) : (
                  <p>Nenhum documento disponível.</p>
                )}
              </div>
            )}
          </div>
          {isAuthenticated && (
            <>
              <div className="button-container">
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
                <button
                  className="history-buttons"
                  onClick={() => navigate(`/historico-projeto/${id}`)}
                >
                  <FontAwesomeIcon icon={faFileCircleQuestion} />
                  Historico projeto
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
