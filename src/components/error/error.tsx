import { useNavigate } from "react-router-dom";
import "./error.css";

interface ErrorProps {
    error: string;
}

export default function ErrorComponent({ error }: ErrorProps) {
    const navigate = useNavigate();
    return (
        <div id="fundo">
            <div className="background2">
                <h1>
                    <img src="/static/img/logo.svg" alt="" />
                    Portal da Transparência
                </h1>
            </div>
            <div className="title">
                <h2>Erro</h2>
                <p>{error}</p>
                <button onClick={() => navigate(-1)}>Voltar</button>
            </div>
        </div>
    );
}