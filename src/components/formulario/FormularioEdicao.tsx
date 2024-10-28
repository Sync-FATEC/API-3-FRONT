import { useState, useRef, useEffect } from "react";
import "../../pages/GerenciarProjetos/gerenciarProjetos.css";
import AddAnexo from "../addAnexo/addAnexos";
import documents from "../../type/documents";
import { Projects } from "../../type/projects";
import { ProjectStatus } from "../../enums/ProjectStatus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { RemoveAnexos } from "../removeAnexos/removeAnexos";
import { UpdateProject } from "../../type/updateProject";
import { errorSwal } from "../swal/errorSwal";

interface FormularioEdicaoProjetoProps {
  onSubmit: (projeto: UpdateProject, anexos: any, anexosRemovidos: documents[]) => void;
  initialData?: Projects | null;
}

export default function FormularioEdicaoProjeto({
  onSubmit,
  initialData,
}: FormularioEdicaoProjetoProps) {
  const [projeto, setProjeto] = useState<Projects>({
    projectId: "",
    projectReference: "",
    nameCoordinator: "",
    projectCompany: "",
    projectObjective: "",
    projectDescription: "",
    projectValue: 0,
    projectStartDate: "",
    projectEndDate: "",
    projectClassification: "",
    projectStatus: ProjectStatus.NAO_INICIADOS,
    documents: [],
    historyProject: [],
  });
  const [anexos, setAnexos] = useState<documents[]>([]);
  const [novoAnexo, setNovoAnexo] = useState<{ file: File | null; tipo: string }[]>([]);
  const [anexosRemovidos, setAnexosRemovidos] = useState<documents[]>([]);
  const [addAnexoComponents, setAddAnexoComponents] = useState<number[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialData && initialData !== null) {
      setProjeto(initialData);
      setAnexos(initialData.documents || []);
    }
  }, [initialData]);

  const handleChangeSelect = (field: keyof Projects, e: React.ChangeEvent<HTMLSelectElement>) => {
    setProjeto((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleChange = (field: keyof Projects, novoValor: React.ChangeEvent<HTMLInputElement>) => {
    setProjeto((prev) => ({ ...prev, [field]: novoValor.target.value }));
  };

  const handleAddAnexoComponent = () => {
    setAddAnexoComponents((prev) => [...prev, prev.length]);
  };

  const handleAddAnexo = (id: number, anexo: { file: File | null; tipo: string }) => {
    const newAnexos = [...novoAnexo];
    newAnexos[id] = anexo;
    setNovoAnexo(newAnexos);
  };

  const handleRemoveAnexoComponent = (id: number) => {
    setAddAnexoComponents((prev) => prev.filter((anexoId) => anexoId !== id));
    setNovoAnexo((prev) => prev.filter((_, index) => index !== id));
  };

  const handleDeleteDocument = (documento: documents) => {
    setAnexosRemovidos((prev) => [...prev, documento]);
    setAnexos((prev) => prev.filter((doc) => doc.documentId !== documento.documentId));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setModalIsOpen(true); // Abre o modal ao submeter
  };

  const confirmSubmit = () => {
    if (projeto.projectStartDate > projeto.projectEndDate) {
      errorSwal("Data de início não pode ser maior que a data de término.");
      return;
    }

    const currentDate = new Date();
    const maxStartDate = new Date(currentDate);
    maxStartDate.setDate(currentDate.getDate() + 7);

    if (new Date(projeto.projectStartDate) > maxStartDate) {
      errorSwal("Data de início não pode ser maior que 7 dias a partir da data atual.");
      return;
    }

    if (isNaN(Date.parse(projeto.projectStartDate)) || isNaN(Date.parse(projeto.projectEndDate))) {
      errorSwal("Data inválida.");
      return;
    }

    const updateProject: UpdateProject = {
      projectReference: projeto.projectReference,
      nameCoordinator: projeto.nameCoordinator,
      projectCompany: projeto.projectCompany,
      projectObjective: projeto.projectObjective,
      projectDescription: projeto.projectDescription,
      projectValue: projeto.projectValue,
      projectStartDate: projeto.projectStartDate,
      projectEndDate: projeto.projectEndDate,
      projectClassification: projeto.projectClassification,
      projectStatus: projeto.projectStatus,
    };

    onSubmit(updateProject, novoAnexo, anexosRemovidos);
    setModalIsOpen(false); // Fecha o modal após enviar
  };

  const handleCancel = () => {
    setModalIsOpen(false); // Fecha o modal sem fazer alterações
  };

  return (
    <div ref={formRef} className="">
      <form className="background-projects" onSubmit={handleSubmit}>
        <div>

          <div className="campo-projeto">
            <label className="placeholder">Referência do projeto</label>

            <input
              type="text"
              className="input"
              name="referencia"
              placeholder=" "
              value={projeto.projectReference}
              onChange={(e) => handleChange("projectReference", e)}
            />
          </div>
          <div className="campo-projeto">
            <label className="placeholder">Empresa</label>
            <input
              type="text"
              className="input"
              name="empresa"
              placeholder=" "
              value={projeto.projectCompany}
              onChange={(e) => handleChange("projectCompany", e)}
            />

          </div>


          <div className="campo-projeto">
            <label className="placeholder">Coordenador</label>
            <input
              type="text"
              className="input"
              name="coordenador"
              placeholder=" "
              value={projeto.nameCoordinator}
              onChange={(e) => handleChange("nameCoordinator", e)}
            />

          </div>
          <div className="campo-projeto">
            <label className="placeholder">Valor do projeto</label>
            <input
              type="number"
              className="input"
              name="valor"
              placeholder=" "
              value={projeto.projectValue}
              onChange={(e) => handleChange("projectValue", e)}
            />

          </div>


          <div className="campo-projeto">
            <label className="placeholder">Data de início</label>
            <input
              type="date"
              className="input"
              name="dataInicio"
              value={projeto.projectStartDate}
              onChange={(e) => handleChange("projectStartDate", e)}
            />

          </div>
          <div className="campo-projeto">
            <label className="placeholder">Data de término</label>
            <input
              type="date"
              className="input"
              name="dataTermino"
              value={projeto.projectEndDate}
              onChange={(e) => handleChange("projectEndDate", e)}
            />
          </div>

          <div className="campo-projeto">
            <label className="placeholder">Objeto</label>
            <input
              type="text"
              className="input"
              name="objeto"
              placeholder=" "
              value={projeto.projectObjective}
              onChange={(e) => handleChange("projectObjective", e)}
              maxLength={2500}
            />

          </div>
          <div className="campo-projeto">
            <label className="placeholder">Descrição</label>
            <input
              type="text"
              className="input"
              name="descricao"
              placeholder=" "
              value={projeto.projectDescription}
              onChange={(e) => handleChange("projectDescription", e)}
              maxLength={2500}
            />
          </div>

          <div className="campo-projeto">
            <label className="placeholder">Classificação</label>
            <select
              name="classificacao"
              id="classificacao"
              value={projeto.projectClassification}
              onChange={(e) => handleChangeSelect("projectClassification", e)}
            >
              <option value="" disabled>
                Classificação
              </option>
              <option value="OUTROS">AS, OF, PC e/ou outros</option>
              <option value="CONTRATOS">Contrato</option>
              <option value="CONVENIO">Convênio</option>
              <option value="PATROCINIO">Patrocínio</option>
              <option value="TERMO_DE_COOPERACAO">Termo de cooperação</option>
              <option value="TERMO_DE_OUTORGA">Termo de outorga</option>
            </select>
          </div>
          <div className="campo-projeto">
            <button id="button-editar" type="submit">
              <FontAwesomeIcon icon={faEdit} />
              Salvar Edição
            </button> 
            </div>
        </div>
        <div>
          <div className="right-side">
            <div className="addfile">
              {anexos.map((anexo, index) => (
                <RemoveAnexos
                  key={index}
                  documento={anexo}
                  onDeleteDocument={handleDeleteDocument}
                />
              ))}
              {addAnexoComponents.map((id) => (
                <AddAnexo
                  key={id}
                  id={id}
                  onAddAnexo={handleAddAnexo}
                  handleRemoveAnexoComponent={handleRemoveAnexoComponent}
                />
              ))}
              <div className="add-anexo">

             
              <button
                type="button"
                className="adicionar-btn"
                onClick={handleAddAnexoComponent}
              >
                Adicionar anexo
              </button>
               </div>
            </div>
          </div>
        </div>
      </form>

      {modalIsOpen && (
        <div className="modal">
          <div className="modal-content">
            <h1>Você tem certeza que deseja salvar as alterações?</h1>
            <div className="modal-button">
              <button className="buttons" onClick={confirmSubmit}>Sim</button>
              <button className="delete-buttons" onClick={handleCancel}>Não</button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
