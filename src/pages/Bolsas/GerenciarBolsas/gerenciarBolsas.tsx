import Sidebar from "../../../components/sideBar/sideBar";
import "../../GerenciarBolsistas/gerenciarBolsistas.css"
import ListarBolsas from "../ListarBolsas/listarBolsas";
import { FiltroPages } from "../../../components/filtroBolsas/filtro";
import { useState } from "react";

export default function GerenciarBolsas() {
    const [keywordFilter, setKeywordFilter] = useState<string>("");

    const handleFilterChange = (keyword: string) => {
        setKeywordFilter(keyword);
    };


    return (
        <>
            <Sidebar />
            <div className="main-conteiner-auth">
                <div className="admin_center-header">
                    <h1>Gerenciar Bolsas</h1>
                    <div className="user">
                        <img src="/static/img/user.svg" alt="logo" />
                        <p>Admin</p>
                    </div>
                </div>
                <FiltroPages onFilterChange={handleFilterChange} title="Buscar bolsas"/>
                <ListarBolsas keywordFilter={keywordFilter}/>
            </div>
        </>
    );
}
