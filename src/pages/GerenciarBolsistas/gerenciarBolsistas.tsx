import Sidebar from "../../components/sideBar/sideBar";
import "./gerenciarBolsistas.css";
import ListarBolsistas from "./listarBolsistas/listarBolsistas";

export default function GerenciarBolsistas() {
    return (
        <>
            <Sidebar />
            <div className="main-conteiner-auth">
                <div className="admin_center-header">
                    <h2>Bolsistas</h2>
                    <div className="user">
                        <img src="/static/img/user.svg" alt="logo" />
                        <p>Admin</p>
                    </div>
                </div>
                <ListarBolsistas />
            </div>
        </>
    );
}
