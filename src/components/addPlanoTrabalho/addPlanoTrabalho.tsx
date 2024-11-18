import { useState } from "react";
import "./addPlanoTrabalho.css";
export default function AddPlanoTrabalho() {
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

    const adicionarLinha = () => {
        setFases([...fases, { fase: "", descricao: "" }]);
        setCronograma([
            ...cronograma,
            { atividade: "", indicadorFisico: "", dataInicio: "", dataFim: "" },
        ]);
    };

    const removerLinha = (index: number) => {
        if (fases.length > 1) {
            setFases(fases.filter((_, i) => i !== index));
        }
        if (cronograma.length > 1) {
            setCronograma(cronograma.filter((_, i) => i !== index));
        }
    };

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


    return (
        <>
            <div className="campo-projeto">
                <h3>Dados do Coordenador</h3>
            </div>
            <div className="campo-projeto">
                <label className="placeholder">CPF</label>
                <input
                    type="text"
                    className="input"
                    placeholder=""
                />
            </div>
            <div className="campo-projeto">
                <label className="placeholder">Endereço</label>
                <input
                    type="text"
                    className="input"
                    placeholder=""
                />
            </div>
            <div className="campo-projeto">
                <label className="placeholder">Cidade</label>
                <input
                    type="text"
                    className="input"
                    placeholder=""
                />
            </div>
            <div className="campo-projeto">
                <label className="placeholder">UF</label>
                <input
                    type="text"
                    className="input"
                    placeholder=""
                />
            </div>
            <div className="campo-projeto">
                <label className="placeholder">CEP</label>
                <input
                    type="text"
                    className="input"
                    placeholder=""
                />
            </div>
            <div className="campo-projeto">
                <label className="placeholder">DDD/Telefone</label>
                <input
                    type="text"
                    className="input"
                    placeholder=""
                />
            </div>
            <div className="campo-projeto">
                <label className="placeholder">Atividade Econômica</label>
                <input
                    type="text"
                    className="input"
                    placeholder=""
                />
            </div>
            <div className="campo-projeto">
                <label className="placeholder">Período</label>
                <input
                    type="text"
                    className="input"
                    placeholder=""
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
                />
            </div>
            <div className="campo-projeto">
                <label className="placeholder">C.N.P.J.</label>
                <input
                    type="text"
                    className="input"
                    placeholder=""
                />
            </div>
            <div className="campo-projeto">
                <label className="placeholder">Responsável Técnico</label>
                <input
                    type="text"
                    className="input"
                    placeholder=""
                />
            </div>
            <div className="campo-projeto">
                <label className="placeholder">Telefone</label>
                <input
                    type="text"
                    className="input"
                    placeholder=""
                />
            </div>
            <div className="campo-projeto">
                <label className="placeholder">Endereço</label>
                <input
                    type="text"
                    className="input"
                    placeholder=""
                />
            </div>
            <div className="campo-projeto">
                <label className="placeholder">Empresa Privada</label>
                <input
                    type="text"
                    className="input"
                    placeholder=""
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
                />
            </div>
            <div className="campo-projeto">
                <label className="placeholder">Resultados Esperados</label>
                <input
                    type="text"
                    className="input"
                    placeholder=""
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
                                onClick={() => removerLinha(index)}
                            >
                                Remover
                            </button>
                        )}
                    </div>
                ))}
                <button type="button" className="btn btn-adicionar" onClick={adicionarLinha}>
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
                                onClick={() => removerLinha(index)}
                            >
                                Remover
                            </button>
                        )}
                    </div>
                ))}
                <button type="button" className="btn btn-adicionar" onClick={adicionarLinha}>
                    Adicionar Cronograma
                </button>
            </div>


        </>
    );
}