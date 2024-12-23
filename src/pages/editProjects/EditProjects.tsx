import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api, { links } from "../../api/api";
import { UpdateProject } from "../../type/updateProject";
import Sidebar from "../../components/sideBar/sideBar";
import { Projects } from "../../type/projects";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../contexts/auth/AuthContext"; 
import { useContext } from "react";
import FormularioEdicaoProjeto from "../../components/formulario/FormularioEdicao";
import documents from "../../type/documents";
import './EditProjects.css';
import { errorSwal } from "../../components/swal/errorSwal";


export default function EditarProjeto() {
  const [enviado, setEnviado] = useState<boolean>(false);
  const [projectData, setProjectData] = useState<UpdateProject | null>(null);
  const [originalData, setOriginalData] = useState<Projects| null>(null);
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
      const response = await links.getDraftEditProject(projectId);
      if (response.data) {
        console.log(response.data.model)
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
    navigate(-1);
  };

  const handleProjetoSubmit = async (
    projeto: UpdateProject,
    anexosAdicionados: any[],
    anexosRemovidos: documents[]
  ) => {
    try {
      if (id) {
        const response = await links.updateDraftProject(id, projeto); 
        if(projeto.makePublic){
          let response = await links.updateProject(id, projeto);
          if(response.status != 200){
            errorSwal("Erro ao publicar edições")
          }
        }
        if (response.status === 200) {
          if (anexosRemovidos.length >= 1) {
            const idsAnexosRemovidos = anexosRemovidos.map((anexo) => anexo.documentId)
            await links.removeAnexo(idsAnexosRemovidos);
          }
          if(anexosAdicionados.length >= 1){
            const idsAnexosAdd: string[] = [];
            await Promise.all(
            anexosAdicionados.map(async (anexo: any) => {
              if (anexo.file) {
                const newId = await links.AddAnexo(id, anexo.file, anexo.tipo);
                idsAnexosAdd.push(newId.data.documents_id);
              }
            }),
          );
          await links.addAnexoTeste(idsAnexosAdd);
          }
          
        }
        setEnviado(true);
        navigate(-1);
      }
    } catch (error) {
      errorSwal("Erro ao editar projeto");
      console.error("Erro ao editar o projeto:", error);
    }
  };

  return (
  
    <>
      <Sidebar />
      <div className="main-conteiner-auth">
     

      <div className="admin_center-header">
        <div>
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
   
    </>
  );
}
