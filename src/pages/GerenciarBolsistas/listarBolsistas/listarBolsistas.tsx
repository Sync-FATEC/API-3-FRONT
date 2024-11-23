import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./listarBolsistas.css";


export default function ListarBolsistas() {
  const navigate = useNavigate();

  const bolsistas = [
    {
      id: 1,
      nome: "Carlos Almeida",
      cpf: "123.456.789-00",
      rg: "MG-12.345.678",
      email: "carlos.almeida@email.com",
      nacionalidade: "Brasileira",
    },
    {
      id: 2,
      nome: "Ana Paula Souza",
      cpf: "987.654.321-00",
      rg: "SP-98.765.432",
      email: "ana.souza@email.com",
      nacionalidade: "Brasileira",
    },
  ];

  const handleBolsistaClick = (id: number) => {
    navigate(`/detalheBolsista/${id}`);
  };

  return (
    <div id="main-container-bolsistas">
        <h2>Bolsistas</h2>
      <div className="background-projects">
        <div className="ReferenciasBolsistas">
          <p>Nome</p>
          <p>CPF</p>
          <p>RG</p>
          <p>E-mail</p>
          <p>Nacionalidade</p>
          <p>Visualizar</p>
        </div>
        {bolsistas.map((bolsista) => (
          <div className="Bolsistas Bolsistas_Responsivo" key={bolsista.id}>
            <p>
              <label className="ReferenciasBolsistas_Responsivo">Nome: </label>
              {bolsista.nome}
            </p>
            <p>
              <label className="ReferenciasBolsistas_Responsivo">CPF: </label>
              {bolsista.cpf}
            </p>
            <p>
              <label className="ReferenciasBolsistas_Responsivo">RG: </label>
              {bolsista.rg}
            </p>
            <p>
              <label className="ReferenciasBolsistas_Responsivo">E-mail: </label>
              {bolsista.email}
            </p>
            <p>
              <label className="ReferenciasBolsistas_Responsivo">Nacionalidade: </label>
              {bolsista.nacionalidade}
            </p>
            <img
              src="/static/img/pesquisar.svg"
              alt="Visualizar bolsistas"
              onClick={() => handleBolsistaClick(bolsista.id)}
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
