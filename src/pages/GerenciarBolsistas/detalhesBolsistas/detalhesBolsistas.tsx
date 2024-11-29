import { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api, { links } from "../../../api/api";
import "./detalhesBolsistas.css";
import Sidebar from "../../../components/sideBar/sideBar";
import Header from "../../../components/header/header";
import Loading from "../../../components/loading/loading";
import { AuthContext } from "../../../contexts/auth/AuthContext";
import ErrorComponent from "../../../components/error/error";
import { RegisterScholarshipHolder } from "../../../type/scholarShipHolder";
import { Grant } from "../../../type/grant";

export default function DetalhesBolsista() {
    const { id } = useParams<{ id?: string }>();
    const navigate = useNavigate();
    const { isAuthenticated } = useContext(AuthContext);
    const [bolsistaData, setBolsistaData] = useState<RegisterScholarshipHolder | null>(null);
    const [bolsa, setBolsa] = useState<Grant | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

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
                            Voltar
                        </button>
                    </div>
                </div>
                <div id={isAuthenticated ? "detalhesBolsistaAuth" : "detalhesBolsista"}>
                    <div className="background-scholarship">
                        <div className="campo-bolsista">
                            <label>
                                <strong>Nome:</strong>
                            </label>
                            <span>{bolsistaData?.name}</span>
                        </div>
                        <div className="campo-bolsista">
                            <label>
                                <strong>Email:</strong>
                            </label>
                            <span>{bolsistaData?.email}</span>
                        </div>
                        <div className="campo-bolsista">
                            <label>
                                <strong>CPF:</strong>
                            </label>
                            <span>{bolsistaData?.cpf}</span>
                        </div>
                        <div className="campo-bolsista">
                            <label>
                                <strong>RG:</strong>
                            </label>
                            <span>{bolsistaData?.rg}</span>
                        </div>
                        <div className="campo-bolsista">
                            <label>
                                <strong>Nacionalidade:</strong>
                            </label>
                            <span>{bolsistaData?.nationality}</span>
                        </div>
                        <div className="campo-bolsista">
                            <label>
                                <strong>Endereço:</strong>
                            </label>
                            <span>
                                {bolsistaData?.address
                                    ? `${bolsistaData.address.street}, ${bolsistaData.address.number} - ${bolsistaData.address.city}, ${bolsistaData.address.state}`
                                    : "Não informado"}
                            </span>
                        </div>
                        <div className="campo-bolsista">
                            <label>
                                <strong>Vínculo com Bolsa:</strong>
                            </label>
                            <span>{bolsa?.type || "Não informado"}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
