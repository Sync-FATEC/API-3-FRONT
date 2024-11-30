import { useState, useEffect } from "react";
import { links } from "../../api/api"; 
import BolsistaForm from "../../components/bolsistaForm/bolsistasForm";
import Sidebar from "../../components/sideBar/sideBar";

export function AddBolsistas() {
    const [bolsas, setBolsas] = useState<any[]>([]); 


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
                />
            </div>
        </>
    );
}
