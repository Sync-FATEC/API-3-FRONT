import { useState } from "react";
import { FiltroCoordenadores } from "../../components/filtroCoordenadores/filtroCoordenadores";
import ListarCoordenadores from "../../components/listarCoordenadores/listarCoordenadores";
import Sidebar from "../../components/sideBar/sideBar";

export function GerenciarCoordenadores() {
    const [keywordFilter, setKeywordFilter] = useState<string>("");

    const handleFilterChange = (keyword: string) => {
        setKeywordFilter(keyword);
    };

    return (
        <>
            <Sidebar />
            <div className='main-conteiner-auth'>
                <div className="admin_center-header">
                    <h1>Gerenciar Coordenadores</h1>
                    <div className="user">
                        <img src="/static/img/user.svg" alt="logo" />
                        <p>Admin</p>
                    </div>
                </div>
                <FiltroCoordenadores onFilterChange={handleFilterChange} />
                <ListarCoordenadores keywordFilter={keywordFilter} />
            </div>
        </>
    );
}
