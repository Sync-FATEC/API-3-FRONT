import './addProjects.css';
import { useState, useRef, useEffect } from "react";
import Sidebar from '../../components/sideBar/sideBar';
import { links } from "../../api/api";
import { errorSwal } from "../../components/swal/errorSwal";
import { successSwal } from "../../components/swal/sucessSwal";
import AddAnexo from '../../components/addAnexo/addAnexos';
import createProject from "../../type/createProject";
import AddPlanoTrabalho from '../../components/addPlanoTrabalho/addPlanoTrabalho';

export default function AddProjects() {
  const [anexos, setAnexos] = useState<{ file: File | null; tipo: string }[]>([]);
  const [projectId, setProjectId] = useState<string>("");
  const [referencia, setReferencia] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [empresa, setEmpresa] = useState<string>("");
  const [coordenador, setCoordenador] = useState<string>("");
  const [textoCoordenadores, setTextoCoordenadores] = useState('');
  const [valor, setValor] = useState<string>("");
  const [dataInicio, setDataInicio] = useState<string>("");
  const [dataTermino, setDataTermino] = useState<string>("");
  const [objeto, setObjeto] = useState<string>("");
  const [descricao, setDescricao] = useState<string>("");
  const [classificacao, setClassificacao] = useState<string>("");
  const [enviado, setEnviado] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [exibirPlanoTrabalho, setExibirPlanoTrabalho] = useState(false);
  const [isDraft, setIsDraft] = useState(true)

  const [referenciaSensivel, setReferenciaSensivel] = useState<boolean>(false);
  const [TitleSensivel, setTitleSensivel] = useState<boolean>(false);
  const [empresaSensivel, setEmpresaSensivel] = useState<boolean>(false);
  const [coordenadorSensivel, setCoordenadorSensivel] = useState<boolean>(false);
  const [valorSensivel, setValorSensivel] = useState<boolean>(false);
  const [dataInicioSensivel, setDataInicioSensivel] = useState<boolean>(false);
  const [dataTerminoSensivel, setDataTerminoSensivel] = useState<boolean>(false);
  const [objetoSensivel, setObjetoSensivel] = useState<boolean>(false);
  const [descricaoSensivel, setDescricaoSensivel] = useState<boolean>(false);
  const [classificacaoSensivel, setClassificacaoSensivel] = useState<boolean>(false);

  const formRef = useRef<HTMLDivElement>(null);
  const [addAnexoComponents, setAddAnexoComponents] = useState<number[]>([]);

  const [exibirDropdownCoordenadores, setExibirDropdownCoordenadores] = useState(false);
  const [listaCoordenadores, setListaCoordenadores] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseCoordinators = await links.getCoordinators();
        setListaCoordenadores(responseCoordinators.data.model);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const filtrarOpcoesCoordenadores = listaCoordenadores.filter(opcao =>
    opcao.toLowerCase().includes(textoCoordenadores.toLowerCase())
  );

  const handleAddAnexo = (id: number, anexo: { file: File | null; tipo: string }) => {
    const newAnexos = [...anexos];
    newAnexos[id] = anexo;
    setAnexos(newAnexos);
  };

  const handleRemoveAnexoComponent = (id: number) => {
    setAddAnexoComponents((prev) => prev.filter((anexoId) => anexoId !== id));
    setAnexos((prevAnexos) => prevAnexos.filter((_, index) => index !== id));
  };

  const validateValor = (value: string): boolean => {
    const numberValue = Number(value);
    return !isNaN(numberValue) && numberValue >= 0 && /^[0-9]*$/.test(value);
  };

  const handleSubmitProjeto = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setTimeout(() => {}, 100)

    if (!validateValor(valor)) {
      errorSwal("Valor do projeto inválido. Certifique-se de que não é negativo e não contém símbolos.");
      return;
    }

    if (!referencia || !title || !empresa || !textoCoordenadores || !valor || !dataInicio || !dataTermino || !objeto || !descricao || !classificacao) {
      errorSwal("Todos os campos devem ser preenchidos.");
      return;
    }

    if (dataInicio > dataTermino) {
      errorSwal("Data de início não pode ser maior que a data de término.");
      return;
    }

    const currentDate = new Date();
    const maxStartDate = new Date(currentDate);
    maxStartDate.setDate(currentDate.getDate() + 7);

    if (new Date(dataInicio) > maxStartDate) {
      errorSwal("Data de início não pode ser maior que 7 dias a partir da data atual.");
      return;
    }

    if (isNaN(Date.parse(dataInicio)) || isNaN(Date.parse(dataTermino))) {
      errorSwal("Data inválida.");
      return;
    }

    try {
      const projeto: createProject = {
        projectReference: referencia,
        projectReferenceSensitive: referenciaSensivel,
        projectTitle: title,
        projectTitleSensitive: TitleSensivel,
        nameCoordinator: textoCoordenadores,
        nameCoordinatorSensitive: coordenadorSensivel,
        projectCompany: empresa,
        projectCompanySensitive: empresaSensivel,
        projectObjective: objeto,
        projectObjectiveSensitive: objetoSensivel,
        projectDescription: descricao,
        projectDescriptionSensitive: descricaoSensivel,
        projectValue: Number(valor),
        projectValueSensitive: valorSensivel,
        projectStartDate: new Date(dataInicio),
        projectStartDateSensitive: dataInicioSensivel,
        projectEndDate: new Date(dataTermino),
        projectEndDateSensitive: dataTerminoSensivel,
        projectClassification: classificacao,
        projectClassificationSensitive: classificacaoSensivel,
        isDraft: isDraft
      };

      const response = await links.createProject(projeto);

      if (response.status === 201) {
        await Promise.all(anexos.map(anexo => {
          if (anexo.file) {
            return links.AddAnexo(response.data.model.projectId, anexo.file, anexo.tipo);
          }
        }));

        successSwal("Projeto cadastrado com sucesso!");
        setProjectId(response.data.model.projectId);
        resetForm();
        setEnviado(true);
        formRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    } catch (error) {
      errorSwal("Erro ao cadastrar projeto");
    }
  };

  const resetForm = () => {
    setReferencia("");
    setTitle("");
    setEmpresa("");
    setCoordenador("");
    setTextoCoordenadores('');
    setValor("");
    setDataInicio("");
    setDataTermino("");
    setObjeto("");
    setDescricao("");
    setClassificacao("");
    setAnexos([]);
    setAddAnexoComponents([]);
    setIsDraft(false)
  };

  const handleAddAnexoComponent = () => {
    setAddAnexoComponents((prev) => [...prev, prev.length]);
  };

  const togglePlanoTrabalho = () => {
    setExibirPlanoTrabalho((prev) => !prev);
  };


  return (
    <>
      <Sidebar />
      <div className='main-conteiner-auth'>
        <div className="admin_center-header">
          <h1>Adicionar Projetos</h1>
          <div className="user">
            <img src="/static/img/user.svg" alt="logo" />
            <p>Admin</p>
          </div>
        </div>
        <div ref={formRef}>
          <form className="background-projects" onSubmit={handleSubmitProjeto}>
            <div>
              <div className="campo-projeto">
                <label className="placeholder">Referência do projeto</label>
                <input
                  type="text"
                  className="input"
                  placeholder=" "
                  value={referencia}
                  onChange={(e) => setReferencia(e.target.value)}
                />
                <label className='checkboxDiv'>
                  <input
                    type="checkbox"
                    checked={referenciaSensivel}
                    onChange={(e) => setReferenciaSensivel(e.target.checked)}
                  />
                  Dado sensível?
                </label>
              </div>
              <div className="campo-projeto">
                <label className="placeholder">Título</label>
                <input
                    type="text"
                    className="input"
                    placeholder=""
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label className='checkboxDiv'>
                  <input
                    type="checkbox"
                    checked={TitleSensivel}
                    onChange={(e) => setTitleSensivel(e.target.checked)}
                  />
                  Dado sensível?
                </label>
            </div>
            
              <div className="campo-projeto">
                <label className="placeholder">Empresa</label>
                <input
                  type="text"
                  className="input"
                  placeholder=" "
                  value={empresa}
                  onChange={(e) => setEmpresa(e.target.value)}
                />
                <label className='checkboxDiv'>
                  <input
                    type="checkbox"
                    checked={empresaSensivel}
                    onChange={(e) => setEmpresaSensivel(e.target.checked)}
                  />
                  Dado sensível?
                </label>
              </div>
              <div className="campo-projeto">
                <div className="pesquisa-container">
                  <label className="placeholder" htmlFor="coordenador">Coordenador</label>
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
                <label className='checkboxDiv'>
                  <input
                    type="checkbox"
                    checked={coordenadorSensivel}
                    onChange={(e) => setCoordenadorSensivel(e.target.checked)}
                  />
                  Dado sensível?
                </label>
              </div>
              <div className="campo-projeto">
                <label className="placeholder">Valor do projeto</label>
                <input
                  type="number"
                  className="input"
                  placeholder=" "
                  value={valor}
                  onChange={(e) => {
                    if (validateValor(e.target.value)) {
                      setValor(e.target.value);
                    }
                  }}
                />
                <label className='checkboxDiv'>
                  <input
                    type="checkbox"
                    checked={valorSensivel}
                    onChange={(e) => setValorSensivel(e.target.checked)}
                  />
                  Dado sensível?
                </label>
              </div>
              <div className="campo-projeto">
                <label className="placeholder">Data de início</label>
                <input
                  type="date"
                  className="input"
                  value={dataInicio}
                  onChange={(e) => setDataInicio(e.target.value)}
                />
                <label className='checkboxDiv'>
                  <input
                    type="checkbox"
                    checked={dataInicioSensivel}
                    onChange={(e) => setDataInicioSensivel(e.target.checked)}
                  />
                  Dado sensível?
                </label>
              </div>
              <div className="campo-projeto">
                <label className="placeholder">Data de término</label>
                <input
                  type="date"
                  className="input"
                  value={dataTermino}
                  onChange={(e) => setDataTermino(e.target.value)}
                />
                <label className='checkboxDiv'>
                  <input
                    type="checkbox"
                    checked={dataTerminoSensivel}
                    onChange={(e) => setDataTerminoSensivel(e.target.checked)}
                  />
                  Dado sensível?
                </label>
              </div>
              <div className="campo-projeto">
                <label className="placeholder">Objeto</label>
                <input
                  type="text"
                  className="input"
                  placeholder=" "
                  value={objeto}
                  onChange={(e) => setObjeto(e.target.value)}
                />
                <label className='checkboxDiv'>
                  <input
                    type="checkbox"
                    checked={objetoSensivel}
                    onChange={(e) => setObjetoSensivel(e.target.checked)}
                  />
                  Dado sensível?
                </label>
              </div>
              <div className="campo-projeto">
                <label className="placeholder">Descrição</label>
                <input
                  type="text"
                  className="input"
                  placeholder=" "
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                />
                <label className='checkboxDiv'>
                  <input
                    type="checkbox"
                    checked={descricaoSensivel}
                    onChange={(e) => setDescricaoSensivel(e.target.checked)}
                  />
                  Dado sensível?
                </label>
              </div>
              <div className="campo-projeto">
                <label className="placeholder">Classificação</label>
                <select
                  name="classificacao"
                  id="classificacao"
                  value={classificacao}
                  onChange={(e) => setClassificacao(e.target.value)}
                >
                  <option value="" disabled>Classificação</option>
                  <option value="CONTRATOS">Contrato</option>
                  <option value="PATROCINIO">Patrocínio</option>
                </select>
                <label className='checkBoxDiv'>
                  <input
                    type="checkbox"
                    checked={classificacaoSensivel}
                    onChange={(e) => setClassificacaoSensivel(e.target.checked)}
                  />
                  Dado sensível?
                </label>
              </div>
              <div>

              </div>
              <div className="campo-projeto">
                <button
                  type="button"
                  className="btn btn-adicionar"
                  onClick={togglePlanoTrabalho}
                >
                  {exibirPlanoTrabalho ? "Fechar" : "Criar Plano de Trabalho"}
                </button>
              </div>
              {exibirPlanoTrabalho && (
                <div className="plano-trabalho">
                  <AddPlanoTrabalho />
                </div>
              )}
            </div>
            <div>
            </div>
            <div>
              <div className="right-side">
                <div className="addfile">
                  {addAnexoComponents.map((id) => (
                    <AddAnexo
                      key={id}
                      id={id}
                      onAddAnexo={handleAddAnexo}
                      handleRemoveAnexoComponent={handleRemoveAnexoComponent}
                    />
                  ))}
                  <div className='add-anexo'>
                    <button className="btn btn-add" type="button" onClick={handleAddAnexoComponent}>
                      Adicionar anexo
                    </button>
                  </div>
                </div>
                <div className='flexButton'>
                    <div className="campo-projeto">
                        <button className="btn btn-cadastrar" type="submit" onClick={() => setIsDraft(false)}>Publicar projeto</button>
                    </div>
                  <div>
                    <div className="campo-projeto">
                      <button className="btn btn-cadastrar" type="submit" onClick={() => setIsDraft(true)}>Salvar rascunho</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}