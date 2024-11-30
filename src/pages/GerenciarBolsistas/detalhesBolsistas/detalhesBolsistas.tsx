import { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api, { links } from "../../../api/api";
import Sidebar from "../../../components/sideBar/sideBar";
import Header from "../../../components/header/header";
import Loading from "../../../components/loading/loading";
import { AuthContext } from "../../../contexts/auth/AuthContext";
import ErrorComponent from "../../../components/error/error";
import { RegisterScholarshipHolder } from "../../../type/scholarShipHolder";
import { Grant } from "../../../type/grant";
import { formatCPF, formatRG } from "../../../utils/utils";
import ButtonProject from "../../../components/ButtonProject/ButtonProject";
import { faEdit, faCancel, faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function DetalhesBolsista() {
    const { id } = useParams<{ id?: string }>();
    const navigate = useNavigate();
    const { isAuthenticated } = useContext(AuthContext);
    const [bolsistaData, setBolsistaData] = useState<RegisterScholarshipHolder | null>(null);
    const [bolsa, setBolsa] = useState<Grant | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);

    const fetchBolsistaDetails = async (scholarId: string) => {
        try {
            // Buscar os dados do bolsista
            const response = await links.getScholarShipHolder(scholarId);
            const fetchedBolsista = response.data.model;
            setBolsistaData(fetchedBolsista);

            // Buscar os dados da bolsa, caso o bolsista tenha vínculo
            if (fetchedBolsista?.grant?.id) {
                const grantResponse = await links.getGrant(fetchedBolsista.grant.id);
                setBolsa(grantResponse.data.model);
            }
        } catch (error) {
            console.error("Erro ao buscar dados do bolsista ou bolsa:", error);
            setError("Erro ao carregar detalhes do bolsista.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchBolsistaDetails(id);
        }
    }, [id]);

    const handleBackButtonClick = () => {
        navigate(-1);
    };

    const handleDeleteClick = () => {
        setShowConfirmDelete(true);
    };
    
    const handleConfirmDelete = async () => {
        if (bolsa?.id) {
            try {
                await links.deactivateGrants(bolsa.id);
                setShowConfirmDelete(false);
                alert("Bolsa desativada com sucesso!");
                navigate(-1); // Voltar para a página anterior após a exclusão
            } catch (error) {
                console.error("Erro ao desativar bolsa:", error);
                alert("Ocorreu um erro ao desativar a bolsa.");
            }
        } else {
            alert("Não foi possível identificar a bolsa para desativar.");
            setShowConfirmDelete(false);
        }
    };
    

    const handleDelete = async (grantId: string) => {
        try {
            await links.deactivateGrants(grantId);
        } catch (error) {
            console.error("Erro ao desativar bolsa:", error);
        }
    };


    if (loading) {
        return (
            <div id="fundo">
                <Header />
                <Loading />
            </div>
        );
    }

    if (error) {
        return <ErrorComponent error={error} />;
    }

    return (
        <div>
            {isAuthenticated && <Sidebar />}
            <div className={isAuthenticated ? "main-conteiner-auth" : ""}>
                <div id={isAuthenticated ? "fundo-autenticado" : "fundo"}>
                    <div className="title">
                        <h2>Detalhes do Bolsista</h2>
                        <button className="botao-voltar" onClick={handleBackButtonClick}>
                        <FontAwesomeIcon icon={faChevronCircleLeft} />
                            Voltar
                        </button>
                    </div>
                </div>
                <div className="dividir">
                    <div id="detalhesProjetoAuth">
                        <div className="background-projects">
                            <div className="campo-projeto">
                                <label>
                                    <strong>Nome:</strong>
                                </label>
                                <span>{bolsistaData?.name}</span>
                            </div>
                            <div className="campo-projeto">
                                <label>
                                    <strong>Email:</strong>
                                </label>
                                <span>{bolsistaData?.email}</span>
                            </div>
                            <div className="campo-projeto">
                                <label>
                                    <strong>CPF:</strong>
                                </label>
                                <span>{bolsistaData?.cpf ? formatCPF(bolsistaData.cpf) : "Não informado"}</span>
                            </div>
                            <div className="campo-projeto">
                                <label>
                                    <strong>RG:</strong>
                                </label>
                                <span>{bolsistaData?.rg ? formatRG(bolsistaData.rg) : "Não informado"}</span>
                            </div>
                            <div className="campo-projeto">
                                <label>
                                    <strong>Nacionalidade:</strong>
                                </label>
                                <span>{bolsistaData?.nationality}</span>
                            </div>
                            <div className="campo-projeto">
                                <label>
                                    <strong>Endereço:</strong>
                                </label>
                                <span>
                                    {bolsistaData?.address
                                        ? `${bolsistaData.address.street}, ${bolsistaData.address.number} - ${bolsistaData.address.city}, ${bolsistaData.address.state}`
                                        : "Não informado"}
                                </span>
                            </div>
                            <div className="campo-projeto">
                                <label>
                                    <strong>Vínculo com Bolsa:</strong>
                                </label>
                                <span>{bolsa?.type || "Não informado"}</span>
                            </div>
                        </div>
                    </div>
                    <div className="button-container">
                        <ButtonProject
                            text="Editar"
                            color="blue"
                            iconButton={faEdit}
                            action={() => { navigate(`/editar-bolsa/${id}`) }}
                        />

                        <ButtonProject
                            text="Desativar Bolsa"
                            color="red"
                            iconButton={faCancel}
                            action={handleDeleteClick}
                        />
                    </div>

                </div>
                {showConfirmDelete && (
                    <div className="modal">
                        <div className="modal-content">
                            <h1>Você tem certeza que deseja desativar esta bolsa?</h1>
                            <div className="modal-button">
                                <button className="buttons" onClick={handleConfirmDelete}>
                                    Sim
                                </button>
                                <button
                                    className="delete-buttons"
                                    onClick={() => setShowConfirmDelete(false)}
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
