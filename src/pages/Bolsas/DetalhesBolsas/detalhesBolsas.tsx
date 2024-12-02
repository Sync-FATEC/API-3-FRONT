import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../../components/sideBar/sideBar";
import { links } from "../../../api/api";
import { Grant } from "../../../type/grant";
import { AuthContext } from "../../../contexts/auth/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCancel, faChevronCircleLeft, faEdit, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import ButtonProject from "../../../components/ButtonProject/ButtonProject";
import "../../../components/detalhesProjetos/detalhesProjeto.css";

export default function DetalhesBolsas() {
    const { id } = useParams<{ id: string }>();
    const [grant, setGrant] = useState<Grant | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<string>("Informações da Bolsa");
    const [isActive, setIsActive] = useState<boolean>(true);
    const [showConfirm, setShowConfirm] = useState<boolean>(false);
    const [actionType, setActionType] = useState<"activate" | "deactivate">("deactivate");
    const navigate = useNavigate();
    const { isAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        const fetchGrant = async () => {
            try {
                const response = await links.getGrant(id!);
                setGrant(response.data.model);
                setIsActive(response.data.model.active);
            } catch (error) {
                console.error("Erro ao buscar detalhes da bolsa:", error);
                setError("Erro ao buscar detalhes da bolsa.");
            }
        };

        fetchGrant();
    }, [id]);

    const handleBackButtonClick = () => {
        navigate(-1);
    };

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    const handleToggleActive = async (grantId: string, currentState: boolean) => {
        try {
            if (currentState) {
                await links.deactivateGrants(grantId); // Chama a rota de desativação
            } else {
                await links.activateGrants(grantId); // Chama a rota de ativação
            }
            setGrant((prev) => (prev ? { ...prev, active: !currentState } : null));
            setIsActive(!currentState);
            setShowConfirm(false);
        } catch (error) {
            console.error(`Erro ao ${currentState ? "desativar" : "ativar"} bolsa:`, error);
        }
    };

    if (error) {
        return <div>{error}</div>;
    }

    if (!grant) {
        return <div>Carregando...</div>;
    }

    return (
        <div>
            {isAuthenticated && <Sidebar />}
            <div className={isAuthenticated ? "main-conteiner-auth" : ""}>
                <div id={isAuthenticated ? "fundo-autenticado" : "fundo"}>
                    <div className="title">
                        <h2>Detalhes da Bolsa</h2>
                        <button className="botao-voltar" onClick={handleBackButtonClick}>
                            <FontAwesomeIcon icon={faChevronCircleLeft} />
                            Voltar
                        </button>
                    </div>
                </div>
                <div className={isAuthenticated ? "tabs2" : "tabsNoAutenticated"}>
                    <button
                        className={`tab2 ${activeTab === "Informações da Bolsa" ? "active" : ""}`}
                        onClick={() => handleTabClick("Informações da Bolsa")}
                    >
                        Informações da Bolsa
                    </button>
                </div>
                <div className="dividir">
                    <div id={isAuthenticated ? "detalhesProjetoAuth" : "detalhesProjeto"}>
                        <div className="background-projects">
                            {activeTab === "Informações da Bolsa" && (
                                <>
                                    <div className="campo-projeto">
                                        <label>
                                            <strong>Tipo:</strong>
                                        </label>
                                        <span>{grant.type}</span>
                                    </div>
                                    <div className="campo-projeto">
                                        <label>
                                            <strong>Duração:</strong>
                                        </label>
                                        <span>{grant.duration}</span>
                                    </div>
                                    <div className="campo-projeto">
                                        <label>
                                            <strong>Atuação:</strong>
                                        </label>
                                        <span>{grant.acting}</span>
                                    </div>
                                    <div className="campo-projeto">
                                        <label>
                                            <strong>Status:</strong>
                                        </label>
                                        <span>{isActive ? "Ativo" : "Inativo"}</span>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    {isAuthenticated && (
                        <>
                            <div className="button-container">
                                <ButtonProject
                                    text="Editar"
                                    color="blue"
                                    iconButton={faEdit}
                                    action={() => navigate(`/bolsas/editar/${id}`)}
                                />
                                <ButtonProject
                                    text={grant.active ? "Desativar" : "Ativar"}
                                    color={grant.active ? "red" : "green"}
                                    iconButton={grant.active ? faCancel : faCheckCircle}
                                    action={() => {
                                        setActionType(grant.active ? "deactivate" : "activate");
                                        setShowConfirm(true);
                                    }}
                                />
                            </div>
                        </>
                    )}
                </div>

                {showConfirm && (
                    <div className="modal">
                        <div className="modal-content">
                            <h1>
                                Você tem certeza que deseja{" "}
                                {actionType === "deactivate" ? "desativar" : "ativar"} esta bolsa?
                            </h1>
                            <div className="modal-button">
                                <button
                                    className="buttons"
                                    onClick={() => handleToggleActive(grant.id, grant.active)}
                                >
                                    Sim
                                </button>
                                <button
                                    className="delete-buttons"
                                    onClick={() => setShowConfirm(false)}
                                >
                                    Não
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
