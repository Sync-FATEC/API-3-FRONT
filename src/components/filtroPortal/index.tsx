import { useEffect, useState } from "react";
import api, { links } from "../../api/api";
import './styles.css';
import filterDTO from "../../type/filterDTO";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faSearch } from "@fortawesome/free-solid-svg-icons";

interface FiltroPortalProps {
  onFilterSubmit: (data: filterDTO) => void; // Defina o tipo do parâmetro
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


    console.log(filterData);
    onFilterSubmit(filterData);
  };

  if(withFilter) {
  return (
    <main className="MainDados">
      <h2>Filtro de dados</h2>
      <form onSubmit={handleSubmit} className="filter">
        <div className="containerForm">
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
              <option value="OUTROS">AS, OF, PC e/ou outros</option>
              <option value="CONTRATOS">Contrato</option>
              <option value="CONVENIO">Convênio</option>
              <option value="PATROCINIO">Patrocínio</option>
              <option value="TERMO_DE_COOPERACAO">Termo de cooperação</option>
              <option value="TERMO_DE_OUTORGA">Termo de outorga</option>
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
            <button className="filtro" onClick={() => setWithFilter(false)}><FontAwesomeIcon icon={faFilter} /></button>
            <button type="submit" className="busca">
            <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
            </button>
          </div>
        </div>
        <div>
        </div>
      </form>
    </main>
  );
  } else {
    return (
        <main className="MainDados">
        <h2>Busca de projetos</h2>
        <form onSubmit={handleSubmit} className="filter formularioPesquisaPalavra">
            <input 
                type="text" 
                value={keywordFilter} 
                onChange={handleInputChange} 
                placeholder="Digite a palavra-chave" 
                className="barraNavegacao"
            />
            <button className="botaoFiltro" onClick={() => setWithFilter(true)}><FontAwesomeIcon icon={faFilter} /></button>
            <button className="botaoPesquisa" type="submit"><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></button>
        </form> 
        </main>
    );
  }
}
