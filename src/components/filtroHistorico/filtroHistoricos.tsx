import { useState } from "react";
import '../filtroPortal/filtroPortal.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface FiltroHistoricosProps {
  onFilterSubmit: (data: { projectStartDate: string | null; projectEndDate: string | null }) => void; 
}

export default function FiltroHistoricos({ onFilterSubmit }: FiltroHistoricosProps) {
  const [textoDataInicio, setTextoDataInicio] = useState<string | null>(null);
  const [textoDataTermino, setTextoDataTermino] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const filterData = {
      projectStartDate: textoDataInicio,
      projectEndDate: textoDataTermino,
    };

    // Envia os dados do filtro
    onFilterSubmit(filterData);
  };

  return (
    <div className="filtro-portal-container">
      <h2>Filtrar por Data</h2>
      <form onSubmit={handleSubmit} className="filter">
        <div className="containerForm">
          <div>
            <label htmlFor="dataInicio">Data de início</label>
            <input 
              type="date" 
              name="dataInicio" 
              id="dataInicio" 
              value={textoDataInicio || ''} 
              onChange={(e) => setTextoDataInicio(e.target.value || null)}
            />
          </div>
          <div>
            <label htmlFor="dataTermino">Data de término</label>
            <input 
              type="date" 
              name="dataTermino" 
              id="dataTermino" 
              value={textoDataTermino || ''} 
              onChange={(e) => setTextoDataTermino(e.target.value || null)}
            />
          </div>
          <div className="divBuscaFiltro">
            <button type="submit" className="busca">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
