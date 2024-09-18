import { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import api from "../../api/api";
import { Projetos } from "../../type/projeto";
import "./styles.css"


export default function ProjetoDetalhes() {
  const { id } = useParams<{ id?: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { projeto } = (location.state as { projeto?: Projetos }) || {};
  const [projectData, setProjectData] = useState<Projetos | null>(projeto || null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("Informações do Projeto");

  const fetchProjetoById = async (projectId: string) => {
    try {
      const response = await api.get(`/projects/read/${projectId}`);
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

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
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
        <div className="background2">
          <h1>
            <img src="/static/img/logo.svg" alt="" />
            Portal da Transparência
          </h1>
        </div>
        <div className="title">
          <h2>Carregando...</h2>
        </div>
      </div>
    );
  }

  return (
    <div id="fundo">
      <div className="background2">
        <h1>
          <img src="/static/img/logo.svg" alt="" />
          Portal da Transparência
        </h1>
      </div>
      <div className="title">
        <h2>Detalhes do Projeto</h2>
        <button className="botao-voltar" onClick={() => navigate("/")}>
          Voltar
        </button>
      </div>

      <div className="tabs2">
        {["Informações do Projeto", "Propostas Relacionadas", "Termos", "Artigos"].map((tab) => (
          <button
            key={tab}
            className={`tab2 ${activeTab === tab ? "active" : ""}`}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="detalhes-projeto">
        {activeTab === "Informações do Projeto" && (
          <div>
            <div className="campo-projeto">
              <label><strong>Referência:</strong></label>
              <span>{projectData?.projectReference || "Referência não disponível"}</span>
            </div>
            <div className="campo-projeto">
              <label><strong>Entidade:</strong></label>
              <span>{projectData?.projectCompany || "Entidade não disponível"}</span>
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
                  ? new Date(projectData.projectStartDate).toLocaleDateString('pt-BR')
                  : "Data de início não disponível"}
              </span>
            </div>
            <div className="campo-projeto">
              <label><strong>Data de Término:</strong></label>
              <span>
                {projectData?.projectEndDate
                  ? new Date(projectData.projectEndDate).toLocaleDateString('pt-BR')
                  : "Data de término não disponível"}
              </span>
            </div>
            <div className="campo-projeto">
              <label><strong>Descrição:</strong></label>
              <span>{projectData?.projectDescription || "Descrição não disponível"}</span>
            </div>
          </div>
        )}

        {activeTab === "Propostas Relacionadas" && (
          <div>
            {/* Conteúdo para Propostas Relacionadas */}
          </div>
        )}
        {activeTab === "Termos" && (
          <div>
            {/* Conteúdo para Termos */}
          </div>
        )}
        {activeTab === "Artigos" && (
          <div>
            {/* Conteúdo para Artigos */}
          </div>
        )}
      </div>
    </div>
  );
}
