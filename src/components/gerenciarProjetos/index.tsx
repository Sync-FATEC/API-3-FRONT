// GerenciarProjetos.tsx
import './styles.css';
import Sidebar from '../sideBar/static';
import ProjetosPortal from "../projetosPortal";
import filterDTO from '../../type/filterDTO';

export default function GerenciarProjetos() {
    const filterData = {} as filterDTO; 

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
                <ProjetosPortal filterData={filterData} />
            </div>
        </>
    );
}
