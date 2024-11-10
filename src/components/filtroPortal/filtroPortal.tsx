import {useContext, useEffect, useState } from "react";
import api, { links } from "../../api/api";
import './filtroPortal.css';
import filterDTO from "../../type/filterData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faSearch } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../contexts/auth/AuthContext"; 

interface FiltroPortalProps {
  onFilterSubmit: (data: filterDTO) => void; 
}

export default function FiltroPortal({ onFilterSubmit }: FiltroPortalProps) {
  const [coordenadores, setCoordenadores] = useState<string[]>([]);
  const [empresas, setEmpresas] = useState<string[]>([]);
  const [textoReferencia, setTextoReferencia] = useState('');
  const [textoEmpresas, setTextoEmpresas] = useState('');
  const [textoCoordenadores, setTextoCoordenadores] = useState('');
  const [textoClassificacao, setTextoClassificacao] = useState('');
  const [textoSituacao, setTextoSituacao] = useState('');
  const [textoDataInicio, setTextoDataInicio] = useState<string | null>(null);
  const [textoDataTermino, setTextoDataTermino] = useState<string | null>(null);
  const [exibirDropdownEmpresas, setExibirDropdownEmpresas] = useState(false);
  const [exibirDropdownCoordenadores, setExibirDropdownCoordenadores] = useState(false);
  const [keywordFilter, setKeywordFilter] = useState<string>("");
  const [withFilter, setWithFilter] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);

  const filtrarOpcoesEmpresas = empresas.filter(opcao =>
    opcao.toLowerCase().includes(textoEmpresas.toLowerCase())
  );

  const filtrarOpcoesCoordenadores = coordenadores.filter(opcao =>
    opcao.toLowerCase().includes(textoCoordenadores.toLowerCase())
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeywordFilter(event.target.value);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseCoordinators = await links.getCoordinators();
        const responseCompanies = await links.getCompanies();
        setCoordenadores(responseCoordinators.data.model);
        setEmpresas(responseCompanies.data.model);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleSubmitDados = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const filterData: filterDTO = {
      projectReference: textoReferencia,
      projectCompany: textoEmpresas,
      nameCoordinator: textoCoordenadores,
      projectClassification: textoClassificacao,
      projectStatus: textoSituacao,
      projectStartDate: textoDataInicio,
      projectEndDate: textoDataTermino,
      keywordFilter: '',
    };

    onFilterSubmit(filterData);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const filterData: filterDTO = {
      projectReference: textoReferencia,
      projectCompany: textoEmpresas,
      nameCoordinator: textoCoordenadores,
      projectClassification: textoClassificacao,
      projectStatus: textoSituacao,
      projectStartDate: textoDataInicio,
      projectEndDate: textoDataTermino,
      keywordFilter: keywordFilter,
    };


    onFilterSubmit(filterData);
  };

  if(withFilter) {
  return (
    <div id={isAuthenticated ? "MainDadosAuth" : "MainDados"}>
      <h2>Filtro de dados</h2>
      <form onSubmit={handleSubmitDados} className="filter">
        <div className="containerForm" id="grid-four">
          <div>
            <label htmlFor="referenciaDeDados">Ref. do projeto</label>
            <input
              type="text"
              name="referenciaDeDados"
              id="referenciaDeDados"
              value={textoReferencia}
              onChange={(e) => setTextoReferencia(e.target.value)}
            />
          </div>
          <div className="pesquisa-container">
            <label htmlFor="empresas">Empresas</label>
            <input
              type="text"
              value={textoEmpresas}
              onChange={(e) => setTextoEmpresas(e.target.value)}
              onFocus={() => setExibirDropdownEmpresas(true)}
              onBlur={() => setTimeout(() => setExibirDropdownEmpresas(false), 200)}
              placeholder="Pesquise..."
            />
            {exibirDropdownEmpresas && textoEmpresas && (
              <ul className="dropdown">
                {filtrarOpcoesEmpresas.map((opcao, index) => (
                  <li key={index} onMouseDown={() => setTextoEmpresas(opcao)}>
                    {opcao}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="pesquisa-container">
            <label htmlFor="coordenador">Coordenador</label>
            <input
              type="text"
              value={textoCoordenadores}
              onChange={(e) => setTextoCoordenadores(e.target.value)}
              onFocus={() => setExibirDropdownCoordenadores(true)}
              onBlur={() => setTimeout(() => setExibirDropdownCoordenadores(false), 200)}
              placeholder="Pesquise..."
            />
            {exibirDropdownCoordenadores && textoCoordenadores && (
              <ul className="dropdown">
                {filtrarOpcoesCoordenadores.map((opcao, index) => (
                  <li key={index} onMouseDown={() => setTextoCoordenadores(opcao)}>
                    {opcao}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <label htmlFor="classificacao">Classificação</label>
            <select 
              name="classificacao" 
              id="classificacao" 
              value={textoClassificacao} 
              onChange={(e) => setTextoClassificacao(e.target.value)}
            >
              <option value=""></option>
              <option value="CONTRATOS">Contrato</option>
              <option value="PATROCINIO">Patrocínio</option>
            </select>
          </div>
          <div>
            <label htmlFor="situacaoDoProjeto">Situação do projeto</label>
            <select 
              name="situacaoDoProjeto" 
              id="situacaoDoProjeto" 
              value={textoSituacao} 
              onChange={(e) => setTextoSituacao(e.target.value)}
            >
              <option value=""></option>
              <option value="NAO_INICIADOS">Projetos não iniciados</option>
              <option value="EM_ANDAMENTO">Projetos em andamento</option>
              <option value="FINALIZADOS">Projetos concluídos</option>
            </select>
          </div>
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
            <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
            </button>
            <button className="filtro" onClick={() => setWithFilter(false)}><FontAwesomeIcon icon={faFilter} /></button>
          </div>
        </div>
        <div>
        </div>
      </form>
    </div>
  );
  } else {
    return (
      <div id={isAuthenticated ? "MainDadosAuth" : "MainDados"}>
        <h2>Busca de projetos</h2>
        <form onSubmit={handleSubmit} className="filter formularioPesquisaPalavra">
            <input 
                type="text" 
                value={keywordFilter} 
                onChange={handleInputChange} 
                placeholder="Digite a palavra-chave" 
                className="barraNavegacao"
            />
            <button className="botaoPesquisa" type="submit"><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></button>
            <button className="botaoFiltro" onClick={() => setWithFilter(true)}><FontAwesomeIcon icon={faFilter} /></button>
        </form> 
        </div>
    );
  }
}
