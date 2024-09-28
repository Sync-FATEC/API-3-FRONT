import { useState, useEffect } from "react";
import api, { links } from "../../api/api";
import { Projetos } from "../../type/projeto";
import { errorSwal } from "../swal/errorSwal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function ProjetosPortal() {
  const [projetos, setProjetos] = useState<Projetos[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const projetosPerPage = 15;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjetos = async () => {
      try {
        const response = await links.getAllProjects();
        if (response.data && response.data.model) {
          const allProjetos = response.data.model;
          setProjetos(allProjetos);
          const total = Math.ceil(allProjetos.length / projetosPerPage);
          setTotalPages(total);
        } else {
          errorSwal("Dados de projeto não encontrados.");
        }
      } catch (error) {
        errorSwal(String(error));
      }
    };

    fetchProjetos();
  }, []);

  const indexOfLastProjeto = currentPage * projetosPerPage;
  const indexOfFirstProjeto = indexOfLastProjeto - projetosPerPage;
  const currentProjetos = projetos.slice(indexOfFirstProjeto, indexOfLastProjeto);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleProjetoClick = (projeto: Projetos) => {
    if (isLoggedIn) {
      navigate(`/detalhes/${projeto.projectId}`, { state: projeto });
    } else {
      navigate(`/detalhe/${projeto.projectId}`, { state: projeto });
    }
  };
  
  return (
    <div className='MainDados'>
      <h2>Projetos</h2>
      <div className="background-projects">
        <div className="Referencias">
          <p>Referência do projeto</p>
          <p>Início</p>
          <p>Término</p>
          <p>Coordenador</p>
          <p>Valor</p>
          <p>Visualizar</p>
        </div>
        {currentProjetos.map((projeto) => (
          <div className="Projetos" key={projeto.projectId}>
            <p>{projeto.projectReference}</p>
            <p>{new Date(projeto.projectStartDate).toLocaleDateString('pt-BR')}</p>
            <p>{new Date(projeto.projectEndDate).toLocaleDateString('pt-BR')}</p>
            <p>{projeto.nameCoordinator}</p>
            <p>{projeto.projectValue}</p>
            
            <img
              src="/static/img/pesquisar.svg"
              alt="Visualizar detalhes do projeto"
              onClick={() => handleProjetoClick(projeto)} 
              style={{ cursor: "pointer", transition: "transform 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
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
      </div>
    </div>
  );
}