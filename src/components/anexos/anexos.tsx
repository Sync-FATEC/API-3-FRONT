import React from 'react';
import { links } from '../../api/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faDownload, faFile } from '@fortawesome/free-solid-svg-icons';

interface AnexosProps {
    nome: string;
    link: string;
    tipo: string;
}

export default function Anexos({ nome, link, tipo }: AnexosProps) {

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

                setTimeout(() => {
                    a.remove();
                    window.URL.revokeObjectURL(url);
                }, 0);
            } else {
                console.error("Erro no download do documento:", response.status);
            }
        } catch (error) {
            console.error("Erro ao baixar o documento:", error);
        }
    };

    return (
        <div className='anexos'>
            <p>
                <FontAwesomeIcon icon={faFile} /> Tipo do arquivo: {tipo}
            </p>
            <p>Nome do arquivo: {nome}</p>
            {link.includes("https://fapg.org.br") ? (
                <a href={link} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </a>
            ) : (
                <a href={link} onClick={handleGetDocument}>
                    <FontAwesomeIcon height={100} icon={faDownload} />
                </a>
            )}
        </div>
    );
}
