import { useState, useEffect } from "react";
import { links } from "../../api/api";
import Sidebar from "../../components/sideBar/sideBar";
import { errorSwal } from "../../components/swal/errorSwal";
import { successSwal } from "../../components/swal/sucessSwal";
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

    // Estados para o endereço
    const [street, setStreet] = useState<string>("");
    const [number, setNumber] = useState<string>("");
    const [neighborhood, setNeighborhood] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [state, setState] = useState<string>("");
    const [zipCode, setZipCode] = useState<string>("");

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
        if (!nome || !cpf || !rg || !email || !nacionalidade || !bolsaId || !street || !number || !neighborhood || !city || !state || !zipCode) {
            errorSwal("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        const payload = {
            name: nome,
            cpf: cpf,
            rg: rg,
            email: email,
            nationality: nacionalidade,
            grantId: bolsaId,
            address: {
                street: street,
                number: number,
                neighborhood: neighborhood,
                city: city,
                state: state,
                zipCode: zipCode,
            },
        };

        try {
            await links.RegisterScholarshipHolder(payload);
            successSwal("Bolsista cadastrado com sucesso!");
            // Limpar campos após o sucesso
            setNome("");
            setCpf("");
            setRg("");
            setEmail("");
            setNacionalidade("");
            setBolsaId("");
            setStreet("");
            setNumber("");
            setNeighborhood("");
            setCity("");
            setState("");
            setZipCode("");
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
                            e.preventDefault(); // Prevenir o comportamento padrão do formulário
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
                                    value={cpf}
                                    onChange={(e) => setCpf(e.target.value)}
                                />
                            </div>
                            <div className="campo-projeto">
                                <label>RG</label>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder=" "
                                    value={rg}
                                    onChange={(e) => setRg(e.target.value)}
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
                            <h3>Endereço</h3>
                            <div className="campo-projeto">
                                <label>Rua</label>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder=" "
                                    value={street}
                                    onChange={(e) => setStreet(e.target.value)}
                                />
                            </div>
                            <div className="campo-projeto">
                                <label>Número</label>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder=" "
                                    value={number}
                                    onChange={(e) => setNumber(e.target.value)}
                                />
                            </div>
                            <div className="campo-projeto">
                                <label>Bairro</label>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder=" "
                                    value={neighborhood}
                                    onChange={(e) => setNeighborhood(e.target.value)}
                                />
                            </div>
                            <div className="campo-projeto">
                                <label>Cidade</label>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder=" "
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </div>
                            <div className="campo-projeto">
                                <label>Estado</label>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder=" "
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                />
                            </div>
                            <div className="campo-projeto">
                                <label>CEP</label>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder=" "
                                    value={zipCode}
                                    onChange={(e) => setZipCode(e.target.value)}
                                />
                            </div>
                            <div className="campo-bolsistas">
                                <button
                                    className="btn btn-cadastrar"
                                    type="submit"
                                >
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
