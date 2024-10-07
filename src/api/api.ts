import axios from "axios";
import createProject from "../type/createProject";
import AddAnexo from "../components/addAnexo";
import { get } from "http";
import filterDTO from "../type/filterDTO";
import { Projetos } from "../type/projeto";

const api = axios.create({
    baseURL: "http://localhost:8080"
});

const links = {
    getAllProjects: () => api.get("/projects/getAll"),
    
    getProject: (id: string) => api.get(`/projects/get/${id}`),

    getCoordinators: () => api.get("/projects/get/coordinators"),

    getCompanies: () => api.get("/projects/get/companies"),

    createProject: (data: createProject) => api.post("/projects/create", data),

    AddAnexo: (projectId: string, file: any, tipoAnexo: string) => {

        const formData = new FormData();
        formData.append('projectId', projectId);
        if (file) {
            formData.append('file', file);
        }
        formData.append('typeFile', tipoAnexo);

        return api.post("/documents/create", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    },

    getAnexos: (link: string) => api.get(link, { responseType: 'blob' }),

    filterProjects: (data: filterDTO) => api.get("/projects/filter", { params: data }),

    deleteProjects: (id: string) => api.delete(`/projects/delete/${id}`)
};

export { links };
export default api;
