
export default function ListarBolsistas() {
    return (
        <>
                <div className="background-projects">
                    <div className="Referencias">
                        <p>Nome</p>
                        <p>CPF</p>
                        <p>RG</p>
                        <p>E-mail</p>
                        <p>Nacionalidade</p>
                        <p>Visualizar</p>
                    </div>
                    <div className="Bolsistas Bolsistas_Responsivo">
                        <p><label className="Referencias_Responsivo">Nome: </label></p>
                        <p><label className="Referencias_Responsivo">CPF: </label></p>
                        <p><label className="Referencias_Responsivo">RG: </label></p>
                        <p><label className="Referencias_Responsivo">E-mail: </label></p>
                        <p><label className="Referencias_Responsivo">Nacionalidade: </label></p>
                        <img
                            src="/static/img/pesquisar.svg"
                            alt="Visualizar bolsistas"
                            style={{ cursor: "pointer", transition: "transform 0.2s" }}
                        />
                    </div>
                </div>
        </>
    );
}
