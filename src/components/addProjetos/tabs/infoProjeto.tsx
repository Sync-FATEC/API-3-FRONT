import { useState, useRef } from "react";
import "../styles.css";
import api, { links } from "../../../api/api";
import { errorSwal } from "../../swal/errorSwal";
import { successSwal } from "../../swal/sucessSwal";
import AddAnexo from "../../addAnexo";
import createProject from "../../../type/createProject";
import { v4 as uuidv4 } from 'uuid';

export default function Projeto() {
  const [anexos, setAnexos] = useState<{ id: string; file: File | null; tipo: string }[]>([]);
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

  const formRef = useRef<HTMLDivElement>(null);
  const [addAnexoComponents, setAddAnexoComponents] = useState([uuidv4()]);

  const handleAddAnexoComponent = () => {
    setAddAnexoComponents([...addAnexoComponents, uuidv4()]);
  };

  const handleRemoveAnexoComponent = (id: string) => {
    setAddAnexoComponents((prev) => prev.filter((anexoId) => anexoId !== id));
    setAnexos((prevAnexos) => prevAnexos.filter((anexo) => anexo.id !== id));
  };

  const handleAddAnexo = (id: string, anexo: { file: File | null; tipo: string }) => {
    setAnexos((prevAnexos) => {
      const updatedAnexos = prevAnexos.map((a) => (a.id === id ? { ...a, ...anexo } : a));
      return updatedAnexos;
    });
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

    if (anexos.some((anexo) => !anexo.file)) {
      errorSwal("Todos os anexos devem ser preenchidos.");
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
        await Promise.all(
          anexos.map((anexo) => {
            if (anexo.file) {
              return links.AddAnexo(response.data.model.projectId, anexo.file, anexo.tipo);
            }
          })
        );

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
    setAddAnexoComponents([]); // Reseta para não mostrar anexos após o envio
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
          <div className="adicionar-anexos">
            {addAnexoComponents.map((id) => (
              <AddAnexo
                key={id}
                id={id}
                onAddAnexo={handleAddAnexo}
                handleRemoveAnexoComponent={handleRemoveAnexoComponent}
              />
            ))}
            <button type="button" className="adicionar-btn" onClick={handleAddAnexoComponent}>
              Adicionar anexo
            </button>
          </div>
          <div className="form-btn">
            <button type="submit" className="submit-btn">
              Enviar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

