import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Grant } from "../../../type/grant";
import { links } from "../../../api/api";
import "./listarBolsas.css";

type ListarBolsasProps = {
  keywordFilter: string; // Nova prop para receber o filtro do componente pai
};

export default function ListarBolsas({ keywordFilter }: ListarBolsasProps) {
  const [grant, setGrant] = useState<Grant[]>([]);
  const [filteredGrant, setFilteredGrant] = useState<Grant[]>([]);
  const navigate = useNavigate();

  const fetchGrant = async () => {
    try {
      const response = await links.getAllGrants();
      setGrant(response.data);
      setFilteredGrant(response.data); // Inicializa a lista filtrada com todas as bolsas
    } catch (error) {
      console.error("Erro ao buscar bolsas:", error);
    }
  };

  useEffect(() => {
    fetchGrant();
  }, []);

  useEffect(() => {
    const filtered = grant.filter((item) =>
      Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(keywordFilter.toLowerCase())
    );
    setFilteredGrant(filtered);
  }, [keywordFilter, grant]);

  const handleGrantClick = (id: string) => {
    navigate(`/detalhesBolsas/${id}`);
  };

  return (
    <div id="main-container-bolsas">
      <h2>Bolsas</h2>
      <div className="background-projects">
        <div className="BolsasReferencias">
          <p>Tipo de Bolsa</p>
          <p>Duração</p>
          <p>Atuação</p>
          <p>Visualizar</p>
        </div>
        {filteredGrant.length > 0 ? (
          filteredGrant.map((grant) => (
            <div className="Bolsas Bolsas_Responsivo" key={grant.id}>
              <p>
                <label className="BolsasReferencias_Responsivo">Tipo de Bolsa: </label>
                {grant.type}
              </p>
              <p>
                <label className="BolsasReferencias_Responsivo">Duração: </label>
                {grant.duration}
              </p>
              <p>
                <label className="BolsasReferencias_Responsivo">Atuação: </label>
                {grant.acting}
              </p>
              <img
                src="/static/img/pesquisar.svg"
                alt="Visualizar bolsas"
                onClick={() => handleGrantClick(grant.id)}
                style={{ cursor: "pointer", transition: "transform 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              />
            </div>
          ))
        ) : (
          <p>Nenhuma bolsa encontrada.</p>
        )}
        <div className="pagination">
          <button disabled>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <span>Página 1 de 1</span>
          <button disabled>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>
    </div>
  );
}
