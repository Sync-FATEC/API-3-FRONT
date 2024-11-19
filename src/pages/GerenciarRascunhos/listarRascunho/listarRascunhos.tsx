import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../../utils/utils";
import "./listarRascunhos.css";
import { links } from "../../../api/api";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { errorSwal } from "../../../components/swal/errorSwal";
import Loading from "../../../components/loading/loading";
import { Projects } from "../../../type/projects";
import ListarProjetos from "../../../components/listaProjetos/listaProjetos";

export default function ListarRascunhos() {
  const navigate = useNavigate();
  const [rascunhos, setRascunhos] = useState<Projects[]>([])
  const [keyWord, setKeyword] = useState("")

  const fetchDraftProjects = async () => {
    return await links.getFiltered(keyWord, "", "", "", "" , true)
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchDraftProjects();
      if (response.status === 200) {
        setRascunhos(response.data.model);
        console.log(rascunhos)
      } else {
        errorSwal("Erro ao buscar rascunhos");
      }
    };
    fetchData();
  }, []);

  const handleRascunhoClick = (draftId: string) => {
    navigate(`/detalhe/${draftId}`);
  };

  return (
    <div id="main-conteiner-auth">
      <h2>Rascunhos</h2>
      <div className="background-drafts">
        <div className="Referencias">
          <p>Referência do rascunho</p>
          <p>Data de Criação</p>
          <p>Autor</p>
          <p>Empresa</p>
          <p>Valor</p>
          <p>Visualizar</p>
        </div>
        {Array.isArray(rascunhos) && rascunhos.map((rascunho) => (
          <div className="Rascunhos Rascunhos_Responsivo" key={rascunho.projectId}>
            <p>
              <label className="Referencias_Responsivo">Referência do rascunho: </label>
              {rascunho.projectReference}
            </p>
            <p>
              <label className="Referencias_Responsivo">Data de Criação: </label>
              {formatDate(rascunho.projectStartDate)}
            </p>
            <p>
              <label className="Referencias_Responsivo">Autor: </label>
              {rascunho.projectEndDate}
            </p>
            <p>
              <label className="Referencias_Responsivo">Empresa: </label>
              {rascunho.projectCompany}
            </p>
            <p>
              <label className="Referencias_Responsivo">Valor: </label>
              {rascunho.projectValue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </p>
            <img
              src="/static/img/pesquisar.svg"
              alt="Visualizar detalhes do rascunho"
              onClick={() => handleRascunhoClick(rascunho.projectId)}
              style={{ cursor: "pointer", transition: "transform 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            />
          </div>
        ))}
        <div className="pagination">
          <button disabled>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <span>Página 1 de 1</span>
          <button disabled>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>
    </div>
  );
}
