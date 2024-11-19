import { useState } from "react";
import Sidebar from "../../components/sideBar/sideBar";
import { createGrant } from "../../type/grant";
import { links } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { errorSwal } from "../../components/swal/errorSwal";
import { successSwal } from "../../components/swal/sucessSwal";

export default function AddBolsas() {
  const [type, setType] = useState("");
  const [months, setMonths] = useState<number | string>(0);
  const [years, setYears] = useState<number | string>(0);
  const [acting, setActing] = useState("");
  const [active, setActive] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!type || !acting || (months === 0 && years === 0)) {
      errorSwal("Todos os campos devem ser preenchidos.");
      return;
    }

    const newGrant: createGrant = {
      type,
      months: Number(months),
      years: Number(years),
      acting,
      active,
    };

    try {
      const response = await links.createGrant(newGrant);
      if (response.status === 201) {
        successSwal("Bolsa cadastrada com sucesso!");
        resetForm();
        navigate("/gerenciarBolsas");
      }
    } catch (error) {
      errorSwal("Erro ao adicionar bolsa");
      console.error("Erro ao adicionar bolsa:", error);
    }
  };

  const resetForm = () => {
    setType("");
    setMonths(0);
    setYears(0);
    setActing("");
    setActive(true);
  };

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
          <form className="background-projects" onSubmit={handleSubmit}>
            <div>
              <div className="campo-projeto">
                <label>Tipo de Bolsa</label>
                <input
                  type="text"
                  className="input"
                  placeholder=" "
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                />
              </div>
              <div className="campo-projeto">
                <label>Meses</label>
                <input
                  type="number"
                  className="input"
                  placeholder=" "
                  value={months}
                  onChange={(e) => setMonths(e.target.value)}
                />
              </div>
              <div className="campo-projeto">
                <label>Anos</label>
                <input
                  type="number"
                  className="input"
                  placeholder=" "
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                />
              </div>
              <div className="campo-projeto">
                <label>Atuação</label>
                <input
                  type="text"
                  className="input"
                  placeholder=" "
                  value={acting}
                  onChange={(e) => setActing(e.target.value)}
                />
              </div>
              <div className="campo-projeto">
                <label>
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={(e) => setActive(e.target.checked)}
                  />
                  Ativo
                </label>
              </div>
              <div className="campo-bolsistas">
                <button className="btn btn-cadastrar" type="submit">
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
