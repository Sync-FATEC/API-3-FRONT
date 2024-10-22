import { useEffect, useState } from "react";
import Sidebar from "../../components/sideBar/sideBar";
import "./HistoryChanges.css";
import { HistoryChangesProjects } from "../../type/historyChangesProjects";
import { links } from "../../api/api";
import { useParams } from "react-router-dom";
import Loading from "../../components/loading/loading";
import ErrorComponent from "../../components/error/error";

export default function HistoryChanges() {
  const [changesHistory, setChangesHistory] = useState<
    HistoryChangesProjects[]
  >([]);
  const { id } = useParams<{ id?: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const localDate = new Date(
      date.getTime() + date.getTimezoneOffset() * 60000
    );
    return localDate.toLocaleDateString("pt-BR");
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorComponent error={error}/>
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
            <p>Ver mais...</p>
          </div>
          {changesHistory.map((history) => (
            <div className="GridValuesChanges">
              <p>{history.userEmail}</p>
              <p>{formatDate(history.changeDate)}</p>
              <p>Ver mais...</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
