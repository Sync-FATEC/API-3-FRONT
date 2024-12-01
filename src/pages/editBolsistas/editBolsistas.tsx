import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { links } from "../../api/api";
import { errorSwal } from "../../components/swal/errorSwal"; 
import { successSwal } from "../../components/swal/sucessSwal";
import BolsistaForm from "../../components/bolsistaForm/bolsistasForm";
import { ScholarshipHolder, UpdateScholarShipHolder } from "../../type/scholarShipHolder";
import Sidebar from "../../components/sideBar/sideBar";
import { useNavigate } from "react-router-dom";

export function EditBolsistaPage() {
    const { id } = useParams();
    const [bolsista, setBolsista] = useState<ScholarshipHolder | null>(null);
    const [loading, setLoading] = useState(true);
    const [bolsas, setBolsas] = useState<any[]>([]);
    const [projetos, setProjetos] = useState<any[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (id) {

                    const bolsistaResponse = await links.getScholarShipHolder(id);
                    setBolsista(bolsistaResponse.data.model);

                    if (bolsistaResponse.data.model.grantId) {
                        const bolsaResponse = await links.getGrant(bolsistaResponse.data.model.grantId);
                        setBolsas([bolsaResponse.data]); 
                    }
                }

                const bolsasResponse = await links.getAllGrants();
                setBolsas(prevBolsas => [...prevBolsas, ...bolsasResponse.data]); 
            } catch (error) {
                errorSwal("Erro ao buscar dados do bolsista ou bolsas");
            } finally {
                setLoading(false); 
            }
        };

        fetchData();
    }, [id]);

    useEffect(() => {
        const fetchProjetos = async () => {
            try {
                const response = await links.getAllProjects();
                setProjetos(response.data.model); 
            } catch (error) {
                console.error("Erro ao buscar projetos:", error);
            }
        };

        fetchProjetos();
    }, []);

    // Função de edição do bolsista
    const handleEditBolsista = async (data: UpdateScholarShipHolder) => {
        try {
            const response = await links.UpdateScholarShipHolder(data);
            if (response.status === 200 || response.status === 201) {
                successSwal("Bolsista editado com sucesso!");
                navigate(-1);
            }
            return { status: response.status };
        } catch (error) {
            console.error("Erro ao editar bolsista:", error);
            errorSwal("Erro ao editar bolsista");
            return { status: 500 };
        }
    };

    if (loading) {
        return <div>Carregando...</div>; 
    }

    if (!bolsista) {
        return <div>Não foi possível encontrar o bolsista.</div>; 
    }

    return (
        <>
            <Sidebar />
            <div className="main-container-bolsistas">
                <h1>Cadastro de Bolsista</h1>
                <BolsistaForm
                    onSubmit={handleEditBolsista} 
                    mode="edit" 
                    initialData={bolsista} 
                    bolsas={bolsas}
                    projetos={projetos}
                />
            </div>
        </>
    );
}
