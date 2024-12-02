import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sideBar/sideBar";
import BolsaForm from "../../components/bolsaForm/bolsaForm";
import { createGrant } from "../../type/grant";
import { links } from "../../api/api";
import { errorSwal } from "../../components/swal/errorSwal";
import { successSwal } from "../../components/swal/sucessSwal";

export default function AddBolsas() {
  const navigate = useNavigate();

  const handleCreateGrant = async (data: createGrant) => {
    try {
      const response = await links.createGrant(data);
      if (response.status === 201) {
        successSwal("Bolsa cadastrada com sucesso!");
        navigate("/gerenciarBolsas");
      }
    } catch (error) {
      errorSwal("Erro ao adicionar bolsa");
      console.error("Erro ao adicionar bolsa:", error);
    }
  };

  return (
    <>
      <Sidebar />
      <div className="main-conteiner-auth">
        <div>
          <BolsaForm onSubmit={handleCreateGrant} 
            mode="create"
          />
        </div>
      </div>
    </>
  );
}