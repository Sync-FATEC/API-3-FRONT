import { useEffect, useState } from "react";
import Sidebar from "../../components/sideBar/sideBar";
import "./HistoryChanges.css";
import { HistoryChangesProjects } from "../../type/historyChangesProjects";
import { links } from "../../api/api";
import { useParams } from "react-router-dom";
import Loading from "../../components/loading/loading";
import ErrorComponent from "../../components/error/error";
import PopUpHistoryChanges from "../../components/popUpHistoryChanges/popUpHistoryChanges";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { formatDate, formatDateHour } from "../../utils/utils";

export default function HistoryChanges() {
  const [changesHistory, setChangesHistory] = useState<HistoryChangesProjects[]>([]);
  const { id } = useParams<{ id?: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedHistory, setSelectedHistory] = useState<HistoryChangesProjects | null>(null);

  const getProjects = async () => {
    try {
      if (!id) {
        throw new Error("Id não informado.");
      }
      const response = await links.getHistoryChangesProjects(id || "");
      setChangesHistory(response.data.model);
    } catch (err) {
      setError("Erro ao carregar os projetos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorComponent error={error} />;
  }

  return (
    <>
      <Sidebar />
      <div className="main-conteiner-auth">
        <div className="admin_center-header">
          <h1>Historico de mudanças</h1>
          <div className="user">
            <img src="/static/img/user.svg" alt="logo" />
            <p>Admin</p>
          </div>
        </div>
        <div className="BackgroundChanges">
          <div className="GridCategoryChanges">
            <p>Usuario</p>
            <p>Data</p>
            <p>Mudança</p>
            <p>Ver mais...</p>
          </div>
          {changesHistory.map((history, index) => (
            <div className="GridValuesChanges" key={index}>
              <p>{history.userEmail}</p>
              <p>{formatDateHour(history.changeDate)}</p>
              {history.changedFields === "add" ? (
                <p>Adicionando documento</p>
              ) : history.changedFields === "removed" ? (
                <p>Removendo documento</p>
              ) : (
                <p>Alterações no projeto</p>
              )}
              <p>
                <button className="buttonDownload" onClick={() => setSelectedHistory(history)}>
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </p>
            </div>
          ))}
        </div>
      </div>
      {selectedHistory && (
        <PopUpHistoryChanges
          historyChanges={selectedHistory}
          onClose={() => setSelectedHistory(null)}
        />
      )}
    </>
  );
}
