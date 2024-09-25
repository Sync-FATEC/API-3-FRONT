import { useEffect, useState } from "react";
import api from "../../api/api"; // Certifique-se de que o caminho está correto

interface AnexosProps {
    nome: string;
    documentId: string;
}

export default function Anexos({ nome, documentId }: AnexosProps) {
    const [error, setError] = useState<string | null>(null);

    const handleDownload = async (id: string) => {
        try {
            const response = await api.get(`/documents/${id}`, { responseType: 'blob' }); 
            const url = window.URL.createObjectURL(new Blob([response.data]));

            const link = document.createElement('a'); 
            link.href = url; 
            link.setAttribute('download', nome); 
            document.body.appendChild(link); 
            link.click(); 
            link.remove(); 
        } catch (error) {
            console.error("Erro ao baixar o documento:", error);
            setError("Erro ao baixar o documento.");
        }
    };

    return (
        <>
            <p>Nome do arquivo:</p>
            <p>{nome}</p>

            <p>Download:</p>
            <a 
                onClick={() => handleDownload(documentId)} 
                style={{ color: 'blue', cursor: 'pointer' }} 
            >
                Link
            </a>

            {error && <p style={{ color: 'red' }}>{error}</p>} 
        </>
    );
}

