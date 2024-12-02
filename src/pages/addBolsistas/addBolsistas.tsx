import { useState, useEffect } from "react";
import { links } from "../../api/api"; 
import BolsistaForm from "../../components/bolsistaForm/bolsistasForm";
import Sidebar from "../../components/sideBar/sideBar";

export function AddBolsistas() {
    const [bolsas, setBolsas] = useState<any[]>([]); 
    const [projetos, setProjetos] = useState<any[]>([]);


    useEffect(() => {
        const fetchBolsas = async () => {
            try {
                const response = await links.getAllGrants();
                setBolsas(response.data); 
            } catch (error) {
                console.error("Erro ao buscar bolsas:", error);
            }
        };

        fetchBolsas();
    }, []);

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

    const handleCreateBolsista = async (data: any) => {
        try {
            await links.RegisterScholarshipHolder(data); 
            return { status: 200 };
        } catch (error) {
            console.error("Erro ao cadastrar bolsista:", error);
            throw error;
        }
    };

    return (
        <>
            <Sidebar />
            <div className="main-container-bolsistas">
                <h1>Cadastro de Bolsista</h1>
                <BolsistaForm
                    onSubmit={handleCreateBolsista}
                    mode="create" 
                    bolsas={bolsas}
                    projetos={projetos}
                />
            </div>
        </>
    );
}
