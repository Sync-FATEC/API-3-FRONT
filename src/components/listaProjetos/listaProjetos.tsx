import { useContext, useState, useEffect } from "react";
import { links } from "../../api/api";
import { Projects } from "../../type/projects";
import { errorSwal } from "../swal/errorSwal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import filterDTO from "../../type/filterData";
import "./listaProjetos.css";
import { AuthContext } from "../../contexts/auth/AuthContext"; 
import BlurText from "../blurText/blurText";
import { formatDate } from "../../utils/utils";

interface ProjetosPortalProps {
  filterData: filterDTO | null; // Adicione esta linha para definir o tipo
}

export default function ListarProjetos({ filterData }: ProjetosPortalProps) {
  const [projetos, setProjetos] = useState<Projects[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const projetosPerPage = 15;
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const fetchProjetos = async () => {
      try {
        const response =
          filterData?.keywordFilter == ""
            ? await links.filterProjects(filterData)
            : await links.getFiltered(
                filterData?.keywordFilter || "",
                "",
                "",
                "",
                ""
              );

        if (response.data && response.data.model) {
          const allProjetos = response.data.model;
          setProjetos(allProjetos);
          let total = Math.ceil(allProjetos.length / projetosPerPage);
          if (total == 0) {
            total = 1;
          }
          setTotalPages(total);
          setCurrentPage(1);
        } else {
          errorSwal("Dados de projeto não encontrados.");
        }
      } catch (error) {
        errorSwal(String(error));
      }
    };

    fetchProjetos();
  }, [filterData]);

  const indexOfLastProjeto = currentPage * projetosPerPage;
  const indexOfFirstProjeto = indexOfLastProjeto - projetosPerPage;
  const currentProjetos = projetos.slice(
    indexOfFirstProjeto,
    indexOfLastProjeto
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleProjetoClick = (projeto: Projects) => {
    navigate(`/detalhe/${projeto.projectId}`, { state: projeto });
  };

  return (
    <div id={isAuthenticated ? "main-conteiner-auth" : "MainDados"}>
        <h2>Projetos</h2>
        <div className="background-projects">
            <div className="Referencias">
                <p>Referência do projeto</p>
                <p>Início</p>
                <p>Término</p>
                <p>Coordenador</p>
                <p>Empresa</p>
                <p>Valor</p>
                <p>Visualizar</p>
            </div>
            {currentProjetos.map((projeto) => (
                <div className="Projetos Projetos_Responsivo" key={projeto.projectId}>
                    <p> <label className="Referencias_Responsivo">Referência do projeto: </label>{projeto.projectReference ? projeto.projectReference : <BlurText/>} </p>
                    <p> <label className="Referencias_Responsivo">Início: </label>{formatDate(projeto.projectStartDate) ? formatDate(projeto.projectStartDate) : <BlurText/>}</p>
                    <p> <label className="Referencias_Responsivo">Término: </label>{formatDate(projeto.projectEndDate) ? formatDate(projeto.projectEndDate) : <BlurText/>}</p>
                    <p> <label className="Referencias_Responsivo">Coordenador: </label>{projeto.nameCoordinator ? projeto.nameCoordinator : <BlurText/>}</p>
                    <p> <label className="Referencias_Responsivo">Empresa: </label>{projeto.projectCompany ? projeto.projectCompany : <BlurText/>}</p>
                    <p> <label className="Referencias_Responsivo">Valor: </label>{projeto.projectValue ? 
                    projeto.projectValue.toLocaleString("pt-BR", {style: "currency",currency: "BRL",}) : <BlurText/>}</p>
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
