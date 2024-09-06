export default function FiltroPortal() {
    return (
        <main className='MainDados'>
            <h2>Filtro de dados</h2>
            <form action="" method="post">
                <div>
                    <label htmlFor="referenciaDeDados">Referência do projeto</label>
                    <input type="text" name="referenciaDeDados" id="referenciaDeDados" />
                </div>
                <div>
                    <label htmlFor="coordenador">Coordenador</label>
                    <select name="coordenador" id="coordenador">
                        <option value=''></option>
                        <option value="arakaki">Arakaki</option>
                        <option value="gerson">Gerson</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="dataInicio">Data de inicio</label>
                    <input type="date" name="dataInicio" id="dataInicio" />
                </div>
                <div>
                    <label htmlFor="dataTermino">Data de termino</label>
                    <input type="date" name="dataTermino" id="dataTermino" />
                </div>
                <div>
                    <label htmlFor="classificacao">Classificação</label>
                    <select name="classficacao" id="classficacao">
                        <option value=""></option>
                        <option value="outros">AS, OF, PC e/ou outros</option>
                        <option value="contrato">Contrato</option>
                        <option value="convenio">Convênio</option>
                        <option value="patrocinio">Patrocínio</option>
                        <option value="termoDeCooperacao">Termo de cooperação</option>
                        <option value="termoDeOutorga">Termo de outorga</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="situacaoDoProjeto">Situação do projeto</label>
                    <select name="situacaoDoProjeto" id="situacaoDoProjeto">
                        <option value=""></option>
                        <option value="ProjetosNaoIniciados">Projetos não iniciados</option>
                        <option value="ProjetosEmAndamento">Projetos em andamento</option>
                        <option value="ProjetosConcluidos">Projetos concluídos</option>
                    </select>
                </div>
                <button>Buscar</button>
            </form>
        </main>
    )
}