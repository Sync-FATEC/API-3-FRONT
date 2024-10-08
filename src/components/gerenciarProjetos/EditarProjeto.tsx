import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProjetoForm from "./formulario/FormularioEdicao";
import api, { links } from "../../api/api";
import { UpdateProject } from "../../type/updateProject";
import Sidebar from "../sideBar/static";
import { Projetos } from "../../type/projeto";
import '../addProjetos/';
import './styles.css'

export default function EditarProjeto() {
  const [enviado, setEnviado] = useState<boolean>(false);
  const [projectData, setProjectData] = useState<UpdateProject | null>(null);
  const [originalData, setOriginalData] = useState<Projetos| null>(null);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams<{ id?: string }>();

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

  const handleProjetoSubmit = async (
    projeto: UpdateProject,
    anexosAdicionados: any[],
    anexosRemovidos: string[]
  ) => {
    try {
      if (id && projectData) {
        const response = await links.updateProject(id, projeto);
        if (response.status === 200) {
          if (anexosRemovidos) {
            await links.removeAnexo(anexosRemovidos);
          }
          await Promise.all(
            anexosAdicionados.map(async (anexo: any) => {
              if (anexo.file) {
                await links.AddAnexo(id, anexo.file, anexo.tipo);
              }
            })
          );
          setEnviado(true);
        }
      }
    } catch (error) {
      console.error("Erro ao editar o projeto:", error);
    }
  };

  return (
  
    <div>
      <Sidebar />
      <div className="admin_center-header">
        <h1>Adicionar Projetos</h1>
        <div className="user">
          <img src="/static/img/user.svg" alt="logo" />
          <p>Admin</p>
        </div>
      </div>
      {error && <p>{error}</p>}
      <ProjetoForm 
        onSubmit={handleProjetoSubmit} 
        initialData={originalData} 
      />
      {enviado && <p>Projeto editado com sucesso!</p>}
    </div>
  );
}
