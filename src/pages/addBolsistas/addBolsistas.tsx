import { useState, useEffect } from "react";
import { links } from "../../api/api";
import Sidebar from "../../components/sideBar/sideBar";
import { errorSwal } from "../../components/swal/errorSwal";
import { successSwal } from "../../components/swal/sucessSwal";
import AddressFields from "../../components/endereco/AddressFields";
import { formatCPF, formatRG } from "../../utils/utils";
import "./addBolsistas.css";

export default function AddBolsista() {
    interface Bolsa {
        id: number;
        type: string;
    }

    const [bolsas, setBolsas] = useState<Bolsa[]>([]);
    const [nome, setNome] = useState<string>("");
    const [cpf, setCpf] = useState<string>("");
    const [rg, setRg] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [nacionalidade, setNacionalidade] = useState<string>("");
    const [bolsaId, setBolsaId] = useState<string>("");
    const [addressStreet, setAddressStreet] = useState<string>("");
    const [addressNumber, setAddressNumber] = useState<string>("");
    const [addressNeighborhood, setAddressNeighborhood] = useState<string>("");
    const [addressCity, setAddressCity] = useState<string>("");
    const [addressState, setAddressState] = useState<string>("");
    const [addressZipCode, setAddressZipCode] = useState<string>("");

    useEffect(() => {
        const fetchBolsas = async () => {
            try {
                const response = await links.getAllGrants();
                setBolsas(response.data);
            } catch (error) {
                console.error("Erro ao buscar bolsas:", error);
            }
        };

        fetchBolsas();
    }, []);

    const handleSubmit = async () => {
        if (
            !nome ||
            !cpf ||
            !rg ||
            !email ||
            !nacionalidade ||
            !bolsaId ||
            !addressStreet ||
            !addressNumber ||
            !addressNeighborhood ||
            !addressCity ||
            !addressState ||
            !addressZipCode
        ) {
            errorSwal("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        const payload = {
            name: nome,
            cpf,
            rg,
            email,
            nationality: nacionalidade,
            grantId: bolsaId,
            address: {
                street: addressStreet,
                number: addressNumber,
                neighborhood: addressNeighborhood,
                city: addressCity,
                state: addressState,
                zipCode: addressZipCode,
            },
        };

        try {
            await links.RegisterScholarshipHolder(payload);
            successSwal("Bolsista cadastrado com sucesso!");
            setNome("");
            setCpf("");
            setRg("");
            setEmail("");
            setNacionalidade("");
            setBolsaId("");
            setAddressStreet("");
            setAddressNumber("");
            setAddressNeighborhood("");
            setAddressCity("");
            setAddressState("");
            setAddressZipCode("");
        } catch (error) {
            console.error("Erro ao cadastrar bolsista:", error);
            errorSwal("Erro ao cadastrar bolsista. Tente novamente.");
        }
    };

    return (
        <>
            <Sidebar />
            <div className="main-conteiner-auth">
                <div className="admin_center-header">
                    <h1>Cadastro de Bolsista</h1>
                    <div className="user">
                        <img src="/static/img/user.svg" alt="logo" />
                        <p>Admin</p>
                    </div>
                </div>
                <div>
                    <form
                        className="background-projects"
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit();
                        }}
                    >
                        <div>
                            <div className="campo-projeto">
                                <label>Nome</label>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder=" "
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                />
                            </div>
                            <div className="campo-projeto">
                                <label>CPF</label>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder=" "
                                    value={formatCPF(cpf)}
                                    onChange={(e) => setCpf(e.target.value)}
                                />
                            </div>
                            <div className="campo-projeto">
                                <label>RG</label>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder=" "
                                    value={formatRG(rg)}
                                    onChange={(e) => setRg(e.target.value)}
                                    maxLength={11}
                                />
                            </div>
                            <div className="campo-projeto">
                                <label>Email</label>
                                <input
                                    type="email"
                                    className="input"
                                    placeholder=" "
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="campo-projeto">
                                <label>Nacionalidade</label>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder=" "
                                    value={nacionalidade}
                                    onChange={(e) => setNacionalidade(e.target.value)}
                                />
                            </div>

                            <AddressFields
                                addressStreet={addressStreet}
                                addressNumber={addressNumber}
                                addressNeighborhood={addressNeighborhood}
                                addressCity={addressCity}
                                addressState={addressState}
                                addressZipCode={addressZipCode}
                                setAddressStreet={setAddressStreet}
                                setAddressNumber={setAddressNumber}
                                setAddressNeighborhood={setAddressNeighborhood}
                                setAddressCity={setAddressCity}
                                setAddressState={setAddressState}
                                setAddressZipCode={setAddressZipCode}
                            />
                             <div className="campo-projeto">
                                <label>Bolsa</label>
                                <select
                                    className="input"
                                    value={bolsaId}
                                    onChange={(e) => setBolsaId(e.target.value)}
                                >
                                    <option value="">Selecione uma bolsa</option>
                                    {bolsas.map((bolsa) => (
                                        <option key={bolsa.id} value={bolsa.id}>
                                            {bolsa.type}
                                        </option>
                                    ))}
                                </select>
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
