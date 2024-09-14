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
              <option value="outros">AS, OF, PC e/ou outros</option>
              <option value="contrato">Contrato</option>
              <option value="convenio">Convênio</option>
              <option value="patrocinio">Patrocínio</option>
              <option value="termoDeCooperacao">Termo de cooperação</option>
              <option value="termoDeOutorga">Termo de outorga</option>
            </select>
          </div>
          <div>
            <label htmlFor="situacaoDoProjeto">Situação do projeto</label>
            <select name="situacaoDoProjeto" id="situacaoDoProjeto">
              <option value=""></option>
              <option value="ProjetosNaoIniciados">
                Projetos não iniciados
              </option>
              <option value="ProjetosEmAndamento">Projetos em andamento</option>
              <option value="ProjetosConcluidos">Projetos concluídos</option>
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
