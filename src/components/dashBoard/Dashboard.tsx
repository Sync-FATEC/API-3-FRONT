import { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import './Dashboard.css';
import Sidebar from '../sideBar/static/sidebar';
import ReferênciaProjeto from "./tabs/referenciaProjeto";
import CoordenadorPage from "./tabs/coordenadorPage";
import Empresas from "./tabs/empresas";
import Classificacao from "./tabs/classificacao";
import SituacaoProjeto from "./tabs/situacaodoProjeto";


export default function DashBoard () {
const [activeTab, setActiveTab] = useState<string>("Referência de Projeto");


const handleTabClick = (tab: string) => {
  setActiveTab(tab);
};

  return (
    
    <div>
      <Sidebar/>
      <div className="titulo">
      <h1>DashBoard</h1>
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
        {<ReferênciaProjeto/> }
      </div>
    )}
    {activeTab === "Coordenador" && (
      <div>
        {<CoordenadorPage/>}
      </div>
    )}
       {activeTab === "Empresa" && (
      <div>
        {<Empresas/>}
      </div>
    )}
       {activeTab === "Classificação" && (
      <div>
        {<Classificacao/>}
      </div>
    )}
        {activeTab === "Situação do Projeto" && (
      <div>
        {<SituacaoProjeto/>}
      </div>
    )}
    </div>
    </div>
  );
}


