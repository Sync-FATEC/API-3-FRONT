import { useEffect, useState } from "react";
import api from "../../api/api";
import './pesquisa.css';

export default function FiltroPortal() {
  const [coordenadores, setCoordenadores] = useState<string[]>([]);
  const [texto, setTexto] = useState('');
  const [exibirDropdown, setExibirDropdown] = useState(true);

  const filtrarOpcoes = coordenadores.filter(opcao =>
    opcao.toLowerCase().includes(texto.toLowerCase())
    );


  useEffect(() => {
    const fetchCoordenadores = async () => {
      try {
        const response = await api.get("projects/list/coordinators");
        setCoordenadores(response.data.model);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCoordenadores();
  }, []);

  return (
    <main className="MainDados">
      <h2>Filtro de dados</h2>
      <form action="" method="post" className="filter">
        <div className="containerForm">
          <div>
            <label htmlFor="referenciaDeDados">Ref. do projeto</label>
            <input
              type="text"
              name="referenciaDeDados"
              id="referenciaDeDados"
            />
          </div>
          <div className="pesquisa-container">
          <label htmlFor="coordenador">Coordenador</label>
            <input
              type="text"
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              onFocus={() => setExibirDropdown(true)}
              onBlur={() => setTimeout(() => setExibirDropdown(false), 200)}
              placeholder="Pesquise..."
            />
            {exibirDropdown && texto && (
              <ul className="dropdown">
                {filtrarOpcoes.map((opcao, index) => (
                  <li key={index} onMouseDown={() => setTexto(opcao)}>
                    {opcao}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <label htmlFor="classificacao">Classificação</label>
            <select name="classficacao" id="classficacao">
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
            <select name="situacaoDoProjeto" id="situacaoDoProjeto">
              <option value=""></option>
              <option value="NAO_INICIADOS">
                Projetos não iniciados
              </option>
              <option value="EM_ANDAMENTO">Projetos em andamento</option>
              <option value="FINALIZADOS">Projetos concluídos</option>
            </select>
          </div>

          <div>
            <label htmlFor="dataInicio">Data de inicio</label>
            <input type="date" name="dataInicio" id="dataInicio" />
          </div>
          <div>
            <label htmlFor="dataTermino">Data de termino</label>
            <input type="date" name="dataTermino" id="dataTermino" />
          </div>
        </div>
        <div>
          <button>Buscar</button>
        </div>
      </form>
    </main>
  );
}
