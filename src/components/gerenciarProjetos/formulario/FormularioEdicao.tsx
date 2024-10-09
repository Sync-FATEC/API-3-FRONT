import { useState, useRef, useEffect } from "react";
import "../styles.css";
import AddAnexo from "../../addAnexo";
import documents from "../../../type/documents";
import { Projetos } from "../../../type/projeto";
import { ProjectStatus } from "../../../enums/ProjectStatus";
import "../styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";


interface ProjetoFormProps {
  onSubmit: (projeto: any, anexos: any, anexosRemovidos: any) => void;
  initialData?: Projetos | null
}

export default function ProjetoForm({ onSubmit, initialData }: ProjetoFormProps) {
    const [projeto, setProjeto] = useState<Projetos>({
        projectId: '',
        projectReference: '',
        nameCoordinator: '',
        projectCompany: '',
        projectObjective: '',
        projectDescription: '',
        projectValue: 0,
        projectStartDate: '',
        projectEndDate: '',
        projectClassification: '',
        projectStatus: ProjectStatus.NAO_INICIADOS, 
        documents: [],
        historyProject: [],
      });
  const [anexos, setAnexos] = useState<documents[]>([]);
  const [anexosRemovidos, setAnexosRemovidos] = useState<documents[]>([]);
  const [addAnexoComponents, setAddAnexoComponents] = useState<number[]>([]);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialData && initialData !== null) {
      setProjeto(initialData);
      setAnexos(initialData.documents || []);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProjeto((prev) => ({ ...prev, [name]: value }));
  };
  const handleAddAnexoComponent = () => {
    setAddAnexoComponents((prev) => [...prev, prev.length]);
  };

  const handleAddAnexo = (id: number, anexo: { file: File | null; tipo: string }) => {
    setAnexos((prev) => {
      const updated = prev.map((a, index) => (index === id ? { ...a, ...anexo } : a));
      return updated;
    });
  };
  

  const handleRemoveAnexoComponent = (id: number) => {
    setAddAnexoComponents((prev) => prev.filter((anexoId) => anexoId !== id));
    setAnexosRemovidos((prev) => prev.filter((_, index) => index !== id));
    setAnexos((prevAnexos) => prevAnexos.filter((_, index) => index !== id));
  };


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(projeto, anexos, anexosRemovidos);
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={(e) =>handleChange(e)}
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
                onChange={handleChange}
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
                onChange={handleChange}
              />
              <label className="placeholder">Data de início</label>
            </div>
            <div className="input-placeholder-container">
              <input
                type="date"
                className="input"
                name="dataTermino"
                value={projeto.projectEndDate}
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
              />
              <label className="placeholder">Descrição</label>
            </div>
          </div>
          <div className="classification">
            <select
              name="classificacao"
              id="classificacao"
              value={projeto.projectClassification}
              onChange={handleChange}
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
          <button type="submit">
          <FontAwesomeIcon icon={faEdit}/>Salvar Edição</button>
        </div>
        <div>
          <div className="right-side">
            <div className="addfile">
            {anexos.map((anexo, index) => ( // Fixed map syntax
                <AddAnexo
                  key={anexo.documentId || index} // Use anexo.id if available, otherwise fallback to index
                  id={Number(anexo.documentId) || index}
                  onAddAnexo={handleAddAnexo}
                  handleRemoveAnexoComponent={handleRemoveAnexoComponent}
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
              <button type="button" className="adicionar-btn" onClick={handleAddAnexoComponent}>
                Adicionar anexo
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
