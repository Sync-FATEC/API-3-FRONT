import axios from "axios";
import createProject from "../type/createProject";
import AddAnexo from "../components/addAnexo/addAnexos";
import { get } from "http";
import filterDTO from "../type/filterData";
import { Projects } from "../type/projects";
import { UpdateProject } from "../type/updateProject";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

const links = {
  getAllProjects: () => api.get("/projects/getAll"),

  getProject: (id: string) => api.get(`/projects/get/${id}`),

  getCoordinators: () => api.get("/projects/get/coordinators"),

  getCompanies: () => api.get("/projects/get/companies"),

  createProject: (data: createProject) => api.post("/projects/create", data),

  AddAnexo: (projectId: string, file: any, tipoAnexo: string) => {
    const formData = new FormData();
    formData.append("projectId", projectId);
    if (file) {
      formData.append("file", file);
    }
    formData.append("typeFile", tipoAnexo);

    return api.post("/documents/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  removeAnexo: (anexos: string[]) => api.put(`/documents/removed`,anexos),

  addAnexoTeste: (anexos: string[]) => api.put(`/documents/add`,anexos),

  getAnexos: (link: string) => api.get(link, { responseType: "blob" }),

  getExport: (link: string) => api.get(link, { responseType: "blob" }),

  getFiltered: (
    keyword: string,
    dataInicio: string,
    dataFim: string,
    status: string,
    classificacao: string
  ) => {
    return api.get(
      `/projects/getAll?keyword=${keyword}&dataInicio=${dataInicio}&dataFim=${dataFim}&status=${status}&classificacao=${classificacao}`
    );
  },

  filterProjects: (data: filterDTO) => api.get("/projects/filter", { params: data }),

  deleteProjects: (id: string) => api.delete(`/projects/delete/${id}`),

  updateProject: (id: string, data: UpdateProject ) => api.put(`/projects/update/${id}`,data),

  getProectsNearEnd: () => api.get("/projects/get/all/near-end"),
  
  getHistoryChangesProjects: (id: string) => api.get(`/projects/get/history-projects/${id}`),

  getCountStatusCoordinator: (nameCoordinator: string, projectStartDate: string, projectEndDate: string) => 
    api.get("/dashboard/count/status/coordinator", { 
      params: { 
          nameCoordinator, 
          projectStartDate, 
          projectEndDate
      } 
  }),
  
  getCountClassificationCoordinator: (nameCoordinator: string, projectStartDate: string, projectEndDate: string) => 
    api.get("/dashboard/count/classification/coordinator", { 
      params: { 
        nameCoordinator, 
        projectStartDate, 
        projectEndDate
    } 
  }),
  
  getCountMonthCoordinator: (nameCoordinator: string, projectStartDate: string, projectEndDate: string) => 
    api.get("/dashboard/count/month/coordinator", { 
      params: { 
        nameCoordinator, 
        projectStartDate, 
        projectEndDate
    } 
  }),

getCountStatusCompany: (projectCompany: string, projectStartDate: string, projectEndDate: string) => 
  api.get("/dashboard/count/status/company", { 
    params: { 
      projectCompany, 
      projectStartDate, 
      projectEndDate
    } 
  }),

getCountClassificationCompany: (projectCompany: string, projectStartDate: string, projectEndDate: string) => 
  api.get("/dashboard/count/classification/company", { 
    params: { 
      projectCompany, 
      projectStartDate, 
      projectEndDate
    } 
  }),

getCountMonthCompany: (projectCompany: string, projectStartDate: string, projectEndDate: string) => 
  api.get("/dashboard/count/month/company", { 
    params: { 
      projectCompany, 
      projectStartDate, 
      projectEndDate
    } 
  }),

getInvestmentCompany: (projectCompany: string, projectStartDate?: string, projectEndDate?: string) => 
  api.get("/dashboard/count/investment/company", { 
    params: { 
      projectCompany,
      projectStartDate,
      projectEndDate
    } 
  })
};

export { links };
export default api;
