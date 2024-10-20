import documents from "../../type/documents";
import "./removeAnexos.css";

interface RemoveAnexosProps {
    documento: documents;
    onDeleteDocument: (documento: documents) => void;
}

export function RemoveAnexos({ documento, onDeleteDocument }: RemoveAnexosProps) {

    function handleDeleteDocumento(documento: documents) {
        onDeleteDocument(documento);
    }

    const capitalizeFirstLetter = (text: string) => {
        if (!text) return "";
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    };

    return (
        <>
            {documento && !documento.removed && (
                <div className="document-view">
                    <div className="document-wrap">
                   
                    
                    <p style={{ textDecoration: "none" }}>
                        {capitalizeFirstLetter(documento.fileType)}
                    </p>
                    <p style={{ textDecoration: "none" }}>
                        {capitalizeFirstLetter(documento.fileName)}
                    </p>
                    </div>
                    <div className="remove-anexo">

                   
                    <button type="button" onClick={() => handleDeleteDocumento(documento)}>
                        Remover
                    </button> 
                    </div>
                </div>
            )}
        </>
    );
}
