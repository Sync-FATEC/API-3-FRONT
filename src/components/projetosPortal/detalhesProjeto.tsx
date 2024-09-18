import { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Projetos } from "../../type/projeto";
import { errorSwal } from "../swal/errorSwal";
import "./styles.css";
import api from "../../api/api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

export default function ProjetoDetalhes() {
  const { id } = useParams<{ id?: string }>(); // Obtém o ID da URL
  const location = useLocation(); // Usado para obter o estado passado via navigate
  const navigate = useNavigate(); // Usado para navegação
  const { projeto } = location.state as { projeto?: Projetos } || {}; // Estado passado pela página anterior
  const [projectData, setProjectData] = useState<Projetos | null>(projeto || null);
  const [error, setError] = useState<string | null>(null);

  // Função para buscar projeto pelo ID caso não tenha sido passado no state
  const fetchProjetoById = async (projectId: string) => {
    try {
      const response = await api.get(`/projects/read/${projectId}`);
      console.log("Dados recebidos da API:", response.data); // Verificar os dados recebidos da API
      if (response.data) {
        setProjectData(response.data.model); // Atualizando o state com os dados do projeto
      } else {
        setError("Projeto não encontrado.");
      }
    } catch (error) {
      console.error("Erro ao buscar dados do projeto:", error);
      setError("Erro ao buscar dados do projeto.");
    }
  };

  // useEffect para buscar o projeto se não tiver sido passado no estado
  useEffect(() => {
    if (id && !projectData) {
      fetchProjetoById(id); // Busca o projeto via API se não houver dados
    }
  }, [id, projectData]);

  // Caso ocorra algum erro, exibe uma mensagem de erro
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
          <button onClick={() => navigate("/")}>
            <FontAwesomeIcon icon={faChevronLeft} style={{ color: "#FFFFF", fontSize: "24px" }} />
            Voltar
          </button>
        </div>
      </div>
    );
  }

  // Se o projeto não estiver disponível, exibe uma mensagem de carregamento
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
        <h2>Detalhes do projeto</h2>
        <button className="botao-voltar" onClick={() => navigate("/")}>
        <FontAwesomeIcon icon={faChevronLeft} style={{ color: "#FFFFF", fontSize: "24px" }} />
          Voltar
        </button>
      </div>

      <div className="detalhes-projeto">
        <div className="campo-projeto">
          <label><strong>Referência:</strong></label>
          <span>{projectData?.projectReference || "Referência não disponível"}</span>
        </div>
        <div className="campo-projeto">
          <label><strong>Empresa:</strong></label>
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
          {/* Verifica se projectValue está definido antes de formatá-lo */}
          <span>{projectData?.projectValue !== undefined
            ? projectData.projectValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
            : "Valor não disponível"}
          </span>
        </div>
        <div className="campo-projeto">
          <label><strong>Data de Início:</strong></label>
          <span>{projectData?.projectStartDate
            ? new Date(projectData.projectStartDate).toLocaleDateString('pt-BR')
            : "Data de início não disponível"}
          </span>
        </div>
        <div className="campo-projeto">
          <label><strong>Data de Término:</strong></label>
          <span>{projectData?.projectEndDate
            ? new Date(projectData.projectEndDate).toLocaleDateString('pt-BR')
            : "Data de término não disponível"}
          </span>
        </div>
        <div className="campo-projeto">
          <label><strong>Descrição:</strong></label>
          <span>{projectData?.projectDescription || "Descrição não disponível"}</span>
        </div>
      </div>
    </div>
  );
}
