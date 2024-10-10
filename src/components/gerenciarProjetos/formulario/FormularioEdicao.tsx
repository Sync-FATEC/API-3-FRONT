import { useState, useRef, useEffect } from "react";
import "../styles.css";
import AddAnexo from "../../addAnexo";
import documents from "../../../type/documents";
import { Projetos } from "../../../type/projeto";
import { ProjectStatus } from "../../../enums/ProjectStatus";
import "../styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { RemoveAnexos } from "../../removeAnexos/RemoveAnexos";
import { UpdateProject } from "../../../type/updateProject";

interface FormularioEdicaoProjetoProps {
  onSubmit: (projeto: UpdateProject, anexos: any, anexosRemovidos: documents[]) => void;
  initialData?: Projetos | null;
}

export default function FormularioEdicaoProjeto({
  onSubmit,
  initialData,
}: FormularioEdicaoProjetoProps) {
  const [projeto, setProjeto] = useState<Projetos>({
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
  const [novoAnexo, setNovoAnexo] = useState<{ file: File | null; tipo: string }[]>([])
  const [anexosRemovidos, setAnexosRemovidos] = useState<documents[]>([]);
  const [addAnexoComponents, setAddAnexoComponents] = useState<number[]>([]);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialData && initialData !== null) {
      setProjeto(initialData);
     
      setAnexos(initialData.documents || [])
    }
  }, [initialData]);

  //Muda os campos do documento
  const handleChangeSelect = (field: keyof Projetos,
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setProjeto((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleChange = (field:keyof Projetos,novoValor: React.ChangeEvent<HTMLInputElement>)=>{
    setProjeto((prev) => ({...prev, [field]:novoValor.target.value }))
  }

  // Adicionar novo documento
  const handleAddAnexoComponent = () => {
    setAddAnexoComponents((prev) => [...prev, prev.length]);
  }

  const handleAddAnexo = (id: number, anexo: { file: File | null; tipo: string }) => {
    const newAnexos = [...novoAnexo];
    newAnexos[id] = anexo;
    setNovoAnexo(newAnexos);
  };

  const handleRemoveAnexoComponent = (id: number) => {
    setAddAnexoComponents((prev) => prev.filter((anexoId) => anexoId !== id));
    setNovoAnexo((prev) => prev.filter((_, index) => index !== id));
  }

  // Remover documentos existentes
  const handleDeleteDocument = (documento: documents) => {
    setAnexosRemovidos((prev) => [...prev, documento]); 
    setAnexos((prev) => prev.filter((doc) => doc.documentId !== documento.documentId));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
  };

  return (
    <div ref={formRef} className="form-containerAdd">
      <form className="addProjetos" onSubmit={handleSubmit}>
        <div>
          <div className="input-flex-container">
            <div className="input-placeholder-container">
              <input
                type="text"
                className="input"
                name="referencia"
                placeholder=" "
                value={projeto.projectReference}
                onChange={(e) => handleChange("projectReference", e)}
              />
              <label className="placeholder">Referência do projeto</label>
            </div>
            <div className="input-placeholder-container">
              <input
                type="text"
                className="input"
                name="empresa"
                placeholder=" "
                value={projeto.projectCompany}
                onChange={(e) => handleChange("projectCompany", e)}
              />
              <label className="placeholder">Empresa</label>
            </div>
          </div>
          <div className="input-flex-container">
            <div className="input-placeholder-container">
              <input
                type="text"
                className="input"
                name="coordenador"
                placeholder=" "
                value={projeto.nameCoordinator}
                onChange={(e) => handleChange("nameCoordinator", e)}
              />
              <label className="placeholder">Coordenador</label>
            </div>
            <div className="input-placeholder-container">
              <input
                type="number"
                className="input"
                name="valor"
                placeholder=" "
                value={projeto.projectValue}
                onChange={(e) => handleChange("projectValue", e)}
              />
              <label className="placeholder">Valor do projeto</label>
            </div>
          </div>
          <div className="input-flex-container">
            <div className="input-placeholder-container">
              <input
                type="date"
                className="input"
                name="dataInicio"
                value={projeto.projectStartDate}
                onChange={(e) => handleChange("projectStartDate", e)}
              />
              <label className="placeholder">Data de início</label>
            </div>
            <div className="input-placeholder-container">
              <input
                type="date"
                className="input"
                name="dataTermino"
                value={projeto.projectEndDate}
                onChange={(e) => handleChange("projectEndDate", e)}
              />
              <label className="placeholder">Data de término</label>
            </div>
          </div>
          <div className="input-big-container">
            <div className="input-placeholder-container" id="inputBig">
              <input
                type="text"
                className="input"
                name="objeto"
                placeholder=" "
                value={projeto.projectObjective}
                onChange={(e) => handleChange("projectObjective", e)}
              />
              <label className="placeholder">Objeto</label>
            </div>
            <div className="input-placeholder-container" id="inputBig">
              <input
                type="text"
                className="input"
                name="descricao"
                placeholder=" "
                value={projeto.projectDescription}
                onChange={(e) => handleChange("projectDescription", e)}
              />
              <label className="placeholder">Descrição</label>
            </div>
          </div>
          <div className="classification">
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
           <button type="submit">
          <FontAwesomeIcon icon={faEdit} />
          Salvar Edição
        </button>
        </div>
        <div>
          <div className="right-side">
            <div className="addfile">
              {anexos.map((anexo, index) => (
                <RemoveAnexos
                key={index}
                 documento={anexo} 
                 onDeleteDocument={handleDeleteDocument}/>
              ))}
              {addAnexoComponents.map((id) => (
                <AddAnexo
                  key={id}
                  id={id}
                  onAddAnexo={handleAddAnexo}
                  handleRemoveAnexoComponent={handleRemoveAnexoComponent}
                />
              ))}
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
      </form>
    </div>
  );
}
