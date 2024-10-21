import './addProjects.css';
import { useState, useRef } from "react";
import Sidebar from '../sideBar/sideBar';
import api, { links } from "../../api/api";
import { errorSwal } from "../swal/errorSwal";
import { successSwal } from "../swal/sucessSwal";
import AddAnexo from '../addAnexo/addAnexos';
import createProject from "../../type/createProject";

export default function AddProjetos() {
  const [anexos, setAnexos] = useState<{ file: File | null; tipo: string }[]>([]);
  const [projectId, setProjectId] = useState<string>("");
  const [referencia, setReferencia] = useState<string>("");
  const [empresa, setEmpresa] = useState<string>("");
  const [coordenador, setCoordenador] = useState<string>("");
  const [valor, setValor] = useState<string>("");
  const [dataInicio, setDataInicio] = useState<string>("");
  const [dataTermino, setDataTermino] = useState<string>("");
  const [objeto, setObjeto] = useState<string>("");
  const [descricao, setDescricao] = useState<string>("");
  const [classificacao, setClassificacao] = useState<string>("");
  const [enviado, setEnviado] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);
  }

  const formRef = useRef<HTMLDivElement>(null);
  const [addAnexoComponents, setAddAnexoComponents] = useState<number[]>([]);

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

    if (!validateValor(valor)) {
      errorSwal("Valor do projeto inválido. Certifique-se de que não é negativo e não contém símbolos.");
      return;
    }

    if (!referencia || !empresa || !coordenador || !valor || !dataInicio || !dataTermino || !objeto || !descricao || !classificacao) {
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
        nameCoordinator: coordenador,
        projectCompany: empresa,
        projectObjective: objeto,
        projectDescription: descricao,
        projectValue: Number(valor),
        projectStartDate: new Date(dataInicio),
        projectEndDate: new Date(dataTermino),
        projectClassification: classificacao,
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
    setEmpresa("");
    setCoordenador("");
    setValor("");
    setDataInicio("");
    setDataTermino("");
    setObjeto("");
    setDescricao("");
    setClassificacao("");
    setAnexos([]);
    setAddAnexoComponents([]);
  };

  const handleAddAnexoComponent = () => {
    setAddAnexoComponents((prev) => [...prev, prev.length]);
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
        <div ref={formRef} className="">

          <form className="background-projects" onSubmit={handleSubmitProjeto}>
            <div>
              <div className="campo-projeto">
                <label className="">Referência do projeto</label>
                <input
                  type="text"
                  className="input"
                  placeholder=" "
                  value={referencia}
                  onChange={(e) => setReferencia(e.target.value)}
                />

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

              </div>

              <div className="campo-projeto">
                <label className="placeholder">Coordenador</label>
                <input
                  type="text"
                  className="input"
                  placeholder=" "
                  value={coordenador}
                  onChange={(e) => setCoordenador(e.target.value)}
                />

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

              </div>

              <div className="campo-projeto">
                <label className="placeholder">Data de início</label>
                <input
                  type="date"
                  className="input"
                  value={dataInicio}
                  onChange={(e) => setDataInicio(e.target.value)}
                />

              </div>
              <div className="campo-projeto">
                <label className="placeholder">Data de término</label>
                <input
                  type="date"
                  className="input"
                  value={dataTermino}
                  onChange={(e) => setDataTermino(e.target.value)}
                />

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
                  <option value="OUTROS">AS, OF, PC e/ou outros</option>
                  <option value="CONTRATOS">Contrato</option>
                  <option value="CONVENIO">Convênio</option>
                  <option value="PATROCINIO">Patrocínio</option>
                  <option value="TERMO_DE_COOPERACAO">Termo de cooperação</option>
                  <option value="TERMO_DE_OUTORGA">Termo de outorga</option>
                </select>
              </div>
              <div className="campo-projeto">
                <button type="submit">Cadastrar</button>
              </div>


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

                    <button type="button" className="adicionar-btn" onClick={handleAddAnexoComponent}>
                      Adicionar anexo
                    </button>

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