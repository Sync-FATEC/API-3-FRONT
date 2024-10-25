import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSignOutAlt, faCirclePlus, faCube, faCalendarDays, faBars, faClose } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import "./sidebar.css";
import Logout from '../../contexts/auth/logout';
import '../../global.css';

const toggleMenu = () => {
    const sidebar = document.querySelector('.sidebarMobile .menu');
    if (sidebar) {
        sidebar.classList.toggle('open');
    }
};

export default function Sidebar() {
    return (
        <>
            <div className="sidebar sidebarDesktop">
                <div className="logo">
                    <img src="/static/img/logo.svg" alt="" />
                </div>
                <div className="menu">
                    <h4>Menu</h4>
                    <div className="menu-item dashBoard">
                        <Link to="/dashboard" style={{ textDecoration: 'none', color: '#8B909A', display: 'flex', alignItems: 'center', width: '100%' }}>
                            <FontAwesomeIcon icon={faHome} style={{ color: "#969696", marginRight: '8px' }} />
                            Dashboard
                        </Link>
                    </div>
                    <h4>Projetos</h4>
                    <div className="menu-item" id="projetos">
                        <Link to="/addProjetos" style={{ textDecoration: 'none', color: '#8B909A', display: 'flex', alignItems: 'center', width: '100%' }}>
                            <FontAwesomeIcon icon={faCirclePlus} style={{ color: "#969696", marginRight: '8px' }} />
                            Adicionar Projetos
                        </Link>
                    </div>
                    <div className="menu-item" id="gerenciarprojetos">
                        <Link to="/gerenciarprojetos" style={{ textDecoration: 'none', color: '#8B909A', display: 'flex', alignItems: 'center', width: '100%' }}>
                            <FontAwesomeIcon icon={faCube} style={{ color: "#969696", marginRight: '8px' }} />
                            Gerenciar Projetos
                        </Link>
                    </div>
                    <div className="menu-item" id="gerenciarprojetos">
                        <Link to="/projetosVencimentos" style={{ textDecoration: 'none', color: '#8B909A', display: 'flex', alignItems: 'center', width: '100%' }}>
                            <FontAwesomeIcon icon={faCalendarDays} style={{ color: "#969696", marginRight: '8px' }} />
                            Próximos vencimentos
                        </Link>
                    </div>
                    <div className="menu-item logout" onClick={Logout}>
                        <Link to="/" style={{ textDecoration: 'none', color: '#e74c3c', display: 'flex', alignItems: 'center', width: '100%' }} className='sair'>
                            <FontAwesomeIcon icon={faSignOutAlt} style={{ color: "#e74c3c", marginRight: '8px' }} />
                            Sair
                        </Link>
                    </div>
                </div>
            </div>
            <div className='sidebar sidebarMobile'>
                <div className="logo">
                    <img src="/static/img/logo.svg" alt="" />
                </div>
                <button onClick={toggleMenu} className='buttonClose buttonOpen'>
                    <FontAwesomeIcon icon={faBars} style={{ color: "#969696" }} /> Abrir menu
                </button>
                <div className="menu">
                    <div className='menu-logo'>
                        <div className="logo">
                            <img src="/static/img/logo.svg" alt="" />
                        </div>
                        <button onClick={toggleMenu} className='menu-item buttonClose'>
                            <FontAwesomeIcon icon={faClose} style={{ color: "#969696" }} /> Fechar menu
                        </button>
                    </div>
                    <h4>Menu</h4>
                    <div className="menu-item dashBoard">
                        <Link to="/dashboard" style={{ textDecoration: 'none', color: '#8B909A', display: 'flex', alignItems: 'center', width: '100%' }}>
                            <FontAwesomeIcon icon={faHome} style={{ color: "#969696", marginRight: '8px' }} />
                            Dashboard
                        </Link>
                    </div>
                    <h4>Projetos</h4>
                    <div className="menu-item" id="projetos">
                        <Link to="/addProjetos" style={{ textDecoration: 'none', color: '#8B909A', display: 'flex', alignItems: 'center', width: '100%' }}>
                            <FontAwesomeIcon icon={faCirclePlus} style={{ color: "#969696", marginRight: '8px' }} />
                            Adicionar Projetos
                        </Link>
                    </div>
                    <div className="menu-item" id="gerenciarprojetos">
                        <Link to="/gerenciarprojetos" style={{ textDecoration: 'none', color: '#8B909A', display: 'flex', alignItems: 'center', width: '100%' }}>
                            <FontAwesomeIcon icon={faCube} style={{ color: "#969696", marginRight: '8px' }} />
                            Gerenciar Projetos
                        </Link>
                    </div>
                    <div className="menu-item" id="gerenciarprojetos">
                        <Link to="/projetosVencimentos" style={{ textDecoration: 'none', color: '#8B909A', display: 'flex', alignItems: 'center', width: '100%' }}>
                            <FontAwesomeIcon icon={faCalendarDays} style={{ color: "#969696", marginRight: '8px' }} />
                            Próximos vencimentos
                        </Link>
                    </div>
                    <div className="menu-item logout" onClick={Logout}>
                        <Link to="/" style={{ textDecoration: 'none', color: '#e74c3c', display: 'flex', alignItems: 'center', width: '100%' }} className='sair'>
                            <FontAwesomeIcon icon={faSignOutAlt} style={{ color: "#e74c3c", marginRight: '8px' }} />
                            Sair
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
