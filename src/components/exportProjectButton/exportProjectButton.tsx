import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { links } from "../../api/api";
import { errorSwal } from "../swal/errorSwal";
import "./exportProjectButton.css";
import { faFileExport } from "@fortawesome/free-solid-svg-icons";

interface props {
    id: string;
    format: string;
    nome: string;
}

const ExportProjectButton = (props: props) => {

    const exportProject = async (id: string, format: string, nome:string) => {

        if(!id || !format) {
            errorSwal("Dados insuficientes")
            return
        }

        if(format != "pdf" && format != "excel"){
            errorSwal("Formato inválido")
        }

        try {
            const response = await links.getExport(`/projects/export/${id}/${format}`)

            if (response.status === 200) {
                const blob = new Blob([response.data], { type: response.headers['content-type'] });
                const url = window.URL.createObjectURL(blob);

                const a = document.createElement('a');
                a.href = url;
                a.download = nome;
                document.body.appendChild(a);
                a.click();

                setTimeout(() => {
                    a.remove();
                    window.URL.revokeObjectURL(url);
                }, 0);
            } else {
                console.error("Erro no download do documento:", response.status);
            }
                
        } catch (error) {
            errorSwal("Erro ao exportar projeto.")
        }
    }
    
    
    return (
        <button onClick={() => exportProject(props.id, props.format, props.nome)} className="buttons" id="green">
           <FontAwesomeIcon icon={faFileExport} />  Exportar projeto
        </button>
    );
};

export default ExportProjectButton;