import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CoordinatorType } from "../../type/CoordinatorsType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { errorSwal } from "../swal/errorSwal";
import { links } from "../../api/api";
import './listarCoordenadores.css';
import { formatCPF, formatPhone } from "../../utils/utils";

type ListarCoordenadoresProps = {
    keywordFilter: string;
};

export default function ListarCoordenadores({ keywordFilter }: ListarCoordenadoresProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [coordenadores, setCoordenadores] = useState<CoordinatorType[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const coordenadoresPerPage = 10;
    const navigate = useNavigate();

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const handleCoordenadorClick = (coordenador: CoordinatorType) => {
        navigate(`/coordenador/detalhe/${coordenador.coordinatorId}`, { state: coordenador });
    };

    useEffect(() => {
        const fetchCoordenadores = async () => {
            try {
                const response = await links.getFilteredCoordinators({
                    keyword: keywordFilter
                });

                const coordinatorsData = response.data.model || [];
                setCoordenadores(coordinatorsData);
                const totalPages = Math.ceil(coordinatorsData.length / coordenadoresPerPage);
                setTotalPages(totalPages);
            } catch (error) {
                errorSwal("Erro ao buscar coordenadores!");
            }
        };

        fetchCoordenadores();
    }, [keywordFilter, currentPage]);

    return (
        <div id={"main-conteiner-auth"}>
            <h2>Coordenadores</h2>
            <div className="background-projects">
                <div className="ReferenciasCoordenadores">
                    <p>Nome</p>
                    <p>CPF</p>
                    <p>Telefone</p>
                    <p>Visualizar</p>
                </div>
                {coordenadores.map((coordenador) => (
                    <div className="coordenadores" key={coordenador.coordinatorId}>
                        <p>
                            <label className="Referencias_Responsivo">Nome: </label>
                            {coordenador.coordinatorName}
                        </p>
                        <p>
                            <label className="Referencias_Responsivo">CPF: </label>
                            {formatCPF(coordenador.coordinatorCPF) || "Não disponível"}
                        </p>
                        <p>
                            <label className="Referencias_Responsivo">Telefone: </label>
                            {formatPhone(coordenador.coordinatorTelefone) || "Não disponível"}
                        </p>
                        <img
                            src="/static/img/pesquisar.svg"
                            alt="Visualizar coordenadores"
                            onClick={() => handleCoordenadorClick(coordenador)}
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
