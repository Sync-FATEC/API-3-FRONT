import Sidebar from "../../components/sideBar/sideBar";


export default function AddBolsas() {
  return (
    <>
      <Sidebar />
      <div className="main-conteiner-auth">
        <div className="admin_center-header">
          <h1>Adicionar Bolsas</h1>
          <div className="user">
            <img src="/static/img/user.svg" alt="logo" />
            <p>Admin</p>
          </div>
        </div>
        <div>
        <form className="background-projects">
          <div>
            <div className="campo-projeto">
              <label>Tipo de Bolsa</label>
              <input type="text" className="input" placeholder=" " />
            </div>
            <div className="campo-projeto">
              <label>Duração</label>
              <input type="text" className="input" placeholder=" " />
            </div>
            <div className="campo-projeto">
              <label>Atuação</label>
              <input type="text" className="input" placeholder=" " />
            </div>
            <div className="campo-bolsistas">
              <button className="btn btn-cadastrar" type="button">
                Cadastrar
              </button>
            </div>
          </div>
        </form>
      </div>
      </div>
      
    </>
  );
}
