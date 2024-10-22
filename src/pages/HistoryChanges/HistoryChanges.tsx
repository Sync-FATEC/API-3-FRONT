import Sidebar from "../../components/sideBar/sideBar";
import './HistoryChanges.css'

export default function HistoryChanges() {
    return (
        <>
            <Sidebar />
            <div className='main-conteiner-auth'>

                <div className="admin_center-header">
                    <h1>Historico de mudanças</h1>
                    <div className="user">
                        <img src="/static/img/user.svg" alt="logo" />
                        <p>Admin</p>
                    </div>
                </div>
                <div className="BackgroundChanges">
                    <div className="GridCategoryChanges">
                        <p>Usuario</p>
                        <p>Data</p>
                        <p>Ver mais...</p>
                    </div>
                    <div className="GridValuesChanges">
                        <p>Admin</p>
                        <p>12/12/12</p>
                        <p>Link</p>
                    </div>
                </div>
            </div>
        </>
    );
}