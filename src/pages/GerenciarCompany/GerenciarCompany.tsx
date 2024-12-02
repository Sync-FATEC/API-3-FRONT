import { useState } from "react";
import { FiltroCoordenadores } from "../../components/filtroCoordenadores/filtroCoordenadores";
import ListarCoordenadores from "../../components/listarCoordenadores/listarCoordenadores";
import Sidebar from "../../components/sideBar/sideBar";
import ListarCompany from "../../components/listarCompanys/listarCompanys";
import { FiltroCompany } from "../../components/filtroCompany/filtroCompany";

export function GerenciarEmpresas() {
    const [keywordFilter, setKeywordFilter] = useState<string>("");

    const handleFilterChange = (keyword: string) => {
        setKeywordFilter(keyword);
    };

    return (
        <>
            <Sidebar />
            <div className='main-conteiner-auth'>
                <div className="admin_center-header">
                    <h1>Gerenciar Empresas</h1>
                    <div className="user">
                        <img src="/static/img/user.svg" alt="logo" />
                        <p>Admin</p>
                    </div>
                </div>
                <FiltroCompany onFilterChange={handleFilterChange} />
                <ListarCompany keywordFilter={keywordFilter} />
            </div>
        </>
    );
}
