import { useState } from "react";
import './styles.css';
import Sidebar from '../sideBar/static';
import Projeto from "./tabs/infoProjeto";

export default function Projetos() {
  const [activeTab, setActiveTab] = useState<string>("Informações dos Projetos");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <Sidebar />
      <div className="admin_center-header">
        <h1>Adicionar Projetos</h1>
        <div className="user">
          <img src="/static/img/user.svg" alt="logo" />
          <p>Admin</p>
        </div>
      </div>

      <div className="tabs3">
        {["Informações dos Projetos"].map((tab) => (
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
        {activeTab === "Informações dos Projetos" && (
          <div>
            <Projeto />
          </div>
        )}
      </div>
    </div>
  );
}
