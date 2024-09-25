import { useState, useRef } from "react";
import "../styles.css";
import api from "../../../api/api";
import { errorSwal } from "../../swal/errorSwal";
import { successSwal } from "../../swal/sucessSwal";
import AddAnexo from "../../addAnexo";

export default function Projeto() {
  const [quantidadeAnexos, setQuantidade] = useState<number[]>([0]);
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
        setReferencia("");
        setEmpresa("");
        setCoordenador("");
        setValor("");
        setDataInicio("");
        setDataTermino("");
        setObjeto("");
        setDescricao("");
        setClassificacao("");
        setQuantidade([0]);

        formRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    } catch (error) {
      errorSwal("Erro ao cadastrar projeto");
    }
  };

  const handleAddAnexo = () => {
    setQuantidade([...quantidadeAnexos, quantidadeAnexos.length]);
  };

  return (
    <div ref={formRef} className="form-container">
      <form action="submit" className="addProjetos" onSubmit={handleSubmitProjeto}>
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
              placeholder=" "
              value={dataInicio}
              onChange={(e) => setDataInicio(e.target.value)}
            />
            <label className="placeholder">Data de início</label>
          </div>
          <div className="input-placeholder-container">
            <input
              type="date"
              className="input"
              placeholder=" "
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
              id="inputBig"
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
              {quantidadeAnexos.map((n) => (
                <AddAnexo key={n} projectId={projectId} triggerUpdate={handleAddAnexo} />
              ))}
              <button type="button" onClick={handleAddAnexo}>Adicionar anexo</button>
            </div>
          </div>
          <button type="submit">Cadastrar</button>
        </div>
      </form>
    </div>
  );
}
