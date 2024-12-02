import React from 'react';
import api, { links } from '../../api/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faDownload, faFile } from '@fortawesome/free-solid-svg-icons';
import './anexos.css';
import { errorSwal } from '../swal/errorSwal';

interface AnexosProps {
    id: string;
    anexoId: string;
    nome: string;
    link: string;
    tipo: string;
    fileBytes?: Uint8Array | null;
}

export default function Anexos({id, anexoId, nome, link, tipo, fileBytes }: AnexosProps) {

    const handleDownloadDocWithFileBytes = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    
        try {
            var response = await api.get(`/documents/download/${anexoId}`, { responseType: "blob" });
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

        } catch (error) {
            errorSwal("Erro ao baixar o plano de trabalho. \n Tente novamente mais tarde.");
            console.error("Erro ao baixar o plano de trabalho:", error);
        }
    };
    

    const handleGetDocument = async (event: React.MouseEvent<HTMLButtonElement>) => {
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
        <div className="anexos">
            <p>
                <FontAwesomeIcon icon={faFile} /> Tipo do arquivo: {tipo}
            </p>
            <p>Nome do arquivo: {nome}</p>
            {fileBytes ? (
                <button className="btn-download" onClick={handleDownloadDocWithFileBytes}>
                    <FontAwesomeIcon height={100} icon={faDownload} />
                </button>
            ) : link && !link.includes("https://fapg.org.br") ? (
                <button className="btn-download" onClick={handleGetDocument}>
                    <FontAwesomeIcon height={100} icon={faDownload} />
                </button>
            ) : link ? (
                <a href={link} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faMagnifyingGlass} /> Abrir Link
                </a>
            ) : null}
        </div>
    );
}
