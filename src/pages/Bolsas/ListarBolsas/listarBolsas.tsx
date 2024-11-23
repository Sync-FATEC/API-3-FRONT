import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./listarBolsas.css";
import { useState, useEffect } from "react";
import { Grant } from "../../../type/grant";
import { links } from "../../../api/api";

export default function ListarBolsas() {
  const [grant, setGrant] = useState<Grant[]>([]);
  const navigate = useNavigate();

  const fetchGrant = async () => {
    try {
      const response = await links.getAllGrants();
      setGrant(response.data);
    } catch (error) {
      console.error("Erro ao buscar grants:", error);
    }
  };

  useEffect(() => {
    fetchGrant();
  }, []);

  const handleGrantClick = (id: string) => {
    navigate(`/detalheBolsa/${id}`);
  };

  return (
    <div id="main-container-bolsas">
      <h2>Bolsas</h2>
      <div className="background-projects">
        <div className="Referencias">
          <p>Tipo de Bolsa</p>
          <p>Duração</p>
          <p>Atuação</p>
          <p>Visualizar</p>
        </div>
        {grant.map((grant) => (
          <div className="BolsasReferencias Bolsas_Responsivo" key={grant.id}>
            <p>
              <label className="Referencias_Responsivo">Tipo de Bolsa: </label>
              {grant.type}
            </p>
            <p>
              <label className="Referencias_Responsivo">Duração: </label>
              {grant.duration}
            </p>
            <p>
              <label className="Referencias_Responsivo">Atuação: </label>
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
        ))}
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
