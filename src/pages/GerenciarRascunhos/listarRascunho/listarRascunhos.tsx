import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../../utils/utils";
import "./listarRascunhos.css";

export default function ListarRascunhos() {
  const navigate = useNavigate();

  const rascunhos = [
    {
      draftId: 1,
      draftReference: "REF-001",
      creationDate: "2023-10-01",
      author: "João Silva",
      company: "Empresa A",
      value: 1000.0,
    },
    {
      draftId: 2,
      draftReference: "REF-002",
      creationDate: "2023-10-02",
      author: "Maria Souza",
      company: "Empresa B",
      value: 2000.0,
    },
  ];

  const handleRascunhoClick = (draftId: number) => {
    navigate(`/detalheRascunho/${draftId}`);
  };

  return (
    <div id="main-conteiner-auth">
      <h2>Rascunhos</h2>
      <div className="background-drafts">
        <div className="Referencias">
          <p>Referência do rascunho</p>
          <p>Data de Criação</p>
          <p>Autor</p>
          <p>Empresa</p>
          <p>Valor</p>
          <p>Visualizar</p>
        </div>
        {rascunhos.map((rascunho) => (
          <div className="Rascunhos Rascunhos_Responsivo" key={rascunho.draftId}>
            <p>
              <label className="Referencias_Responsivo">Referência do rascunho: </label>
              {rascunho.draftReference}
            </p>
            <p>
              <label className="Referencias_Responsivo">Data de Criação: </label>
              {formatDate(rascunho.creationDate)}
            </p>
            <p>
              <label className="Referencias_Responsivo">Autor: </label>
              {rascunho.author}
            </p>
            <p>
              <label className="Referencias_Responsivo">Empresa: </label>
              {rascunho.company}
            </p>
            <p>
              <label className="Referencias_Responsivo">Valor: </label>
              {rascunho.value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </p>
            <img
              src="/static/img/pesquisar.svg"
              alt="Visualizar detalhes do rascunho"
              onClick={() => handleRascunhoClick(rascunho.draftId)}
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
