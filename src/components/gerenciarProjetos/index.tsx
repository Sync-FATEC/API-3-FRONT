import './styles.css';
import Sidebar from '../sideBar/static';
import VerDetalhes from './verProjetos';

export default function GerenciarProjetos() {

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
                <VerDetalhes/>
            </div>
        </>
    );
}


