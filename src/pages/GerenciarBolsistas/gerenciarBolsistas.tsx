import Sidebar from "../../components/sideBar/sideBar";
import "./gerenciarBolsistas.css";
import ListarBolsistas from "./listarBolsistas/listarBolsistas";
import { FiltroPages } from "../../components/filtroBolsas/filtro";
import { useState } from "react";

export default function GerenciarBolsistas() {
    const [keywordFilter, setKeywordFilter] = useState<string>("");

    const handleFilterChange = (keyword: string) => {
        setKeywordFilter(keyword);
    };
    return (
        <>
            <Sidebar />
            <div className="main-conteiner-auth">
                <div className="admin_center-header">
                    <h1>Gerenciar Bolsistas</h1>
                    <div className="user">
                        <img src="/static/img/user.svg" alt="logo" />
                        <p>Admin</p>
                    </div>
                </div>
                <FiltroPages onFilterChange={handleFilterChange} title="Buscar bolsistas"/>
                <ListarBolsistas keywordFilter={keywordFilter}/>
            </div>
        </>
    );
}
