import { useState } from "react";
import { createGrant, updateGrant } from "../../type/grant";
import { errorSwal } from "../swal/errorSwal";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft, faEdit } from "@fortawesome/free-solid-svg-icons";

interface BolsaFormProps<T> {
  onSubmit: (data: T) => Promise<void>;
  initialData?: T;
  mode: "create" | "edit";
}

export default function BolsaForm<T extends createGrant | updateGrant>({ onSubmit, initialData, mode }: BolsaFormProps<T>) {
  const [type, setType] = useState(initialData?.type || "");
  const [months, setMonths] = useState<number | string>(initialData?.months || "");
  const [years, setYears] = useState<number | string>(initialData?.years || "");
  const [acting, setActing] = useState(initialData?.acting || "");
  const [active, setActive] = useState(initialData?.active || true);
  const navigate = useNavigate();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!type || !acting || (months === 0 && years === 0)) {
      errorSwal("Todos os campos devem ser preenchidos.");
      return;
    }

    const newGrant = {
      ...(initialData?.id && { id: initialData.id }),
      type,
      months: Number(months),
      years: Number(years),
      acting,
      active,
    } as T;

    await onSubmit(newGrant);
  };

  const handleBackButtonClick = () => {
    navigate(-1);
};

  return (
    <div className="main-conteiner-bolsas">
      <div className="admin_center-header">
        <div>
            <h1>{mode === "create" ? "Adicionar Bolsa" : "Editar Bolsa"}</h1>
            <button className="botao-voltar" onClick={handleBackButtonClick}>
            <FontAwesomeIcon icon={faChevronCircleLeft} />
                Voltar
            </button>
        </div>
        <div className="user">
            <img src="/static/img/user.svg" alt="logo" />
            <p>Admin</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="background-projects">
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
          <button type="submit" className="btn btn-cadastrar">
          <FontAwesomeIcon icon={faEdit} />
            {mode === "edit" ? "Salvar Alterações" : "Cadastrar Bolsa"}
          </button>
        </div>
      </form>
    </div>
  );
}