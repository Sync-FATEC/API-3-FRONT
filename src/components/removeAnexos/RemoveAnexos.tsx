import documents from "../../type/documents";

interface RemoveAnexosProps{
    documento: documents
    onDeleteDocument: (documento: documents) => void
}

export function RemoveAnexos({ documento, onDeleteDocument }: RemoveAnexosProps){

    function handleDeleteDocumento(documento: documents){
        onDeleteDocument(documento)
    }

    return(
        <>
      {documento && !documento.removed  &&(
        <div className="document-view">
          <p>
            <strong>Nome do arquivo:</strong> {documento.fileName}
          </p>
          <p>
            <strong>Tipo de anexo:</strong> {documento.fileType}
          </p>
          <button type="button" onClick={() => handleDeleteDocumento(documento)}>
            Remover
          </button>
        </div>
      )}
    </>
  );
}
