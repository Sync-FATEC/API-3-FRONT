import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { links } from "../../api/api";
import { errorSwal } from "../../components/swal/errorSwal"; 
import { successSwal } from "../../components/swal/sucessSwal";
import BolsaForm from "../../components/bolsaForm/bolsaForm";
import { createGrant, updateGrant } from "../../type/grant";
import Sidebar from "../../components/sideBar/sideBar";

export default function EditBolsas() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [bolsa, setBolsa] = useState<updateGrant | null>(null);
    const [loading, setLoading] = useState(true);

    function parseDuration(duration: string) {
        const yearsMatch = duration.match(/(\d+)\s*anos?/);
        const monthsMatch = duration.match(/(\d+)\s*meses?/);
    
        const years = yearsMatch ? parseInt(yearsMatch[1], 10) : 0;
        const months = monthsMatch ? parseInt(monthsMatch[1], 10) : 0;
    
        return { years, months };
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (id) {
                    const bolsaResponse = await links.getGrant(id);

                    if (bolsaResponse.data.model.duration) {
                        const { years, months } = parseDuration(bolsaResponse.data.model.duration);
                        bolsaResponse.data.model.years = years;
                        bolsaResponse.data.model.months = months;
                        delete bolsaResponse.data.model.duration;
                    }

                    setBolsa(bolsaResponse.data.model);
                    
                }
            } catch (error) {
                errorSwal("Erro ao buscar dados da bolsa");
            } finally {
                setLoading(false); 
            }
        };

        fetchData();
    }, [id]);

    const handleEditBolsa = async (data: updateGrant) => {
        try {
            if (!id) {
                throw new Error("ID is undefined");
            }

            const response = await links.updateGrant(data);
            if (response.status === 200 || response.status === 201) {
                successSwal("Bolsa editada com sucesso!");
                navigate("/gerenciarBolsas");
            }
        } catch (error) {
            console.error("Erro ao editar bolsa:", error);
            errorSwal("Erro ao editar bolsa");
        }
    };

    if (loading) {
        return <div>Carregando...</div>; 
    }

    if (!bolsa) {
        return <div>Não foi possível encontrar a bolsa.</div>; 
    }

    return (
        <>
            <Sidebar />
            <div className="main-conteiner-auth">
                <BolsaForm
                    onSubmit={handleEditBolsa} 
                    initialData={bolsa} 
                    mode="edit"
                />
            </div>
        </>
    );
}