import { useState } from "react";
import './dashBoard.css';
import Sidebar from '../sideBar/sideBar';
import CoordenadorPage from "./tabs/coordenadorPage";
import api from "../../api/api";
import EmpresaPage from "./tabs/empresaPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faTable } from "@fortawesome/free-solid-svg-icons";

export default function DashBoard() {
  const [activeTab, setActiveTab] = useState<string>("Coordenador");
  const [coordenadorDataInicial, setCoordenadorDataInicial] = useState("");
  const [coordenadorDataFinal, setCoordenadorDataFinal] = useState("");
  const [empresaDataInicial, setEmpresaDataInicial] = useState("");
  const [empresaDataFinal, setEmpresaDataFinal] = useState("");
  const [textoCoordenadores, setTextoCoordenadores] = useState("");
  const [textoEmpresas, setTextoEmpresas] = useState("");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleExport = async (format: string) => {
    try {
        let params: any = { startDate: "", endDate: "" };

        if (activeTab === "Coordenador") {
            params = {
                ...params,
                nameCoordinator: textoCoordenadores || undefined,
                startDate: coordenadorDataInicial,
                endDate: coordenadorDataFinal
            };
        } else if (activeTab === "Empresa") {
            params = {
                ...params,
                projectCompany: textoEmpresas || undefined,
                startDate: empresaDataInicial,
                endDate: empresaDataFinal
            };
        }

        const response = await api.get(`/dashboard/export/${format}`, {
            responseType: "blob",
            params,
            headers: {
                "Accept": format === "pdf" ? "application/pdf" : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            },
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `dashboard_report.${format === "pdf" ? "pdf" : "xlsx"}`);
        document.body.appendChild(link);
        link.click();
        link.remove();
    } catch (error) {
        console.error("Erro ao exportar dados:", error);
    }
  };

  return (
    <>
      <Sidebar />
      <div className="main-conteiner-auth">
        
          <div className="admin_center-header">
            <h1>Dashboard</h1>
            <div className="user">
              <img src="/static/img/user.svg" alt="logo" />
              <p>Admin</p>
            </div>
          </div>
          <div className="tabs3">
            {["Coordenador", "Empresa"].map((tab) => (
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
                <CoordenadorPage 
                  dataInicial={coordenadorDataInicial}
                  dataFinal={coordenadorDataFinal}
                  setDataInicial={setCoordenadorDataInicial}
                  setDataFinal={setCoordenadorDataFinal}
                  textoCoordenadores={textoCoordenadores}
                  setTextoCoordenadores={setTextoCoordenadores}
                />
                <div className="export-buttons">
                  <button id="pdf" onClick={() => handleExport("pdf")}>Exportar como PDF <FontAwesomeIcon icon={faFile} /></button>
                  <button id="excel" onClick={() => handleExport("excel")}>Exportar como Excel <FontAwesomeIcon icon={faTable} /></button>
                </div>
              </div>
            )}
          </div>
          <div className="tabs3">
            {activeTab === "Empresa" && (
              <div>
                <EmpresaPage 
                  dataInicial={empresaDataInicial}
                  dataFinal={empresaDataFinal}
                  setDataInicial={setEmpresaDataInicial}
                  setDataFinal={setEmpresaDataFinal}
                  textoEmpresas={textoEmpresas}
                  setTextoEmpresas={setTextoEmpresas}
                />
                <div className="export-buttons">
                  <button id="pdf" onClick={() => handleExport("pdf")}>Exportar como PDF  <FontAwesomeIcon icon={faFile}/></button>
                  <button id="excel" onClick={() => handleExport("excel")}>Exportar como Excel <FontAwesomeIcon icon={faTable} /></button>
                </div>
              </div>
            )}
          </div>
     
      </div>
    </>
  );
}
