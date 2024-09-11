export default function Header() {
    return (
        <header className="headerPortal">
            <nav>
                <div>
                    <img src="/static/img/logo.svg" alt="logo" />
                    <h1>Portal da Transparência</h1>
                </div>
                <input type="text" placeholder='Pesquisar' />
            </nav>
        </header>
    )
}