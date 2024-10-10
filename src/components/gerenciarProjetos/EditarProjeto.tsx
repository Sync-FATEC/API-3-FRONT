import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api, { links } from "../../api/api";
import { UpdateProject } from "../../type/updateProject";
import Sidebar from "../sideBar/static";
import { Projetos } from "../../type/projeto";
import '../addProjetos/';
import './styles.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../contexts/auth/AuthContext"; 
import { useContext } from "react";
import FormularioEdicaoProjeto from "./formulario/FormularioEdicao";
import documents from "../../type/documents";


export default function EditarProjeto() {
  const [enviado, setEnviado] = useState<boolean>(false);
  const [projectData, setProjectData] = useState<UpdateProject | null>(null);
  const [originalData, setOriginalData] = useState<Projetos| null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (id) {
      fetchProjetoById(id);
    }
  }, [id]);

  const fetchProjetoById = async (projectId: string) => {
    try {
      const response = await links.getProject(projectId);
      if (response.data) {
        setOriginalData(response.data.model);
      } else {
        setError("Projeto não encontrado.");
      }
    } catch (error) {
      setError("Erro ao buscar dados do projeto.");
      console.error("Erro ao buscar projeto:", error);
    }
  };
  const handleBackButtonClick = () => {
    navigate(isAuthenticated ? "/gerenciarProjetos" : "/");
  };

  const handleProjetoSubmit = async (
    projeto: UpdateProject,
    anexosAdicionados: any[],
    anexosRemovidos: documents[]
  ) => {
    try {
      if (id) {
        const response = await links.updateProject(id, projeto)
        if (response.status === 200) {
          if (anexosRemovidos.length >= 1) {
            const idsAnexosRemovidos = anexosRemovidos.map((anexo) => anexo.documentId)
            await links.removeAnexo(idsAnexosRemovidos);
          }
          if(anexosAdicionados.length >= 1){
            await Promise.all(
            anexosAdicionados.map(async (anexo: any) => {
              if (anexo.file) {
                await links.AddAnexo(id, anexo.file, anexo.tipo);
              }
            })
          );
          }
          
        }
        setEnviado(true);
        navigate('/gerenciarprojetos')
      }
    } catch (error) {
      console.error("Erro ao editar o projeto:", error);
    }
  };

  return (
  
    <div>
      <Sidebar />
      <div className="admin_center-header">
        <div className="title">
        <h1>Editar Projeto</h1>
        <button className="botao-voltar" onClick={handleBackButtonClick}>
          <FontAwesomeIcon icon={faChevronCircleLeft} />
          Voltar
        </button>
        </div>
        <div className="user">
          <img src="/static/img/user.svg" alt="logo" />
          <p>Admin</p>
        </div>
      </div>
      {error && <p>{error}</p>}
      <FormularioEdicaoProjeto
        onSubmit={handleProjetoSubmit} 
        initialData={originalData} 
      />
      {enviado && <p>Projeto editado com sucesso!</p>}
    </div>
  );
}
