// GerenciarProjetos.tsx
import { useState } from 'react';
import './gerenciarProjetos.css';
import Sidebar from '../sideBar/sideBar';
import filterDTO from '../../type/filterData';
import FiltroPortal from '../filtroPortal/filtroPortal';
import ListarProjetos from '../listaProjetos/listaProjetos';

export default function GerenciarProjetos() {
    const [filterData, setFilterData] = useState<filterDTO | null>(null)

    const handleFilterSubmit = (data: filterDTO) => {
        setFilterData(data);
    };

    return (
        <>
            <Sidebar />
            <div className='MainDadosAuth'>
                <div className='mainDadosMobile'>

                    <div className="admin_center-header">
                        <h1>Gerenciar Projetos</h1>
                        <div className="user">
                            <img src="/static/img/user.svg" alt="logo" />
                            <p>Admin</p>
                        </div>
                    </div>
                    <FiltroPortal onFilterSubmit={handleFilterSubmit} />
                    <ListarProjetos filterData={filterData} />

                </div>
            </div>
        </>
    );
}
