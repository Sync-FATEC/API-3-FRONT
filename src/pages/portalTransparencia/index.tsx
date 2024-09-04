import './styles.css'
export default function PortalTransparencia() {
    return (
        <>
        <header className="headerPortal">
            <nav>
                <div>
                    <img src="/static/img/logo.svg" alt="" />
                    <h1>Portal de Transparência</h1>
                </div>
                <input type="text" />
            </nav>
            <section>
                <h2>Sobre nos</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste quas ratione quod ipsam rerum, cumque ut non aut tempora! Alias blanditiis quis accusantium mollitia, placeat nesciunt libero ducimus corrupti fuga. Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum soluta officia quasi laboriosam incidunt, ad autem distinctio corrupti maiores, impedit inventore ullam perferendis enim aut illum, sunt sapiente culpa voluptatibus? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae ut error illo eum recusandae alias, sint omnis facilis! Pariatur, tempora! Autem consectetur reprehenderit culpa harum id, quis vero corrupti saepe? Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate perferendis possimus tenetur, incidunt sit, quos nobis soluta, quis perspiciatis quo numquam porro natus quaerat earum voluptates nisi officiis vel veritatis!</p>
            </section>
        </header>
        <main className='MainDados'>
            <h2>Filtro de dados</h2>
        </main>
        <main className='MainDados'>
            <div className='Referencias'>
                <p>Referencia do projeto</p>
                <p>Inicio</p>
                <p>Término</p>
                <p>Coordenador</p>
                <p>Valor</p>
                <p>Visualizar</p>
            </div>
            <div className='Projetos'>
                <p>Projetoaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
                <p>01/01/2021</p>
                <p>01/01/2022</p>
                <p>João</p>
                <p>R$ 1000,00</p>
                <img src="/static/img/pesquisar.svg" alt="" />
            </div>
        </main>
        </>
    );
}