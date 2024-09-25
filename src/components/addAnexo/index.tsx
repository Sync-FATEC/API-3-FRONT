import { useState } from "react";

enum TipoAnexo {
    CONTRATO = "CONTRATO",
    TERMO_ADITIVO = "TERMO_ADITIVO",
    PLANO_DE_TRABALHO = "PLANO_DE_TRABALHO",
    OUTROS = "OUTROS"
}

interface AddAnexoProps {
    onAddAnexo: (anexo: { file: File | null; tipo: string }) => void;
}

export default function AddAnexo({ onAddAnexo }: AddAnexoProps) {
    const [file, setFile] = useState<File | null>(null);
    const [tipoAnexo, setTipoAnexo] = useState<TipoAnexo>(TipoAnexo.CONTRATO);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null;
        setFile(selectedFile);
        onAddAnexo({ file: selectedFile, tipo: tipoAnexo });
    };

    const handleTipoAnexoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedTipo = e.target.value as TipoAnexo;
        setTipoAnexo(selectedTipo);
        onAddAnexo({ file, tipo: selectedTipo });
    };

    return (
        <div className="add-anexo">
            <select value={tipoAnexo} onChange={handleTipoAnexoChange}>
                <option value={TipoAnexo.CONTRATO}>Contrato</option>
                <option value={TipoAnexo.TERMO_ADITIVO}>Termo Aditivo</option>
                <option value={TipoAnexo.PLANO_DE_TRABALHO}>Plano de Trabalho</option>
                <option value={TipoAnexo.OUTROS}>Outros</option>
            </select>
            <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
        </div>
    );
}
