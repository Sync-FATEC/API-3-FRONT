import { useState } from "react";
import './dashBoard.css';
import Sidebar from '../sideBar/sideBar';
import CoordenadorPage from "./tabs/coordenadorPage";

export default function DashBoard() {
  const [activeTab, setActiveTab] = useState<string>("Coordenador");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <>
     <Sidebar />
      <div className="MainDadosAuth">
        <div className="mainDadosMobile">
          <div className="admin_center-header">
            <h1>Dashboard</h1>
            <div className="user">
              <img src="/static/img/user.svg" alt="logo" />
              <p>Admin</p>
            </div>
          </div>
          <div className="tabs3">
            {["Coordenador"].map((tab) => (
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
            {activeTab === "Coordenador" && (
              <div>
                <CoordenadorPage />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
