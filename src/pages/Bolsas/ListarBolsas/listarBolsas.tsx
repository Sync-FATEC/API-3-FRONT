import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./listarBolsas.css";

export default function ListarBolsas() {
  const navigate = useNavigate();

  const bolsas = [
    {
      id: 1,
      tipo: "Mestrado",
      duracao: "6 meses",
      atuacao: "Engenharia",
    },
    {
        id: 2,
        tipo: "Iniciação Cientifica",
        duracao: "1 ano",
        atuacao: "Computação",
      },
  ];

  const handleBolsistaClick = (id: number) => {
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
        {bolsas.map((bolsa) => (
          <div className="Bolsas Bolsas_Responsivo" key={bolsa.id}>
            <p>
              <label className="Referencias_Responsivo">Tipo de Bolsa: </label>
              {bolsa.tipo}
            </p>            
            <p>
              <label className="Referencias_Responsivo">Duração: </label>
              {bolsa.duracao}
            </p>
            <p>
              <label className="Referencias_Responsivo">Atuação: </label>
              {bolsa.atuacao}
            </p>
            <img
              src="/static/img/pesquisar.svg"
              alt="Visualizar bolsas"
              onClick={() => handleBolsistaClick(bolsa.id)}
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
