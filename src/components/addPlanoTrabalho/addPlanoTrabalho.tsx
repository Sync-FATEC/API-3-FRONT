import { useState } from "react";
import "./addPlanoTrabalho.css";
import api from "../../api/api";
import { errorSwal } from "../swal/errorSwal";
import { Projects } from "../../type/projects";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";

export default function AddPlanoTrabalho() {
    const location = useLocation();
    const navigate = useNavigate();
    const { projeto } = (location.state as { projeto?: Projects }) || {};
    const [projectData, setProjectData] = useState<Projects | null>(projeto || null);
    const [coordinatorCPF, setCoordinatorCPF] = useState<string>("");
    const [coordinatorAddress, setCoordinatorAddress] = useState<string>("");
    const [coordinatorCity, setCoordinatorCity] = useState<string>("");
    const [coordinatorUF, setCoordinatorUF] = useState<string>("");
    const [coordinatorCEP, setCoordinatorCEP] = useState<string>("");
    const [coordinatorTelefone, setCoordinatorTelefone] = useState<string>("");
    const [coordinatorEconomicActivity, setCoordinatorEconomicActivity] = useState<string>("");
    const [coordinatorPeriod, setCoordinatorPeriod] = useState<string>("");
    const [companyRazaoSocial, setCompanyRazaoSocial] = useState<string>("");
    const [companyCNPJ, setCompanyCNPJ] = useState<string>("");
    const [companyResponsavelTecnico, setCompanyResponsavelTecnico] = useState<string>("");
    const [companyTelefone, setCompanyTelefone] = useState<string>("");
    const [companyEndereco, setCompanyEndereco] = useState<string>("");
    const [companyEmpresaPrivada, setCompanyEmpresaPrivada] = useState<string>("");
    const [projetoJustificativa, setProjetoJustificativa] = useState<string>("");
    const [projetoResultadosEsperados, setProjetoResultadosEsperados] = useState<string>("");
    const [contratanteNome, setContratanteNome] = useState<string>("");
    const [contratanteCargo, setContratanteCargo] = useState<string>("");
    const [dataAssinatura, setDataAssinatura] = useState<string>("");

    const [fases, setFases] = useState<{ fase: string; descricao: string }[]>([
        { fase: "", descricao: "" },
    ]);
    const [cronograma, setCronograma] = useState<{
        atividade: string;
        indicadorFisico: string;
        dataInicio: string;
        dataFim: string;
    }[]>([
        { atividade: "", indicadorFisico: "", dataInicio: "", dataFim: "" },
    ]);

    const [equipe, setEquipe] = useState<
        { nome: string; instituicao: string; competencia: string }[]
    >([
        { nome: "", instituicao: "", competencia: "" },
    ]);

    const [planoAplicacao, setPlanoAplicacao] = useState<
        { descricao: string; total: string }[]
    >([
        { descricao: "", total: "" },
    ]);

    const [cronogramaFinanceiro, setCronogramaFinanceiro] = useState<
        { valor: string }[]
    >([{ valor: "" }]);

    // Adicionar Linha
    const adicionarLinhaFases = () => {
        setFases([...fases, { fase: "", descricao: "" }]);
    };

    const adicionarLinhaCronograma = () => {
        setCronograma([
            ...cronograma,
            { atividade: "", indicadorFisico: "", dataInicio: "", dataFim: "" },
        ]);
    };

    const adicionarLinhaEquipe = () => {
        setEquipe([...equipe, { nome: "", instituicao: "", competencia: "" }]);
    };

    const adicionarLinhaPlanoAplicacao = () => {
        setPlanoAplicacao([...planoAplicacao, { descricao: "", total: "" }]);
    };

    const adicionarLinhaCronogramaFinanceiro = () => {
        setCronogramaFinanceiro([...cronogramaFinanceiro, { valor: "" }]);
    };

    // Remover Linha
    const removerLinhaFases = (index: number) => {
        if (fases.length > 1) {
            setFases(fases.filter((_, i) => i !== index));
        }
    };

    const removerLinhaCronograma = (index: number) => {
        if (cronograma.length > 1) {
            setCronograma(cronograma.filter((_, i) => i !== index));
        }
    };

    const removerLinhaEquipe = (index: number) => {
        if (equipe.length > 1) {
            setEquipe(equipe.filter((_, i) => i !== index));
        }
    };

    const removerLinhaPlanoAplicacao = (index: number) => {
        if (planoAplicacao.length > 1) {
            setPlanoAplicacao(planoAplicacao.filter((_, i) => i !== index));
        }
    };

    const removerLinhaCronogramaFinanceiro = (index: number) => {
        if (cronogramaFinanceiro.length > 1) {
            setCronogramaFinanceiro(cronogramaFinanceiro.filter((_, i) => i !== index));
        }
    };

    // Atualizar Funções
    const atualizarFase = (index: number, campo: string, valor: string) => {
        const novasFases = [...fases];
        novasFases[index] = { ...novasFases[index], [campo]: valor };
        setFases(novasFases);
    };

    const atualizarCronograma = (
        index: number,
        campo: string,
        valor: string
    ) => {
        const novoCronograma = [...cronograma];
        novoCronograma[index] = { ...novoCronograma[index], [campo]: valor };
        setCronograma(novoCronograma);
    };

    const atualizarEquipe = (index: number, campo: string, valor: string) => {
        const novaEquipe = [...equipe];
        novaEquipe[index] = { ...novaEquipe[index], [campo]: valor };
        setEquipe(novaEquipe);
    };

    const atualizarPlanoAplicacao = (index: number, campo: string, valor: string) => {
        const novoPlano = [...planoAplicacao];
        novoPlano[index] = { ...novoPlano[index], [campo]: valor };
        setPlanoAplicacao(novoPlano);
    };

    const atualizarCronogramaFinanceiro = (index: number, valor: string) => {
        const novoCronograma = [...cronogramaFinanceiro];
        novoCronograma[index].valor = valor;
        setCronogramaFinanceiro(novoCronograma);
    };

    const calcularTotalPlanoAplicacao = () => {
        return planoAplicacao.reduce((acc, item) => {
            const valor = parseFloat(item.total);
            return acc + (isNaN(valor) ? 0 : valor);
        }, 0).toFixed(2);
    };

    const handleBackButtonClick = () => {
        navigate(-1); // Volta para a página anterior
    };

    const handleSubmit = async ({ projectId }: { projectId: string; }) => {
        if (!projectId) {
          errorSwal("Dados insuficientes para gerar o plano de trabalho.");
          return;
        }
        try {
            const payload = {
                projectId,
                coordinatorCPF,
                coordinatorAddress,
                coordinatorCity,
                coordinatorUF,
                coordinatorCEP,
                coordinatorTelefone,
                coordinatorEconomicActivity,
                coordinatorPeriod,
                companyRazaoSocial,
                companyCNPJ,
                companyResponsavelTecnico,
                companyTelefone,
                companyEndereco,
                companyEmpresaPrivada,
                projetoJustificativa,
                projetoResultadosEsperados,
                fases,
                cronograma,
                equipe,
                planoAplicacao,
                cronogramaFinanceiro,
                contratanteNome,
                contratanteCargo,
                dataAssinatura,
            };
            const response = await api.post(`/plano-de-trabalho/gerar`, payload, {
                responseType: "blob", // Para lidar com o arquivo binário
            });
            
            if (response.status === 200) {
                // Criar o arquivo para download
                const blob = new Blob([response.data], { type: response.headers['content-type'] });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `Plano_de_Trabalho_${projectData?.projectReference}.docx`; // Nome do arquivo
                document.body.appendChild(a);
                a.click();
                
                // Limpar o objeto URL criado
                setTimeout(() => {
                    a.remove();
                    window.URL.revokeObjectURL(url);
                }, 0);
            } else {
                errorSwal(`Erro ao gerar o plano de trabalho: ${response.status}`);
            }
        } catch (error) {
            console.error("Erro ao gerar o plano de trabalho:", error);
            errorSwal("Erro ao gerar plano de trabalho. Verifique o backend.");
        }
    };

    return (
        <>
            <div>
            <button className="btn botao-voltar" onClick={handleBackButtonClick}>
                <FontAwesomeIcon icon={faChevronCircleLeft} />
                Voltar
            </button>
        </div>
            <div className="campo-projeto">
                <h3>Dados do Coordenador</h3>
            </div>
            <div className="campo-projeto">
                <label className="placeholder">CPF</label>
                <input
                    type="text"
                    className="input"
                    placeholder=""
                    value={coordinatorCPF}
                    onChange={(e) => setCoordinatorCPF(e.target.value)}
                />
            </div>
            <div className="campo-projeto">
                <label className="placeholder">Endereço</label>
                <input
                    type="text"
                    className="input"
                    placeholder=""
                    value={coordinatorAddress}
                    onChange={(e) => setCoordinatorAddress(e.target.value)}
                />
            </div>
            <div className="campo-projeto">
                <label className="placeholder">Cidade</label>
                <input
                    type="text"
                    className="input"
                    placeholder=""
                    value={coordinatorCity}
                    onChange={(e) => setCoordinatorCity(e.target.value)}
                />
            </div>
            <div className="campo-projeto">
                <label className="placeholder">UF</label>
                <input
                    type="text"
                    className="input"
                    placeholder=""
                    value={coordinatorUF}
                    onChange={(e) => setCoordinatorUF(e.target.value)}
                />
            </div>
            <div className="campo-projeto">
                <label className="placeholder">CEP</label>
                <input
                    type="text"
                    className="input"
                    placeholder=""
                    value={coordinatorCEP}
                    onChange={(e) => setCoordinatorCEP(e.target.value)}
                />
            </div>
            <div className="campo-projeto">
                <label className="placeholder">DDD/Telefone</label>
                <input
                    type="text"
                    className="input"
                    placeholder=""
                    value={coordinatorTelefone}
                    onChange={(e) => setCoordinatorTelefone(e.target.value)}
                />
            </div>
            <div className="campo-projeto">
                <label className="placeholder">Atividade Econômica</label>
                <input
                    type="text"
                    className="input"
                    placeholder=""
                    value={coordinatorEconomicActivity}
                    onChange={(e) => setCoordinatorEconomicActivity(e.target.value)}
                />
            </div>
            <div className="campo-projeto">
                <label className="placeholder">Período</label>
                <input
                    type="text"
                    className="input"
                    placeholder=""
                    value={coordinatorPeriod}
                    onChange={(e) => setCoordinatorPeriod(e.target.value)}
                />
            </div>
            <div className="campo-projeto">
                <h3>Dados da Empresa/Contratante</h3>
            </div>
            <div className="campo-projeto">
                <label className="placeholder">Razão Social</label>
                <input
                    type="text"
                    className="input"
                    placeholder=""
                    value={companyRazaoSocial}
                    onChange={(e) => setCompanyRazaoSocial(e.target.value)}
                />
            </div>
            <div className="campo-projeto">
                <label className="placeholder">CNPJ</label>
                <input
                    type="text"
                    className="input"
                    placeholder=""
                    value={companyCNPJ}
                    onChange={(e) => setCompanyCNPJ(e.target.value)}
                />
            </div>
            <div className="campo-projeto">
                <label className="placeholder">Responsável Técnico</label>
                <input
                    type="text"
                    className="input"
                    placeholder=""
                    value={companyResponsavelTecnico}
                    onChange={(e) => setCompanyResponsavelTecnico(e.target.value)}
                />
            </div>
            <div className="campo-projeto">
                <label className="placeholder">Telefone</label>
                <input
                    type="text"
                    className="input"
                    placeholder=""
                    value={companyTelefone}
                    onChange={(e) => setCompanyTelefone(e.target.value)}
                />
            </div>
            <div className="campo-projeto">
                <label className="placeholder">Endereço</label>
                <input
                    type="text"
                    className="input"
                    placeholder=""
                    value={companyEndereco}
                    onChange={(e) => setCompanyEndereco(e.target.value)}
                />
            </div>
            <div className="campo-projeto">
                <label className="placeholder">Empresa Privada</label>
                <input
                    type="text"
                    className="input"
                    placeholder=""
                    value={companyEmpresaPrivada}
                    onChange={(e) => setCompanyEmpresaPrivada(e.target.value)}
                />
            </div>
            <div className="campo-projeto">
                <h3>Descrição do Projeto</h3>
            </div>
            <div className="campo-projeto">
                <label className="placeholder">Justificativa</label>
                <input
                    type="text"
                    className="input"
                    placeholder=""
                    value={projetoJustificativa}
                    onChange={(e) => setProjetoJustificativa(e.target.value)}
                />
            </div>
            <div className="campo-projeto">
                <label className="placeholder">Resultados Esperados</label>
                <input
                    type="text"
                    className="input"
                    placeholder=""
                    value={projetoResultadosEsperados}
                    onChange={(e) => setProjetoResultadosEsperados(e.target.value)}
                />
            </div>
            <div className="campo-projeto">
                <h3>Fases e Entrega</h3>
            </div>
            <div className="campo-projeto">
                {fases.map((linha, index) => (
                    <div key={index} className="add-linha">
                        <input
                            type="text"
                            className="input"
                            placeholder={`Fase ${index + 1}`}
                            value={linha.fase}
                            onChange={(e) => atualizarFase(index, "fase", e.target.value)}
                        />
                        <input
                            type="text"
                            className="input"
                            placeholder={`Descrição ${index + 1}`}
                            value={linha.descricao}
                            onChange={(e) => atualizarFase(index, "descricao", e.target.value)}
                        />
                        {index > 0 && (
                            <button
                                type="button"
                                className="btn btn-remover"
                                onClick={() => removerLinhaFases(index)}
                            >
                                Remover
                            </button>
                        )}
                    </div>
                ))}
                <button type="button" className="btn btn-adicionar" onClick={adicionarLinhaFases}>
                    Adicionar Fase
                </button>
            </div>
            <div className="campo-projeto">
                <h3>Cronograma</h3>
            </div>
            <div className="campo-projeto">
                {cronograma.map((linha, index) => (
                    <div key={index} className="add-linha">
                        <input
                            type="text"
                            className="input"
                            placeholder={`Atividade ${index + 1}`}
                            value={linha.atividade}
                            onChange={(e) => atualizarCronograma(index, "atividade", e.target.value)}
                        />
                        <input
                            type="text"
                            className="input"
                            placeholder={`Indicador físico ${index + 1}`}
                            value={linha.indicadorFisico}
                            onChange={(e) =>
                                atualizarCronograma(index, "indicadorFisico", e.target.value)
                            }
                        />
                        <div>
                            <label>Data de Início</label>
                            <input
                                type="month"
                                className="input"
                                value={linha.dataInicio}
                                onChange={(e) => atualizarCronograma(index, "dataInicio", e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Data de Fim</label>
                            <input
                                type="month"
                                className="input"
                                value={linha.dataFim}
                                onChange={(e) => atualizarCronograma(index, "dataFim", e.target.value)}
                            />
                        </div>
                        {index > 0 && (
                            <button
                                type="button"
                                className="btn btn-remover"
                                onClick={() => removerLinhaCronograma(index)}
                            >
                                Remover
                            </button>
                        )}
                    </div>
                ))}
                <button type="button" className="btn btn-adicionar" onClick={adicionarLinhaCronograma}>
                    Adicionar Cronograma
                </button>
            </div>
            <div className="campo-projeto">
                <h3>Equipe Executora</h3>
            </div>
            <div className="campo-projeto">
                {equipe.map((linha, index) => (
                    <div key={index} className="add-linha">
                        <input
                            type="text"
                            className="input"
                            placeholder={`Nome ${index + 1}`}
                            value={linha.nome}
                            onChange={(e) => atualizarEquipe(index, "nome", e.target.value)}
                        />
                        <input
                            type="text"
                            className="input"
                            placeholder={`Instituição ${index + 1}`}
                            value={linha.instituicao}
                            onChange={(e) => atualizarEquipe(index, "instituicao", e.target.value)}
                        />
                        <input
                            type="text"
                            className="input"
                            placeholder={`Competência Técnica ${index + 1}`}
                            value={linha.competencia}
                            onChange={(e) => atualizarEquipe(index, "competencia", e.target.value)}
                        />
                        {index > 0 && (
                            <button
                                type="button"
                                className="btn btn-remover"
                                onClick={() => removerLinhaEquipe(index)}
                            >
                                Remover
                            </button>
                        )}
                    </div>
                ))}
                <button type="button" className="btn btn-adicionar" onClick={adicionarLinhaEquipe}>
                    Adicionar Membro da Equipe
                </button>
            </div>
            <div className="campo-projeto">
                <h3>Plano de Aplicação</h3>
            </div>
            <div className="campo-projeto">
                {planoAplicacao.map((linha, index) => (
                    <div key={index} className="add-linha">
                        <input
                            type="text"
                            className="input"
                            placeholder={`Descrição ${index + 1}`}
                            value={linha.descricao}
                            onChange={(e) => atualizarPlanoAplicacao(index, "descricao", e.target.value)}
                        />
                        <input
                            type="number"
                            className="input"
                            placeholder={`Total ${index + 1}`}
                            value={linha.total}
                            onChange={(e) => atualizarPlanoAplicacao(index, "total", e.target.value)}
                        />
                        {index > 0 && (
                            <button
                                type="button"
                                className="btn btn-remover"
                                onClick={() => removerLinhaPlanoAplicacao(index)}
                            >
                                Remover
                            </button>
                        )}
                    </div>
                ))}
                <button type="button" className="btn btn-adicionar" onClick={adicionarLinhaPlanoAplicacao}>
                    Adicionar Linha
                </button>
                <div className="campo-total">
                    <h3>Total Geral:</h3>
                    <p>{calcularTotalPlanoAplicacao()}</p>
                </div>
            </div>
            <div className="campo-projeto">
                <h3>Cronograma Financeiro</h3>
            </div>
            <div className="campo-projeto">
                {cronogramaFinanceiro.map((linha, index) => (
                    <div key={index} className="add-linha">
                        <div>
                            <label className="placeholder">{`Parcela ${index + 1}`}</label>
                            <input
                                type="number"
                                className="input"
                                placeholder={`Valor da parcela ${index + 1}`}
                                value={linha.valor}
                                onChange={(e) => atualizarCronogramaFinanceiro(index, e.target.value)}
                            />
                        </div>
                        {index > 0 && (
                            <button
                                type="button"
                                className="btn btn-remover"
                                onClick={() => removerLinhaCronogramaFinanceiro(index)}
                            >
                                Remover
                            </button>
                        )}
                    </div>
                ))}
                <button
                    type="button"
                    className="btn btn-adicionar"
                    onClick={adicionarLinhaCronogramaFinanceiro}
                >
                    Adicionar Parcela
                </button>
            </div>
            <div className="campo-projeto">
                <h3>Dados do Contratante (Para Assinatura)</h3>
            </div>
            <div className="campo-projeto">
                <label className="placeholder">Nome</label>
                <input
                    type="text"
                    className="input"
                    placeholder=""
                    value={contratanteNome}
                    onChange={(e) => setContratanteNome(e.target.value)}
                />
            </div>
            <div className="campo-projeto">
                <label className="placeholder">Cargo</label>
                <input
                    type="text"
                    className="input"
                    placeholder=""
                    value={contratanteCargo}
                    onChange={(e) => setContratanteCargo(e.target.value)}
                />
            </div>
            <div className="campo-projeto">
                <label className="placeholder">Data da Assinatura</label>
                <input
                    type="date"
                    className="input"
                    placeholder=""
                    value={dataAssinatura}
                    onChange={(e) => setDataAssinatura(e.target.value)}
                />
                <br />
                <button 
                    type="button" 
                    className="btn btn-enviar"
                    onClick={() => {
                        if (projectData) {
                            handleSubmit({
                                projectId: projectData.projectId,
                            });
                        } else {
                            errorSwal("Dados insuficientes para gerar o plano de trabalho.");
                        }
                    }}
                >
                    Enviar
                </button>
            </div>
        </>
    );
}