import { useState, useRef } from "react";
import "../styles.css";
import api, { links } from "../../../api/api";
import { errorSwal } from "../../swal/errorSwal";
import { successSwal } from "../../swal/sucessSwal";
import AddAnexo from "../../addAnexo";
import createProject from "../../../type/createProject";

export default function Projeto() {
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

  const formRef = useRef<HTMLDivElement>(null);
  const [addAnexoComponents, setAddAnexoComponents] = useState<number[]>([0]);

  const handleAddAnexo = (index: number, anexo: { file: File | null; tipo: string }) => {
    const newAnexos = [...anexos];
    newAnexos[index] = anexo;
    setAnexos(newAnexos);
  };

  const handleSubmitProjeto = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
    setAddAnexoComponents([0]);
  };

  const handleAddAnexoComponent = () => {
    setAddAnexoComponents((prev) => [...prev, prev.length]);
  };

  return (
    <div ref={formRef} className="form-container">
      <form className="addProjetos" onSubmit={handleSubmitProjeto}>
        <div className="input-flex-container">
          <div className="input-placeholder-container">
            <input
              type="text"
              className="input"
              placeholder=" "
              value={referencia}
              onChange={(e) => setReferencia(e.target.value)}
            />
            <label className="placeholder">Referência do projeto</label>
          </div>
          <div className="input-placeholder-container">
            <input
              type="text"
              className="input"
              placeholder=" "
              value={empresa}
              onChange={(e) => setEmpresa(e.target.value)}
            />
            <label className="placeholder">Empresa</label>
          </div>
        </div>
        <div className="input-flex-container">
          <div className="input-placeholder-container">
            <input
              type="text"
              className="input"
              placeholder=" "
              value={coordenador}
              onChange={(e) => setCoordenador(e.target.value)}
            />
            <label className="placeholder">Coordenador</label>
          </div>
          <div className="input-placeholder-container">
            <input
              type="text"
              className="input"
              placeholder=" "
              value={valor}
              onChange={(e) => setValor(e.target.value)}
            />
            <label className="placeholder">Valor do projeto</label>
          </div>
        </div>
        <div className="input-flex-container">
          <div className="input-placeholder-container">
            <input
              type="date"
              className="input"
              value={dataInicio}
              onChange={(e) => setDataInicio(e.target.value)}
            />
            <label className="placeholder">Data de início</label>
          </div>
          <div className="input-placeholder-container">
            <input
              type="date"
              className="input"
              value={dataTermino}
              onChange={(e) => setDataTermino(e.target.value)}
            />
            <label className="placeholder">Data de término</label>
          </div>
        </div>
        <div className="input-big-container">
          <div className="input-placeholder-container" id="inputBig">
            <input
              type="text"
              className="input"
              placeholder=" "
              value={objeto}
              onChange={(e) => setObjeto(e.target.value)}
            />
            <label className="placeholder">Objeto</label>
          </div>
          <div className="input-placeholder-container" id="inputBig">
            <input
              type="text"
              className="input"
              placeholder=" "
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
            <label className="placeholder">Descrição</label>
          </div>
        </div>

        <div className="right-side">
          <div className="classification">
            <label htmlFor="classificacao">Classificação</label>
            <select
              name="classificacao"
              id="classificacao"
              value={classificacao}
              onChange={(e) => setClassificacao(e.target.value)}
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
          <div className="cadastrar">
            <div className="addfile">
              {addAnexoComponents.map((_, index) => (
                <AddAnexo key={index} onAddAnexo={(anexo) => handleAddAnexo(index, anexo)} />
              ))}
              <button type="button" onClick={handleAddAnexoComponent}>Adicionar anexo</button>
            </div>
          </div>
          <button type="submit">Cadastrar</button>
        </div>
      </form>
    </div>
  );
}
