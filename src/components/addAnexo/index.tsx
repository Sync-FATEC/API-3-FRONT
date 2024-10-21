import { useEffect, useRef, useState } from "react";
import "./AddAnexo.css";

interface AddAnexoProps {
    onAddAnexo: (id: number, anexo: { file: File | null; tipo: string }) => void;
    resetFile?: boolean;
    handleRemoveAnexoComponent: (id: number) => void;
    id: number ;
}

enum TipoAnexo {
    CONTRATO = "CONTRATO",
    TERMO_ADITIVO = "TERMO_ADITIVO",
    PLANO_DE_TRABALHO = "PLANO_DE_TRABALHO",
    OUTROS = "OUTROS"
}

export default function AddAnexo({ onAddAnexo, resetFile, handleRemoveAnexoComponent, id }: AddAnexoProps) {
    const [file, setFile] = useState<File | null>(null);
    const [tipoAnexo, setTipoAnexo] = useState<TipoAnexo>(TipoAnexo.CONTRATO);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null;
        setFile(selectedFile);
        onAddAnexo(id, { file: selectedFile, tipo: tipoAnexo });
    };

    const handleTipoAnexoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedTipo = e.target.value as TipoAnexo;
        setTipoAnexo(selectedTipo);
        onAddAnexo(id, { file, tipo: selectedTipo });
    };

    useEffect(() => {
        if (resetFile && fileInputRef.current) {
            fileInputRef.current.value = '';
            setFile(null);
        }
    }, [resetFile]);

    return (
        <div className="add-anexo">
            <label className="placeholder">Tipo do documento</label>
            <select value={tipoAnexo} onChange={handleTipoAnexoChange}>
                <option value={TipoAnexo.CONTRATO}>Contrato</option>
                <option value={TipoAnexo.TERMO_ADITIVO}>Termo Aditivo</option>
                <option value={TipoAnexo.PLANO_DE_TRABALHO}>Plano de Trabalho</option>
                <option value={TipoAnexo.OUTROS}>Outros</option>
            </select>
            <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} ref={fileInputRef} />
            <button type="button" onClick={() => handleRemoveAnexoComponent(id)}>
            Remover
            </button>
        </div>
    );
}