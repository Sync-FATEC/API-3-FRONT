import Sidebar from "../../components/sideBar/sideBar";
import "./addBolsistas.css";
import { FC } from "react";

const AddBolsista: FC = () => {
    return (
        <>
            <Sidebar />
            <div className='main-conteiner-auth'>
                <div className="admin_center-header">
                    <h1>Cadastro de Bolsista</h1>
                    <div className="user">
                        <img src="/static/img/user.svg" alt="logo" />
                        <p>Admin</p>
                    </div>
                </div>
                <div>
                    <form className="background-projects">
                        <div>
                            <div className="campo-projeto">
                                <label>Nome</label>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder=" "
                                />
                            </div>
                            <div className="campo-projeto">
                                <label>CPF</label>
                                <input
                                    type="number"
                                    className="input"
                                    placeholder=" "
                                />
                            </div>
                            <div className="campo-projeto">
                                <label>RG</label>
                                <input
                                    type="number"
                                    className="input"
                                    placeholder=" "
                                />
                            </div>
                            <div className="campo-projeto">
                                <label>Email</label>
                                <input
                                    type="email"
                                    className="input"
                                    placeholder=" "
                                />
                            </div>
                            <div className="campo-projeto">
                                <label>Nacionalidade</label>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder=" "
                                />
                            </div>
                            <div className="campo-bolsistas">
                                <button className="btn btn-cadastrar" type="button">Cadastrar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AddBolsista;
