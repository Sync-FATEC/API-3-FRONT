import React from 'react';
import { links } from '../../api/api';

interface AnexosProps {
    nome: string;
    link: string;
}

export default function Anexos({ nome, link }: AnexosProps) {
    const handleGetDocument = async (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();

        try {
            const response = await links.getAnexos(link);

            if (response.status === 200) {
                const blob = new Blob([response.data], { type: response.headers['content-type'] });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = nome;
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);
            }
        } catch (error) {
            console.error("Erro ao baixar o documento:", error);
        }
    };

    return (
        <div>
            <p>Nome do arquivo: {nome}</p>
            {link.includes("https://fapg.org.br") ? (
                <a href={link} target="_blank" rel="noopener noreferrer">
                    Visualizar
                </a>
            ) : (
                <a href={link} onClick={handleGetDocument}>
                    Download
                </a>
            )}
        </div>
    );
}
