import { useEffect, useState } from "react";
import Sidebar from "../../components/sideBar/sideBar";
import "./HistoryChanges.css";
import { HistoryChangesProjects } from "../../type/historyChangesProjects";
import { links } from "../../api/api";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/loading/loading";
import ErrorComponent from "../../components/error/error";
import PopUpHistoryChanges from "../../components/popUpHistoryChanges/popUpHistoryChanges";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
import { formatDateHour } from "../../utils/utils";

export default function HistoryChanges() {
  const [changesHistory, setChangesHistory] = useState<HistoryChangesProjects[]>([]);
  const { id } = useParams<{ id?: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedHistory, setSelectedHistory] = useState<HistoryChangesProjects | null>(null);
  const navigate = useNavigate();

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
  }, [id]);

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
        <div id="fundo-autenticado">
          <div className="title">
            <h2>Histórico de mudanças</h2>
            <button 
              className="botao-voltar"
              onClick={() => navigate(`/detalhe/${id}`)}
            >
              <FontAwesomeIcon icon={faChevronCircleLeft} />
              Voltar
            </button>
          </div>
        </div>
        <div className="BackgroundChanges">
          {/* Cabeçalho das colunas */}
          <div className="GridCategoryChanges">
            <p>Usuário</p>
            <p>Data</p>
            <p>Mudança</p>
            <p>Ver mais...</p>
          </div>
          <div className="GridValuesChangesContainer">
            {/* Conteúdo da tabela */}
            {changesHistory.map((history, index) => (
              <div className="GridValuesChanges" key={index}>
                <div className="history-column">
                  <p>{history.userEmail}</p>
                </div>
                <div className="history-column">
                  <p>{formatDateHour(history.changeDate)}</p>
                </div>
                <div className="history-column">
                  <p>
                    {history.changedFields === "add" ? "Adicionando documento" :
                     history.changedFields === "removed" ? "Removendo documento" :
                     "Alterações no projeto"}
                  </p>
                </div>
                <div className="history-column">
                  <button className="botao-vermais" onClick={() => setSelectedHistory(history)}>
                    <FontAwesomeIcon icon={faPlus} /> Ver mais
                  </button>
                </div>
              </div>
            ))}
          </div>
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
