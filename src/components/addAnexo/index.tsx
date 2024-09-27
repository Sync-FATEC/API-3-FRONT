import { useState } from "react";

interface AddAnexoProps {
  onAddAnexo: (id: string, anexo: { file: File | null; tipo: string }) => void;
  resetFile?: boolean;
  handleRemoveAnexoComponent: (id: string) => void;
  id: string;
}

enum TipoAnexo {
  CONTRATO = "CONTRATO",
  TERMO_ADITIVO = "TERMO_ADITIVO",
  PLANO_DE_TRABALHO = "PLANO_DE_TRABALHO",
  OUTROS = "OUTROS",
}

export default function AddAnexo({ onAddAnexo, resetFile = false, handleRemoveAnexoComponent, id }: AddAnexoProps) {
  const [file, setFile] = useState<File | null>(null);
  const [tipoAnexo, setTipoAnexo] = useState<TipoAnexo | "">("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    setFile(selectedFile);
    onAddAnexo(id, { file: selectedFile, tipo: tipoAnexo });
  };

  const handleTipoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTipo = e.target.value as TipoAnexo;
    setTipoAnexo(selectedTipo);
    onAddAnexo(id, { file, tipo: selectedTipo });
  };

  const handleReset = () => {
    setFile(null);
    setTipoAnexo("");
  };

  if (resetFile) {
    handleReset();
  }

  return (
    <div className="add-anexo">
      <select value={tipoAnexo} onChange={handleTipoChange}>
        <option value="">Selecione o tipo de anexo</option>
        <option value={TipoAnexo.CONTRATO}>Contrato</option>
        <option value={TipoAnexo.TERMO_ADITIVO}>Termo Aditivo</option>
        <option value={TipoAnexo.PLANO_DE_TRABALHO}>Plano de Trabalho</option>
        <option value={TipoAnexo.OUTROS}>Outros</option>
      </select>
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleFileChange}
      />
      <button type="button" onClick={() => handleRemoveAnexoComponent(id)}>
        Remover
      </button>
    </div>
  );
}
