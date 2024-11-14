import Sidebar from "../../components/sideBar/sideBar";
import "./gerenciarBolsistas.css";

export default function GerenciarBolsistas() {
    return (
        <>
            <Sidebar />
            <div className= "main-conteiner-auth">
                <div className="admin_center-header">
                <h2>Bolsistas</h2>
                <div className="user">
                    <img src="/static/img/user.svg" alt="logo" />
                    <p>Admin</p>
                </div>
                </div>
                <div className="background-projects">
                    <div className="Referencias">
                        <p>Nome</p>
                        <p>CPF</p>
                        <p>RG</p>
                        <p>E-mail</p>
                        <p>Nacionalidade</p>
                        <p>Visualizar</p>
                    </div>
                    <div className="Bolsistas Bolsistas_Responsivo">
                        <p><label className="Referencias_Responsivo">Nome: </label></p>
                        <p><label className="Referencias_Responsivo">CPF: </label></p>
                        <p><label className="Referencias_Responsivo">RG: </label></p>
                        <p><label className="Referencias_Responsivo">E-mail: </label></p>
                        <p><label className="Referencias_Responsivo">Nacionalidade: </label></p>
                        <img
                            src="/static/img/pesquisar.svg"
                            alt="Visualizar bolsistas"
                            style={{ cursor: "pointer", transition: "transform 0.2s" }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}