export default function IsLogged() {
    return (
        <div>
            <style>
                {`
                    p.isLogged {
                        color: black;
                        font-size: 20px;
                        text-align: center;
                        margin-top: 20px;
                    }

                    a.isLogged {
                        color: black;
                        font-size: 20px;
                        text-align: center;
                        margin-top: 20px;
                        display: block;
                    }
                `}
            </style>
            <p className="isLogged">Logue para poder acessar essa pagina</p>
            <a className="isLogged" href="/auth">Clique para logar</a>
        </div>
    )
}