// GerenciarProjetos.tsx
import { useState } from 'react';
import './styles.css';
import Sidebar from '../sideBar/static';
import VerProjetos from "./verProjetos";
import filterDTO from '../../type/filterDTO';
import FiltroPortal from '../filtroPortal';

export default function GerenciarProjetos() {
    const [filterData, setFilterData] = useState<filterDTO | null>(null)

    const handleFilterSubmit = (data: filterDTO) => {
        setFilterData(data);
    };

    return (
        <>
            <Sidebar />
            <div className="admin_center-header">
                <h1>Gerenciar Projetos</h1>
                <div className="user">
                    <img src="/static/img/user.svg" alt="logo" />
                    <p>Admin</p>
                </div>
            </div>
            <div className='admin_center-padding'>
                <FiltroPortal onFilterSubmit={handleFilterSubmit}/>
                <VerProjetos filterData={filterData} />
            </div>
        </>
    );
}
