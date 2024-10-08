import { useContext, useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import api, { links } from "../../api/api";
import { Projetos } from "../../type/projeto";
import "./styles.css"
import Loading from "../loading";
import documents from "../../type/documents";
import Anexos from "./anexos";
import Header from "../header"
import { AuthContext } from "../../contexts/auth/AuthContext"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ProjectStatus } from "../../enums/ProjectStatus";
import { faCancel, faChevronCircleLeft, faEdit, faSave } from '@fortawesome/free-solid-svg-icons';

export default function ProjetoDetalhes() {
  const { id } = useParams<{ id?: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { projeto } = (location.state as { projeto?: Projetos }) || {};
  const [projectData, setProjectData] = useState<Projetos | null>(projeto || null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("Informações do Projeto");
  const [contratos, setContratos] = useState<documents[]>([]);
  const [planos, setPlanos] = useState<documents[]>([]);
  const [termos, setTermos] = useState<documents[]>([]);
  const [outros, setOutros] = useState<documents[]>([]);
  const { isAuthenticated } = useContext(AuthContext);
  
  
  const fetchProjetoById = async (projectId: string) => {
    try {
      const response = await links.getProject(projectId);
      console.log("Dados recebidos da API:", response.data);
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const localDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
    return localDate.toLocaleDateString('pt-BR');
  };

  if (error) {
    return (
      <div id="fundo">
        <div className="background2">
          <h1>
            <img src="/static/img/logo.svg" alt="" />
            Portal da Transparência
          </h1>
        </div>
        <div className="title">
          <h2>Erro</h2>
          <p>{error}</p>
          <button onClick={() => navigate("/")}>Voltar</button>
        </div>
      </div>
    );
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
    <div id="fundo">
      <Header />
      <div className="title">
        <h2>Detalhes do Projeto</h2>
        <button  className="botao-voltar" onClick={handleBackButtonClick}>
        <FontAwesomeIcon icon={faChevronCircleLeft} />
        Voltar</button>
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
      <div className="MainDadoss">
      <div className="background-projects">
        {activeTab === "Informações do Projeto" && (
          <>
            <div className="campo-projeto">
              <label><strong>Referência:</strong></label>
              <span>{projectData?.projectReference || "Referência não disponível"}</span>
            </div>
            <div className="campo-projeto">
              <label><strong>Empresa:</strong></label>
              <span>{projectData?.projectCompany || "Empresa não disponível"}</span>
            </div>
            <div className="campo-projeto">
              <label><strong>Objeto:</strong></label>
              <span>{projectData?.projectObjective || "Objeto não disponível"}</span>
            </div>
            <div className="campo-projeto">
              <label><strong>Coordenador:</strong></label>
              <span>{projectData?.nameCoordinator || "Coordenador não disponível"}</span>
            </div>
            <div className="campo-projeto">
              <label><strong>Valor do Projeto:</strong></label>
              <span>
                {projectData?.projectValue !== undefined
                  ? projectData.projectValue.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })
                  : "Valor não disponível"}
              </span>
            </div>
            <div className="campo-projeto">
              <label><strong>Data de Início:</strong></label>
              <span>
                {projectData?.projectStartDate
                  ? formatDate(projectData.projectStartDate)
                  : "Data de início não disponível"}
              </span>
            </div>
            <div className="campo-projeto">
              <label><strong>Data de Término:</strong></label>
              <span>
                {projectData?.projectEndDate
                  ? formatDate(projectData.projectEndDate)
                  : "Data de término não disponível"}
              </span>
            </div>
            <div className="campo-projeto">
              <label><strong>Descrição:</strong></label>
              <span>{projectData?.projectDescription || "Descrição não disponível"}</span>
            </div>
            <div className="campo-projeto">
              <label><strong>Status:</strong></label>
              <span>{ProjectStatus[projectData?.projectStatus as unknown as keyof typeof ProjectStatus] || "Status não disponível"}</span>
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
      {isAuthenticated && (<button className="buttons" onClick={()=> navigate(`/editar-projeto/${id}`)}>
              <FontAwesomeIcon icon={faEdit} />
              Editar
            </button>)}
      {isAuthenticated && ( <button className="delete-buttons" >
              <FontAwesomeIcon icon={faCancel} /> Deletar Projeto
            </button>)}
      </div>
    </div>
  );
}
