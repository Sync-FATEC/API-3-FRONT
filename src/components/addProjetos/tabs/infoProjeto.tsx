import '../styles.css'
export default function Projeto() {
    return (
        <>
            <form action="submit" className='addProjetos'>
                <div className="input-placeholder-container">
                    <input type="text" className="input" placeholder=" " />
                    <label className="placeholder">Referência do projeto</label>
                </div>
                <div className="input-placeholder-container">
                    <input type="text" className="input" placeholder=" " />
                    <label className="placeholder">Empresa</label>
                </div>
                <div className="input-placeholder-container">
                    <input type="text" className="input" placeholder=" " />
                    <label className="placeholder">Objeto</label>
                </div>
                <div className="input-placeholder-container">
                    <input type="text" className="input" placeholder=" " />
                    <label className="placeholder">Descrição</label>
                </div>
                <div className="input-placeholder-container">
                    <input type="text" className="input" placeholder=" " />
                    <label className="placeholder">Coordenador</label>
                </div>
                <div className="input-placeholder-container">
                    <input type="text" className="input" placeholder=" " />
                    <label className="placeholder">Valor do projeto</label>
                </div>
                <div className="input-placeholder-container">
                    <input type="date" className="input" placeholder=" " />
                    <label className="placeholder">Data de início</label>
                </div>
                <div className="input-placeholder-container">
                    <input type="date" className="input" placeholder=" " />
                    <label className="placeholder">Data de término</label>
                </div>
                <button type='submit'>Cadastrar</button>
            </form>
        </>
    )
}