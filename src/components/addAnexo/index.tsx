import { useEffect, useState } from "react";
import api from "../../api/api";
import { successSwal } from "../swal/sucessSwal";

enum TipoAnexo {
    CONTRATO = "CONTRATO",
    ARTIGO = "ARTIGO",
    PROPOSTA = "PROPOSTA"
}

interface Anexo {
    id: number;
    nome: string;
    tipo: TipoAnexo;
}

interface AddAnexoProps {
    projectId: string;
    triggerUpdate: () => void;
}

export default function AddAnexo({ projectId, triggerUpdate }: AddAnexoProps) {
    const [file, setFile] = useState<File | null>(null);
    const [tipoAnexo, setTipoAnexo] = useState<TipoAnexo>(TipoAnexo.CONTRATO);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleTipoAnexoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTipoAnexo(e.target.value as TipoAnexo);
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('projectId', projectId);
        if (file) {
            formData.append('file', file);
        }
        formData.append('typeFile', tipoAnexo);

        try {
            const response = await api.post('/create/documents', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 201) {
                successSwal('Anexo adicionado com sucesso!');
            } else {
                console.error('Erro ao adicionar anexo:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao adicionar anexo:', error);
        }
    };

    useEffect(() => {
        handleSubmit();
    }, [triggerUpdate]);

    return (
        <div className="headerPortal">
            <form>
                <label htmlFor="Anexos">Anexos</label>
                <input type="file" id="Anexos" name="Anexos" onChange={handleFileChange} />
                <label htmlFor="tipoAnexo">Tipo de Anexo</label>
                <select id="tipoAnexo" name="tipoAnexo" value={tipoAnexo} onChange={handleTipoAnexoChange}>
                    <option value={TipoAnexo.CONTRATO}>Contrato</option>
                    <option value={TipoAnexo.ARTIGO}>Artigo</option>
                    <option value={TipoAnexo.PROPOSTA}>Proposta</option>
                </select>
            </form>
        </div>
    );
}