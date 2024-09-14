import { useState, useEffect } from "react";
import api from "../../api/api";
import { Projetos } from "../../type/projeto";
import { errorSwal } from "../swal/errorSwal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

export default function ProjetosPortal() {
  const [projetos, setProjetos] = useState<Projetos[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const projetosPerPage = 15;

  useEffect(() => {
    const fetchProjetos = async () => {
      try {
        const response = await api.get('/projects/list');
        const allProjetos = response.data.model;

        setProjetos(allProjetos);
        const total = Math.ceil(allProjetos.length / projetosPerPage);
        setTotalPages(total);
      } catch (error) {
        errorSwal(String(error));
      }
    };

    fetchProjetos();
  }, []);

  const indexOfLastProjeto = currentPage * projetosPerPage;
  const indexOfFirstProjeto = indexOfLastProjeto - projetosPerPage;
  const currentProjetos = projetos.slice(
    indexOfFirstProjeto,
    indexOfLastProjeto
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <main className="MainDados">
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
            <p>{projeto.projectStartDate}</p>
            <p>{projeto.projectEndDate}</p>
            <p>{projeto.nameCoordinator}</p>
            <p>{projeto.projectValue}</p>
            <img src="/static/img/pesquisar.svg" alt="" />
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
    </main>
  );
}
