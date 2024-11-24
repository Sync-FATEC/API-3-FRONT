import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CoordinatorType } from "../../type/CoordinatorsType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { errorSwal } from "../swal/errorSwal";
import { links } from "../../api/api";
import './listarCompanys.css';
import { formatCNPJ, formatCPF, formatPhone } from "../../utils/utils";
import { CompanyType } from "../../type/CompanyType";

type ListarCompanyProps = {
    keywordFilter: string;
};

export default function ListarCompany({ keywordFilter }: ListarCompanyProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [Company, setCompany] = useState<CompanyType[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const CompanyPerPage = 10;
    const navigate = useNavigate();

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const handleCompanyClick = (Company: CompanyType) => {
        navigate(`/empresa/detalhe/${Company.id}`, { state: Company });
    };

    useEffect(() => {
        const fetchCompany = async () => {
            try {
                const response = await links.getFilteredCompanies({
                    keyword: keywordFilter
                });

                const coordinatorsData = response.data.model || [];
                setCompany(coordinatorsData);
                const totalPages = Math.ceil(coordinatorsData.length / CompanyPerPage);
                setTotalPages(totalPages);
            } catch (error) {
                errorSwal("Erro ao buscar Company!");
            }
        };

        fetchCompany();
    }, [keywordFilter, currentPage]);

    return (
        <div id={"main-conteiner-auth"}>
            <h2>Empresas</h2>
            <div className="background-projects">
                <div className="ReferenciasCompany">
                    <p>Nome</p>
                    <p>CNPJ</p>
                    <p>Telefone</p>
                    <p>Visualizar</p>
                </div>
                {Company.map((Company) => (
                    <div className="Company" key={Company.id}>
                        <p>
                            <label className="Referencias_Responsivo">Nome: </label>
                            {Company.corporateName || "Não disponível"}
                        </p>
                        <p>
                            <label className="Referencias_Responsivo">CNPJ: </label>
                            {formatCNPJ(Company.cnpj) || "Não disponível"}
                        </p>
                        <p>
                            <label className="Referencias_Responsivo">Telefone: </label>
                            {formatPhone(Company.phone) || "Não disponível"}
                        </p>
                        <img
                            src="/static/img/pesquisar.svg"
                            alt="Visualizar Company"
                            onClick={() => handleCompanyClick(Company)}
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
