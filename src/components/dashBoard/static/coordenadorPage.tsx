import React from "react";
import "../styles.css";


export default function CoordenadorPage() {
    return (
        <div className="coordenador">
            <div className="container-principal">
                <img className="welcome" src="/static/img/welcome.png" alt="Welcome" /> 
                <img className="classificacao" src="/static/img/classificacao.png" alt="classificacao"/>
            </div>
            <div className="container-secundario">
                <img src="/static/img/graficobarra.png" alt="gráfico de barra" />
                <img src="/static/img/graficocirculo.png" alt="gráfico de círculo" />
            </div>
        </div>
);}
