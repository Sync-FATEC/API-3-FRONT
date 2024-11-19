import Sidebar from "../../../components/sideBar/sideBar";
import "../../GerenciarBolsistas/gerenciarBolsistas.css"
import ListarBolsas from "../ListarBolsas/listarBolsas";

export default function GerenciarBolsas() {
    return (
        <>
            <Sidebar />
            <div className="main-conteiner-auth">
                <div className="admin_center-header">
                    <h1>Gerenciar Bolsas</h1>
                    <div className="user">
                        <img src="/static/img/user.svg" alt="logo" />
                        <p>Admin</p>
                    </div>
                </div>
                <ListarBolsas />
            </div>
        </>
    );
}
