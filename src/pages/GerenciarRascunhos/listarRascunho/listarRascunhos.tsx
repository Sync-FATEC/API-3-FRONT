import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../../utils/utils";
import "./listarRascunhos.css";
import { links } from "../../../api/api";
import { useEffect, useState } from "react";
import { errorSwal } from "../../../components/swal/errorSwal";
import { Projects } from "../../../type/projects";
import Loading from "../../../components/loading/loading";
import { DraftEditProject } from "../../../type/draftProject";

type ListarRascunhosProps = {
  keywordFilter: string;
};

export default function ListarRascunhos({
  keywordFilter,
}: ListarRascunhosProps) {
  const navigate = useNavigate();
  const [rascunhos, setRascunhos] = useState<Projects[]>([]);
  const [rascunhosDraft, setRascunhosDraft] = useState<DraftEditProject[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDraftProjects = async () => {
    try {
      setIsLoading(true);
      const response = await links.getFiltered(
        keywordFilter,
        "",
        "",
        "",
        "",
        true
      );
      const responseDraft = await links.getDraftsProjects();
      if (response.status === 200) {
        setRascunhos(response.data.model);
        setTotalPages(response.data.totalPages);
      } else {
        errorSwal("Erro ao buscar rascunhos");
      }
      if (responseDraft.status === 200) {
        setRascunhosDraft(responseDraft.data.model);
        console.log(rascunhosDraft);
        
      } else {
        errorSwal("Erro ao buscar rascunhos");
      }
    } catch (error) {
      errorSwal("Erro de conexão ao buscar rascunhos");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    fetchDraftProjects();
  }, [keywordFilter, currentPage]);

  const handleRascunhoClick = (draftId: string) => {
    navigate(`/detalhe/${draftId}`);
  };

  const handleRascunhoDraftClick = (draftId: string) => {
    navigate(`/detalheRascunho/${draftId}`);
  };

  return (
    <div id="main-conteiner-auth">
      <h2>Rascunhos</h2>
      <div className="background-drafts">
        {isLoading ? (
          <div className="loading-message">
            <Loading />
          </div>
        ) : rascunhos.length === 0 ? (
          <div className="no-drafts-message">
            <p>Nenhum rascunho encontrado.</p>
          </div>
        ) : (
          <>
            <div className="ReferenciasRascunho">
              <p>Referência do projeto</p>
              <p>Início</p>
              <p>Coordenador</p>
              <p>Empresa</p>
              <p>Valor</p>
              <p>Visualizar</p>
            </div>
            {Array.isArray(rascunhos) &&
              rascunhos.map((rascunho) => (
                <div
                  className="Projeto projetinho Projetos_Responsivo"
                  key={rascunho.projectId}
                >
                  <p>
                    <label className="Referencias_Responsivo">
                      Referência do rascunho:{" "}
                    </label>
                    {rascunho.projectReference}
                  </p>
                  <p>
                    <label className="Referencias_Responsivo">
                      Data de Criação:{" "}
                    </label>
                    {formatDate(rascunho.projectStartDate)}
                  </p>
                  <p>
                    <label className="Referencias_Responsivo">
                      Coordenador:{" "}
                    </label>
                    {rascunho.nameCoordinator}
                  </p>
                  <p>
                    <label className="Referencias_Responsivo">Empresa: </label>
                    {rascunho.projectCompany}
                  </p>
                  <p>
                    <label className="Referencias_Responsivo">Valor: </label>
                    {rascunho.projectValue
                      ? rascunho.projectValue.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })
                      : "N/A"}
                  </p>
                  <img
                    src="/static/img/pesquisar.svg"
                    alt="Visualizar detalhes do rascunho"
                    onClick={() => handleRascunhoClick(rascunho.projectId)}
                    style={{ cursor: "pointer", transition: "transform 0.2s" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.1)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  />
                </div>
              ))}
            {Array.isArray(rascunhosDraft) &&
              rascunhosDraft.map((draft) => (
                <div
                  className="Projeto projetinho Projetos_Responsivo"
                  key={draft.draftEditProjectId}
                >
                  <p>
                    <label className="Referencias_Responsivo">
                      Referência do rascunho:{" "}
                    </label>
                    {draft.draftEditProjectReference}
                  </p>
                  <p>
                    <label className="Referencias_Responsivo">
                      Data de Criação:{" "}
                    </label>
                    {formatDate(new Date(draft.draftEditProjectStartDate).toISOString())}
                  </p>
                  <p>
                    <label className="Referencias_Responsivo">
                      Coordenador:{" "}
                    </label>
                    {draft.draftEditNameCoordinator}
                  </p>
                  <p>
                    <label className="Referencias_Responsivo">Empresa: </label>
                    {draft.draftEditProjectCompany}
                  </p>
                  <p>
                    <label className="Referencias_Responsivo">Valor: </label>
                    {draft.draftEditProjectValue
                      ? draft.draftEditProjectValue.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })
                      : "N/A"}
                  </p>
                  <img
                    src="/static/img/pesquisar.svg"
                    alt="Visualizar detalhes do rascunho"
                    onClick={() =>
                      handleRascunhoDraftClick(draft.draftEditProjectId)
                    }
                    style={{ cursor: "pointer", transition: "transform 0.2s" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.1)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  />
                </div>
              ))}

            <div className="pagination">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <span>
                Página {currentPage} de {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
