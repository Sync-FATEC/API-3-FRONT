import { faDownload, faXmark } from "@fortawesome/free-solid-svg-icons";
import { links } from "../../api/api";
import { HistoryChangesProjects } from "../../type/historyChangesProjects";
import "./popUpHistoryChanges.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatDate, formatDateHour } from "../../utils/utils";

interface PopUpHistoryChangesProps {
  historyChanges: HistoryChangesProjects;
  onClose: () => void;
}

const fieldTranslations: { [key: string]: string } = {
  projectStartDate: "Data de Início do Projeto",
  projectEndDate: "Data de Término do Projeto",
  projectValue: "Valor do Projeto",
  projectReference: "Referência do Projeto",
  projectCompany: "Empresa do Projeto",
  projectObjective: "Objetivo do Projeto",
  projectDescription: "Descrição do Projeto",
  nameCoordinator: "Nome do Coordenador",
  projectClassification: "Classificação do Projeto",
  removed: "Removendo documentação do projeto",
};

export default function PopUpHistoryChanges({
  historyChanges,
  onClose,
}: PopUpHistoryChangesProps) {
  const sanitizeString = (str: string) => str.replace(/,+$/, "");
  historyChanges.changedFields = sanitizeString(historyChanges.changedFields);

  const changedFieldsArray = historyChanges.changedFields.split(",");
  const newValuesArray = historyChanges.newValues.split(",");
  const oldValuesArray = historyChanges.oldValues.split(",");

  const changes = changedFieldsArray.map((field, index) => ({
    field,
    oldValue: oldValuesArray[index],
    newValue: newValuesArray[index],
  }));

  const handleDownloadDocument = async (name: string, fileUrl: string) => {
    try {
      fileUrl = "/documents/get/" + fileUrl;
      const response = await links.getAnexos(fileUrl);

      if (response.status === 200) {
        const blob = new Blob([response.data], {
          type: response.headers["content-type"],
        });
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = name;
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

  if (
    (historyChanges.changedFields === "removed" && historyChanges.documents) ||
    (historyChanges.changedFields === "add" && historyChanges.documents)
  ) {
    return (
      <>
        <div className="PopUpHistoryChanges">
          <div className="BackgroundChanges">
            <button className="CloseButton" onClick={onClose}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <div className="Changes">
            {historyChanges.changedFields === "add" ? (
                    <h2>Adicionando documentação no projeto</h2>
                  ) : (
                    <h2>Removendo documentação do projeto</h2>
                  )}
              <div className="ChangesContent">
                <div className="Change">
                  {historyChanges.changedFields === "add" ? (
                    <h3>Documento adicionado</h3>
                  ) : (
                    <h3>Documento removido</h3>
                  )}
                  <div className="Values">
                    <p>Nome do documento:</p>
                    <p>{historyChanges.documents.fileName}</p>
                    <p>Tipo do documento:</p>
                    <p>{historyChanges.documents.fileType}</p>
                    <p>Enviado por:</p>
                    <p>{historyChanges.userEmail}</p>
                    <p>Enviado em:</p>
                    <p>
                      {historyChanges.documents.uploadedAt
                        ? formatDate(historyChanges.documents.uploadedAt)
                        : "N/A"}
                    </p>
                    {historyChanges.documents?.documents_id && (
                      <button
                        className="buttonDownload"
                        onClick={() =>
                          handleDownloadDocument(
                            historyChanges.documents!.fileName,
                            historyChanges.documents!.documents_id
                          )
                        }
                      >
                        <FontAwesomeIcon icon={faDownload} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="ChangesDate">
              <p>
                Data da alteração: {formatDateHour(historyChanges.changeDate)}
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="PopUpHistoryChanges">
        <div className="BackgroundChanges">
          <button className="CloseButton" onClick={onClose}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <div className="Changes">
            <h2>Alterações no projeto</h2>
            <div className="ChangesContent">
              {changes.map((change, index) => (
                <div key={index} className="Change">
                  <h3>{fieldTranslations[change.field] || change.field}</h3>
                  <div className="Values">
                    {change.field === "projectStartDate" ||
                    change.field === "projectEndDate" ? (
                      <>
                        <p> Antigo:</p>
                        <p>{formatDate(change.oldValue)}</p>
                        <p>Novo:</p>
                        <p>{formatDate(change.newValue)}</p>
                      </>
                    ) : change.field === "projectValue" ? (
                      <>
                        <p>Antigo:</p>
                        <p>
                          {parseFloat(change.oldValue).toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </p>
                        <p>Novo:</p>
                        <p>
                          {parseFloat(change.newValue).toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </p>
                      </>
                    ) : (
                      <>
                        <p>Antigo:</p>
                        <p>{change.oldValue}</p>
                        <p>Novo:</p>
                        <p>{change.newValue}</p>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="ChangesDate">
            <p>
              Data da alteração: {formatDateHour(historyChanges.changeDate)}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
