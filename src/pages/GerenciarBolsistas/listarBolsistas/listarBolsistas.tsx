import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./listarBolsistas.css";
import { useState, useEffect } from "react";
import api, { links } from "../../../api/api";
import { ListScholarshipHolder } from "../../../type/scholarShipHolder";

type ListarBolsistasProps = {
  keywordFilter: string;
};

export default function ListarBolsistas({ keywordFilter }: ListarBolsistasProps) {
  const navigate = useNavigate();
  const [bolsistas, setBolsistas] = useState<ListScholarshipHolder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBolsistas = async () => {
    setLoading(true);
    try {
      const response = await links.getAllScholarShipHolder();
      const bolsistasData = response.data.model || [];
      setBolsistas(bolsistasData);
    } catch (err) {
      console.error("Erro ao buscar bolsistas:", err);
      setError("Não foi possível carregar os bolsistas.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBolsistas();
  }, []);

  const handleBolsistaClick = (id: string) => {
    navigate(`/detalheBolsista/${id}`);
  };

  // Aplicando o filtro nos bolsistas com base no keywordFilter
  const filteredBolsistas = bolsistas.filter((bolsista) => {
    return (
      bolsista.name.toLowerCase().includes(keywordFilter.toLowerCase()) ||
      bolsista.cpf.toLowerCase().includes(keywordFilter.toLowerCase()) ||
      bolsista.rg.toLowerCase().includes(keywordFilter.toLowerCase()) ||
      bolsista.email.toLowerCase().includes(keywordFilter.toLowerCase()) ||
      bolsista.nationality.toLowerCase().includes(keywordFilter.toLowerCase())
    );
  });

  if (loading) {
    return <p>Carregando bolsistas...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

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
        {filteredBolsistas.map((bolsista) => (
          <div className="Bolsistas Bolsistas_Responsivo" key={bolsista.id}>
            <p>
              <label className="ReferenciasBolsistas_Responsivo">Nome: </label>
              {bolsista.name}
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
              {bolsista.nationality}
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
