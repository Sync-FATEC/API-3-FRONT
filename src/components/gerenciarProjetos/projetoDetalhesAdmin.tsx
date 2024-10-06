import { useContext, useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import api, { links } from "../../api/api";
import { Projetos } from "../../type/projeto";
import "./styles.css";
import Loading from "../loading";
import documents from "../../type/documents";
import Anexos from "../projetosPortal/anexos";
import Header from "../header";
import Sidebar from "../sideBar/static";
import { AuthContext } from "../../contexts/auth/AuthContext"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleLeft, faEdit, faSave } from '@fortawesome/free-solid-svg-icons';

export default function VerDetalhes() {
  const { id } = useParams<{ id?: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { projeto } = (location.state as { projeto?: Projetos }) || {};
  const [projectData, setProjectData] = useState<Projetos | null>(projeto || null);
  const [originalData, setOriginalData] = useState<Projetos | null>(projeto || null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("Informações do Projeto");
  const [contratos, setContratos] = useState<documents[]>([]);
  const [planos, setPlanos] = useState<documents[]>([]);
  const [termos, setTermos] = useState<documents[]>([]);
  const [outros, setOutros] = useState<documents[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { isAuthenticated } = useContext(AuthContext);
  
  const fetchProjetoById = async (projectId: string) => {
    try {
      const response = await links.getProject(projectId);
      if (response.data) {
        setProjectData(response.data.model);
        setOriginalData(response.data.model); 
      } else {
        setError("Projeto não encontrado.");
      }
    } catch (error) {
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
        if (doc.fileType === "CONTRATO") {
          newContratos.push(doc);
        } else if (doc.fileType === "PLANO_DE_TRABALHO") {
          newPlanos.push(doc);
        } else if (doc.fileType === "TERMO_ADITIVO") {
          newTermos.push(doc);
        } else {
          newOutros.push(doc);
        }
      });

      setContratos(newContratos);
      setPlanos(newPlanos);
      setTermos(newTermos);
      setOutros(newOutros);
    }
  }, [projectData]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleBackButtonClick = () => {
    navigate(isAuthenticated ? "/gerenciarProjetos" : "/");
  };

  const handleEditClick = () => {
    if (!isEditing) {
      setOriginalData(projectData); 
    }
    setIsEditing(!isEditing); 
  };

  const handleCancel = () => {
    setProjectData(originalData); 
    setIsEditing(false); 
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (projectData) {
      setProjectData({
        ...projectData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSave = async () => {
    // try {
    //   if (projectData && id) {
    //     await links.updateProjects(id, projectData);
    //     setOriginalData(projectData);
    //     setIsEditing(false); 
    //   }
    // } catch (error) {
    //   setError("Erro ao salvar alterações.");
    // }
  };

  if (!projectData) {
    return (
      <div id="fundo">
        <Header />
        <Loading />
      </div>
    );
  }

  return (
    <>
      <Sidebar />
      <div className="fundo-verdetalhes">
        <div className="title2">
          <h2 id="title2">Detalhes do Projeto</h2>
          <button className="botao-voltar" onClick={handleBackButtonClick}>
            <FontAwesomeIcon icon={faChevronCircleLeft} />
            Voltar
          </button>
        </div>
        <div className="tabs2">
          <button
            className={`tab2 ${activeTab === "Informações do Projeto" ? "active" : ""}`}
            onClick={() => handleTabClick("Informações do Projeto")}
          >
            Informações do Projeto
          </button>

          {contratos.length > 0 && (
            <button
              className={`tab2 ${activeTab === "Contratos" ? "active" : ""}`}
              onClick={() => handleTabClick("Contratos")}
            >
              Contratos
            </button>
          )}

          {planos.length > 0 && (
            <button
              className={`tab2 ${activeTab === "Planos de trabalhos" ? "active" : ""}`}
              onClick={() => handleTabClick("Planos de trabalhos")}
            >
              Planos de Trabalhos
            </button>
          )}

          {termos.length > 0 && (
            <button
              className={`tab2 ${activeTab === "Termos aditivo" ? "active" : ""}`}
              onClick={() => handleTabClick("Termos aditivo")}
            >
              Termos Aditivo
            </button>
          )}

          {outros.length > 0 && (
            <button
              className={`tab2 ${activeTab === "Outros" ? "active" : ""}`}
              onClick={() => handleTabClick("Outros")}
            >
              Outros
            </button>
          )}
        </div>

        <div id="MainDadoss">
          <div className="background-projects">
            {activeTab === "Informações do Projeto" && (
              <>
                <div className="campo-projeto">
                  <label><strong>Referência:</strong></label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="projectReference"
                      value={projectData?.projectReference || ""}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span>{projectData?.projectReference || "Referência não disponível"}</span>
                  )}
                </div>
                <div className="campo-projeto">
                  <label><strong>Empresa:</strong></label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="projectCompany"
                      value={projectData?.projectCompany || ""}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span>{projectData?.projectCompany || "Empresa não disponível"}</span>
                  )}
                </div>
                <div className="campo-projeto">
                  <label><strong>Objeto:</strong></label>
                  {isEditing ? (
                    <textarea
                      name="projectObjective"
                      value={projectData?.projectObjective || ""}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span>{projectData?.projectObjective || "Objeto não disponível"}</span>
                  )}
                </div>
                <div className="campo-projeto">
                  <label><strong>Coordenador:</strong></label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="nameCoordinator"
                      value={projectData?.nameCoordinator || ""}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span>{projectData?.nameCoordinator || "Coordenador não disponível"}</span>
                  )}
                </div>
                <div className="campo-projeto">
                  <label><strong>Valor do Projeto:</strong></label>
                  {isEditing ? (
                    <input
                      type="number"
                      name="projectValue"
                      value={projectData?.projectValue || ""}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span>
                      {projectData?.projectValue !== undefined
                        ? `R$ ${projectData.projectValue.toFixed(2).replace(".", ",")}`
                        : "Valor do projeto não disponível"}
                    </span>
                  )}
                </div>
                <div className="campo-projeto">
                  <label><strong>Data de Início:</strong></label>
                  {isEditing ? (
                    <input
                      type="date"
                      name="projectStartDate"
                      value={
                        projectData?.projectStartDate
                          ? new Date(projectData.projectStartDate).toISOString().split('T')[0]
                          : ""
                      }
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span>
                      {projectData?.projectStartDate
                        ? new Intl.DateTimeFormat("pt-BR").format(new Date(projectData.projectStartDate))
                        : "Data de início não disponível"}
                    </span>
                  )}
                </div>
                <div className="campo-projeto">
                  <label><strong>Data de Término:</strong></label>
                  {isEditing ? (
                    <input
                      type="date"
                      name="projectEndDate"
                      value={
                        projectData?.projectEndDate
                          ? new Date(projectData.projectEndDate).toISOString().split('T')[0]
                          : ""
                      }
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span>
                      {projectData?.projectEndDate
                        ? new Intl.DateTimeFormat("pt-BR").format(new Date(projectData.projectEndDate))
                        : "Data de término não disponível"}
                    </span>
                  )}
                </div>
              </>
            )}

            {activeTab === "Contratos" && (
              <div>
                {contratos.length > 0 ? (
                  <div>
                    {contratos.map((cont) => (
                      <Anexos key={cont.fileUrl} link={cont.fileUrl} nome={cont.fileName} />
                    ))}
                  </div>
                ) : (
                  <p>Nenhum contrato disponível.</p>
                )}
              </div>
            )}

            {activeTab === "Planos de trabalhos" && (
              <div>
                {planos.length > 0 ? (
                  <div>
                    {planos.map((cont) => (
                      <Anexos key={cont.fileUrl} link={cont.fileUrl} nome={cont.fileName} />
                    ))}
                  </div>
                ) : (
                  <p>Nenhum plano de trabalho disponível.</p>
                )}
              </div>
            )}

            {activeTab === "Termos aditivo" && (
              <div>
                {termos.length > 0 ? (
                  <div>
                    {termos.map((cont) => (
                      <Anexos key={cont.fileUrl} link={cont.fileUrl} nome={cont.fileName} />
                    ))}
                  </div>
                ) : (
                  <p>Nenhum termo aditivo disponível.</p>
                )}
              </div>
            )}

            {activeTab === "Outros" && (
              <div>
                {outros.length > 0 ? (
                  <div>
                    {outros.map((cont) => (
                      <Anexos key={cont.fileUrl} link={cont.fileUrl} nome={cont.fileName} />
                    ))}
                  </div>
                ) : (
                  <p>Nenhum documento disponível.</p>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="buttons-container">
          {isEditing && (
            <>
              <button className="buttons" onClick={handleSave}>
                <FontAwesomeIcon icon={faSave} />
                Salvar
              </button>
              <button className="buttons" onClick={handleCancel}>Cancelar</button>
            </>
          )}
          {!isEditing && (
            <button className="buttons" onClick={handleEditClick}>
              <FontAwesomeIcon icon={faEdit} />
              Editar
            </button>
          )}
        </div>
      </div>
    </>
  );
}
