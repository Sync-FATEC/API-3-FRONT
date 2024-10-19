// GerenciarProjetos.tsx
import { useState } from 'react';
import './styles.css';
import Sidebar from '../sideBar/static';
import filterDTO from '../../type/filterDTO';
import FiltroPortal from '../filtroPortal';
import ListarProjetos from '../listaProjetos/listaProjetos';

export default function GerenciarProjetos() {
    const [filterData, setFilterData] = useState<filterDTO | null>(null)

    const handleFilterSubmit = (data: filterDTO) => {
        setFilterData(data);
    };

    return (
        <>
        <div className='MainDadosAuth'>
            
            <Sidebar />
            <div className='AllContent'>

            <div className="admin_center-header">
                <h1>Gerenciar Projetos</h1>
                <div className="user">
                    <img src="/static/img/user.svg" alt="logo" />
                    <p>Admin</p>
                </div>
            </div>
            <div className='admin_center-padding'>
                <FiltroPortal onFilterSubmit={handleFilterSubmit}/>
                <ListarProjetos filterData={filterData} />
            </div>
        </div>
            </div>
        </>
    );
}
