import { useState } from "react";
import { NavLink } from 'react-router-dom';
import './styles.css';
import Sidebar from '../sideBar/static';
import ReferênciaProjeto from "./static/referenciaProjeto";
import CoordenadorPage from "./static/coordenadorPage";
import Empresas from "./static/empresas";
import Classificacao from "./static/classificacao";
import SituacaoProjeto from "./static/situacaodoProjeto";

export default function DashBoard() {
  const [activeTab, setActiveTab] = useState<string>("Coordenador");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <Sidebar />
      <div className="admin_center-header">
        <h1>Dashboard</h1>
        <div className="user">
          <img src="/static/img/user.svg" alt="logo" />
          <p>Admin</p>
        </div>
      </div>
      <div className="tabs3">
        {["Referência do Projeto", "Coordenador", "Empresa", "Classificação", "Situação do Projeto"].map((tab) => (
          <button
            key={tab}
            className={`tab3 ${activeTab === tab ? "active" : ""}`}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="tabs3">
        {activeTab === "Referência do Projeto" && (
          <div>
            <ReferênciaProjeto />
          </div>
        )}
        {activeTab === "Coordenador" && (
          <div>
            <CoordenadorPage />
          </div>
        )}
        {activeTab === "Empresa" && (
          <div>
            <ReferênciaProjeto />
          </div>
        )}
        {activeTab === "Classificação" && (
          <div>
            <ReferênciaProjeto />
          </div>
        )}
        {activeTab === "Situação do Projeto" && (
          <div>
            <ReferênciaProjeto />
          </div>
        )}
      </div>
    </div>
  );
}
