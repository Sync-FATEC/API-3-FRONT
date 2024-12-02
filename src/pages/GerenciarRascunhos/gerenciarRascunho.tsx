import Sidebar from "../../components/sideBar/sideBar";
import "./gerenciarRascunho.css";
import ListarRascunhos from "./listarRascunho/listarRascunhos";
import { FiltroPages } from "../../components/filtroBolsas/filtro";// Assumindo que o filtro seja genérico
import { useState } from "react";

export default function GerenciarRascunho() {
    const [keywordFilter, setKeywordFilter] = useState<string>("");

    const handleFilterChange = (keyword: string) => {
        setKeywordFilter(keyword);
    };

    return (
        <>
            <Sidebar />
            <div className="main-conteiner-auth">
                <div className="admin_center-header">
                    <h1>Gerenciar Rascunhos</h1>
                    <div className="user">
                        <img src="/static/img/user.svg" alt="logo" />
                        <p>Admin</p>
                    </div>
                </div>
                <FiltroPages onFilterChange={handleFilterChange} title="Buscar rascunhos" />
                <ListarRascunhos keywordFilter={keywordFilter} />
            </div>
        </>
    );
}
