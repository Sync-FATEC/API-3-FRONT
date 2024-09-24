import { useState } from "react";
import "../styles.css";
import api from "../../../api/api";
import { errorSwal } from "../../swal/errorSwal";
import { successSwal } from "../../swal/sucessSwal";
import AddAnexo from "../../addAnexo";

export default function Projeto() {
  // Crie os states do projeto
  const [quantidadeAnexos, setQuantidade ] = useState<number[]>([0]);
  const [projectId , setProjectId] = useState<string>("");
  const [triggerUpdate, setTriggerUpdate] = useState<() => void>(() => () => {});

  const [referencia, setReferencia] = useState<string>("");
  const [empresa, setEmpresa] = useState<string>("");
  const [coordenador, setCoordenador] = useState<string>("");
  const [valor, setValor] = useState<string>("");
  const [dataInicio, setDataInicio] = useState<string>("");
  const [dataTermino, setDataTermino] = useState<string>("");
  const [objeto, setObjeto] = useState<string>("");
  const [descricao, setDescricao] = useState<string>("");
  const [classificacao, setClassificacao] = useState<string>("");

  const handleSubmitProjeto = async (e: any) => {
    e.preventDefault();

    try {
      let response = await api.post("/projects/create", {
        projectReference: referencia,
        nameCoordinator: coordenador,
        projectCompany: empresa,
        projectObjective: objeto,
        projectDescription: descricao,
        projectValue: Number(valor),
        projectStartDate: new Date(dataInicio),
        projectEndDate: new Date(dataTermino),
        projectClassification: classificacao,
      });

      if (response.status === 200) {
        successSwal("Projeto cadastrado com sucesso!");
        setProjectId(response.data.model.projectId);
        console.log(projectId);
        setTriggerUpdate(() => () => {});
      }
    } catch (error) {
        errorSwal("Erro ao cadastrar projeto");
    }
  };

  const handleAddAnexo = () => {
    setQuantidade([...quantidadeAnexos, quantidadeAnexos.length]);
  }

  return (
    <>
      <form action="submit" className="addProjetos" onSubmit={handleSubmitProjeto}>
        <div className="input-flex-container">
          <div className="input-placeholder-container">
            <input
              type="text"
              className="input"
              placeholder=" "
              onChange={(e) => setReferencia(e.target.value)}
            />
            <label className="placeholder">Referência do projeto</label>
          </div>
          <div className="input-placeholder-container">
            <input
              type="text"
              className="input"
              placeholder=" "
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
              onChange={(e) => setCoordenador(e.target.value)}
            />
            <label className="placeholder">Coordenador</label>
          </div>
          <div className="input-placeholder-container">
            <input
              type="text"
              className="input"
              placeholder=" "
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
              placeholder=" "
              onChange={(e) => setDataInicio(e.target.value)}
            />
            <label className="placeholder">Data de início</label>
          </div>
          <div className="input-placeholder-container">
            <input
              type="date"
              className="input"
              placeholder=" "
              onChange={(e) => setDataTermino(e.target.value)}
            />
            <label className="placeholder">Data de término</label>
          </div>
        </div>
        <div className="input-big-container">
          <div className="input-placeholder-container" id="inputBig">
            <input
              type="text"
              id="inputBig"
              className="input"
              placeholder=" "
              onChange={(e) => setObjeto(e.target.value)}
            />
            <label className="placeholder">Objeto</label>
          </div>
          <div className="input-placeholder-container" id="inputBig">
            <input
              type="text"
              className="input"
              placeholder=" "
              onChange={(e) => setDescricao(e.target.value)}
            />
            <label className="placeholder">Descrição</label>
          </div>
        </div>
        <div>
          <label htmlFor="classificacao">Classificação</label>
          <select name="classificacao" id="classificacao" onChange={(e) => setClassificacao(e.target.value)}>
            <option value=""></option>
            <option value="OUTROS">AS, OF, PC e/ou outros</option>
            <option value="CONTRATOS">Contrato</option>
            <option value="CONVENIO">Convênio</option>
            <option value="PATROCINIO">Patrocínio</option>
            <option value="TERMO_DE_COOPERACAO">Termo de cooperação</option>
            <option value="TERMO_DE_OUTORGA">Termo de outorga</option>
          </select>
        </div>

        <div >
          {quantidadeAnexos.map((n) => <AddAnexo projectId={projectId} triggerUpdate={triggerUpdate}/>)  }
          <button type="button" onClick={handleAddAnexo}>Adicionar anexo</button>
        </div>

        <button type="submit">Cadastrar</button>
      </form>


    </>
  );
}
