import Sidebar from "../../components/sideBar/sideBar";
import "./gerenciarBolsistas.css";
import ListarBolsistas from "./listarBolsistas/listarBolsistas";

export default function GerenciarBolsistas() {
    return (
        <>
            <Sidebar />
            <div className="main-conteiner-auth">
                <div className="admin_center-header">
                    <h1>Gerenciar Bolsistas</h1>
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
