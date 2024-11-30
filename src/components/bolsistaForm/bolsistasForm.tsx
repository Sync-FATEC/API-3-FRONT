import { useState, useEffect } from "react";
import { links } from "../../api/api"; // Supondo que links seja um objeto que lida com suas requisições API
import { errorSwal } from "../swal/errorSwal"; // Supondo que você tenha um sistema de alertas
import { successSwal } from "../swal/sucessSwal";
import { formatCPF, formatRG } from "../../utils/utils"; // Supondo que você tenha funções de formatação de CPF e RG
import AddressFields from "../endereco/AddressFields";
import { UpdateScholarShipHolder, ScholarshipHolder } from "../../type/scholarShipHolder";

interface BolsistaFormProps {
    onSubmit: (data: UpdateScholarShipHolder) => Promise<{ status: number }>;
    mode: "create" | "edit";
    initialData?: ScholarshipHolder | null;  // Permite tanto `null` quanto `undefined`
    bolsas: any[]; // Propriedade obrigatória
}



export default function BolsistaForm({ onSubmit, mode, initialData, bolsas }: BolsistaFormProps) {
    const [nome, setNome] = useState<string>(initialData?.name || "");
    const [cpf, setCpf] = useState<string>(initialData?.cpf || "");
    const [rg, setRg] = useState<string>(initialData?.rg || "");
    const [email, setEmail] = useState<string>(initialData?.email || "");
    const [nacionalidade, setNacionalidade] = useState<string>(initialData?.nationality || "");
    const [bolsaId, setBolsaId] = useState<string>(initialData?.grantId || "");
    const [addressStreet, setAddressStreet] = useState<string>(initialData?.address?.street || "");
    const [addressNumber, setAddressNumber] = useState<string>(initialData?.address?.number || "");
    const [addressNeighborhood, setAddressNeighborhood] = useState<string>(initialData?.address?.neighborhood || "");
    const [addressCity, setAddressCity] = useState<string>(initialData?.address?.city || "");
    const [addressState, setAddressState] = useState<string>(initialData?.address?.state || "");
    const [addressZipCode, setAddressZipCode] = useState<string>(initialData?.address?.zipCode || "");
    

    const [selectedGrantId, setSelectedGrantId] = useState<string>(bolsaId || "");

    // Função para buscar as grants
    useEffect(() => {
        const fetchBolsas = async () => {
            try {
                const response = await links.getAllGrants();
                setBolsaId(response.data); // Atualiza o estado de bolsas com a resposta da API
            } catch (error) {
                console.error("Erro ao buscar bolsas:", error);
            }
        };
    
        fetchBolsas();
    }, []); // Dependência vazia significa que isso vai ser chamado apenas uma vez quando o componente for montado
    

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (
            !nome ||
            !cpf ||
            !rg ||
            !email ||
            !nacionalidade ||
            !selectedGrantId || // Altere para usar selectedGrantId
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

        const data: UpdateScholarShipHolder = {
            id: initialData?.id || "", 
            name: nome,
            cpf,
            rg,
            email,
            nationality: nacionalidade,
            grantId: selectedGrantId, // Grant selecionada
            address: {
                id: initialData?.address?.id || "",
                street: addressStreet,
                number: addressNumber,
                neighborhood: addressNeighborhood,
                city: addressCity,
                state: addressState,
                zipCode: addressZipCode,
            },
        };

        try {
            const response = await onSubmit(data); // Envia os dados para o método onSubmit
            if (response?.status === 200 || response?.status === 201) {
                successSwal(`Bolsista ${mode === 'create' ? 'cadastrado' : 'editado'} com sucesso!`);
                if (mode === 'create') {
                    setNome("");
                    setCpf("");
                    setRg("");
                    setEmail("");
                    setNacionalidade("");
                    setSelectedGrantId(""); // Limpar o valor da bolsa
                    setAddressStreet("");
                    setAddressNumber("");
                    setAddressNeighborhood("");
                    setAddressCity("");
                    setAddressState("");
                    setAddressZipCode("");
                }
            } else {
                throw new Error('Erro ao processar a solicitação');
            }
        } catch (error) {
            errorSwal(`Erro ao ${mode === 'create' ? 'cadastrar' : 'editar'} bolsista!`);
        }
    };

    return (
        <div className="main-conteiner-auth">
            <div className="admin_center-header">
                <h1>{mode === 'create' ? 'Adicionar Bolsista' : 'Editar Bolsista'}</h1>
                <div className="user">
                    <img src="/static/img/user.svg" alt="logo" />
                    <p>Admin</p>
                </div>
            </div>
            <form onSubmit={handleSubmit} className="background-projects">
                {/* Nome */}
                <div className="campo-projeto">
                    <label>Nome</label>
                    <input
                        type="text"
                        className="input"
                        placeholder="Nome completo"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                </div>

                {/* CPF */}
                <div className="campo-projeto">
                    <label>CPF</label>
                    <input
                        type="text"
                        className="input"
                        placeholder="CPF"
                        value={formatCPF(cpf)}
                        onChange={(e) => setCpf(e.target.value)}
                        maxLength={11}
                    />
                </div>

                {/* RG */}
                <div className="campo-projeto">
                    <label>RG</label>
                    <input
                        type="text"
                        className="input"
                        placeholder="RG"
                        value={formatRG(rg)}
                        onChange={(e) => setRg(e.target.value)}
                    />
                </div>

                {/* Email */}
                <div className="campo-projeto">
                    <label>Email</label>
                    <input
                        type="email"
                        className="input"
                        placeholder="email@exemplo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                {/* Nacionalidade */}
                <div className="campo-projeto">
                    <label>Nacionalidade</label>
                    <input
                        type="text"
                        className="input"
                        placeholder="Nacionalidade"
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

                {/* Grant */}
                <div className="campo-projeto">
                    <label>Bolsa</label>
                    <select
                        className="input"
                        value={selectedGrantId}
                        onChange={(e) => setSelectedGrantId(e.target.value)} // Atualiza o selectedGrantId
                    >
                        <option value="">Selecione uma bolsa</option>
                        {bolsas.map((bolsa) => (
                            <option key={bolsa.id} value={bolsa.id}>
                                {bolsa.type}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Botão de submit */}
                <div className="campo-projeto">
                    <button type="submit" className="btn btn-cadastrar">
                        {mode === 'create' ? 'Cadastrar Bolsista' : 'Salvar Alterações'}
                    </button>
                </div>
            </form>
        </div>
    );
}
