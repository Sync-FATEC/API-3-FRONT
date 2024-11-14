import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSignOutAlt, faCirclePlus, faCube, faCalendarDays, faBars, faClose, faCaretDown, faCaretUp, faChartSimple, faFilePen, faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Logout from '../../contexts/auth/logout';
import './sidebar.css';
import '../../global.css';
import { useState, useEffect } from 'react';

export default function Sidebar() {

    const loadToggleState = (key: string, defaultValue: boolean): boolean => {
        const storedValue = localStorage.getItem(key);
        return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
    };

    const [isBolsistasOpen, setIsBolsistasOpen] = useState(loadToggleState('isBolsistasOpen', false));
    const [isProjetosOpen, setIsProjetosOpen] = useState(loadToggleState('isProjetosOpen', false));

    const saveToggleState = (key: string, value: boolean) => {
        localStorage.setItem(key, JSON.stringify(value));
    };

    const toggleBolsistasDropdown = () => {
        const newState = !isBolsistasOpen;
        setIsBolsistasOpen(newState);
        saveToggleState('isBolsistasOpen', newState);
    };

    const toggleProjetosDropdown = () => {
        const newState = !isProjetosOpen;
        setIsProjetosOpen(newState);
        saveToggleState('isProjetosOpen', newState);
    };

    const toggleMenu = () => {
        const sidebar = document.querySelector('.sidebarMobile .menu');
        if (sidebar) {
            sidebar.classList.toggle('open');
        }
    };

    useEffect(() => {
        setIsBolsistasOpen(loadToggleState('isBolsistasOpen', false));
        setIsProjetosOpen(loadToggleState('isProjetosOpen', false));
    }, []);

    return (
        <>
            <div className="sidebar sidebarDesktop">
                <div className="logo">
                    <img src="/static/img/logo.svg" alt="Logo" />
                </div>
                <div className="menu">
                    <h4 > <FontAwesomeIcon icon={faHome} style={{ color: "#121212", marginRight: '8px' }}/> Menu </h4>
                    <Link to="/dashboard" className="menu-item dashBoard">
                        <div style={{ display: 'flex', alignItems: 'center', color: '#8B909A', paddingLeft:'20px' }}>
                            <FontAwesomeIcon icon={faChartSimple} style={{ color: "#969696", marginRight: '8px' }} />
                            Dashboard
                        </div>
                    </Link>
                    <div className="menu-item" onClick={toggleProjetosDropdown} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                        <FontAwesomeIcon icon={isProjetosOpen ? faCaretUp : faCaretDown} style={{ color: "#121212", marginRight: '8px' }} />
                        Projetos
                    </div>
                    <div className={`submenu ${isProjetosOpen ? 'open' : ''}`}>
                        <Link to="/addProjetos" className="menu-item" id="projetos">
                            <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '20px', color: '#8B909A' }}>
                                <FontAwesomeIcon icon={faCirclePlus} style={{ color: "#969696", marginRight: '8px' }} />
                                Adicionar Projetos
                            </div>
                        </Link>

                        <Link to="/gerenciarprojetos" className="menu-item" id="gerenciarprojetos">
                            <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '20px', color: '#8B909A' }}>
                                <FontAwesomeIcon icon={faCube} style={{ color: "#969696", marginRight: '8px' }} />
                                Gerenciar Projetos
                            </div>
                        </Link>

                        <Link to="/projetosVencimentos" className="menu-item" id="projetosVencimentos">
                            <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '20px', color: '#8B909A' }}>
                                <FontAwesomeIcon icon={faCalendarDays} style={{ color: "#969696", marginRight: '8px' }} />
                                Próximos Vencimentos
                            </div>
                        </Link>

                        <Link to="/gerenciarRascunhos" className="menu-item" id="gerenciarRascunhos">
                            <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '20px', color: '#8B909A' }}>
                                <FontAwesomeIcon icon={faFilePen} style={{ color: "#969696", marginRight: '8px' }} />
                                Gerenciar Rascunhos
                            </div>
                        </Link>
                    </div>

                    <div className="menu-item" onClick={toggleBolsistasDropdown} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                        <FontAwesomeIcon icon={isBolsistasOpen ? faCaretUp : faCaretDown} style={{ color: "#121212", marginRight: '8px' }} />
                        Bolsistas
                    </div>
                    <div className={`submenu ${isBolsistasOpen ? 'open' : ''}`}>
                        <Link to="/addBolsistas" className="menu-item">
                            <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '20px', color: '#8B909A' }}>
                                <FontAwesomeIcon icon={faCirclePlus} style={{ color: "#969696", marginRight: '8px' }} />
                                Adicionar Bolsistas
                            </div>
                        </Link>
                        <Link to="/gerenciarBolsistas" className="menu-item">
                            <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '20px', color: '#8B909A' }}>
                                <FontAwesomeIcon icon={faCube} style={{ color: "#969696", marginRight: '8px' }} />
                                Gerenciar Bolsistas
                            </div>
                        </Link>
                    </div>

                    <Link to="/" className="menu-item logout" onClick={Logout}>
                        <div style={{ display: 'flex', alignItems: 'center', color: '#e74c3c' }} className="sair">
                            <FontAwesomeIcon icon={faSignOutAlt} style={{ color: "#e74c3c", marginRight: '8px' }} />
                            Sair
                        </div>
                    </Link>
                </div>
            </div>
            <div className="sidebar sidebarMobile">
                <div className="logo">
                    <img src="/static/img/logo.svg" alt="Logo" />
                </div>
                <button onClick={toggleMenu} className="buttonClose buttonOpen">
                    <FontAwesomeIcon icon={faBars} style={{ color: "#969696" }} /> Abrir menu
                </button>
                <div className="menu">
                    <div className="menu-logo">
                        <div className="logo">
                            <img src="/static/img/logo.svg" alt="Logo" />
                        </div>
                        <button onClick={toggleMenu} className="menu-item buttonClose">
                            <FontAwesomeIcon icon={faClose} style={{ color: "#969696" }} /> Fechar menu
                        </button>
                    </div>
                    <h4 > <FontAwesomeIcon icon={faHome} style={{ color: "#121212", marginRight: '8px' }}/> Menu </h4>
                    <Link to="/dashboard" className="menu-item dashBoard">
                        <div style={{ display: 'flex', alignItems: 'center', color: '#8B909A' }}>
                            <FontAwesomeIcon icon={faChartSimple} style={{ color: "#969696", marginRight: '8px' }} />
                            Dashboard
                        </div>
                    </Link>

                    <div className="menu-item" onClick={toggleProjetosDropdown} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                        <FontAwesomeIcon icon={isProjetosOpen ? faCaretUp : faCaretDown} style={{ color: "#121212", marginRight: '8px' }} />
                        Projetos
                    </div>
                    <div className={`submenu ${isProjetosOpen ? 'open' : ''}`}>
                        <Link to="/addProjetos" className="menu-item" id="projetos">
                            <div style={{ display: 'flex', alignItems: 'center', color: '#8B909A' }}>
                                <FontAwesomeIcon icon={faCirclePlus} style={{ color: "#969696", marginRight: '8px' }} />
                                Adicionar Projetos
                            </div>
                        </Link>
                        <Link to="/gerenciarprojetos" className="menu-item" id="gerenciarprojetos">
                            <div style={{ display: 'flex', alignItems: 'center', color: '#8B909A' }}>
                                <FontAwesomeIcon icon={faCube} style={{ color: "#969696", marginRight: '8px' }} />
                                Gerenciar Projetos
                            </div>
                        </Link>
                        <Link to="/projetosVencimentos" className="menu-item" id="projetosVencimentos">
                            <div style={{ display: 'flex', alignItems: 'center', color: '#8B909A' }}>
                                <FontAwesomeIcon icon={faCalendarDays} style={{ color: "#969696", marginRight: '8px' }} />
                                Próximos Vencimentos
                            </div>
                        </Link>
                        
                        <Link to="/gerenciarRascunhos" className="menu-item" id="gerenciarRascunhos">
                            <div style={{ display: 'flex', alignItems: 'center', color: '#8B909A' }}>
                                <FontAwesomeIcon icon={faFilePen} style={{ color: "#969696", marginRight: '8px' }} />
                                Gerenciar Rascunhos
                            </div>
                        </Link>
                    </div>
                    <div className="menu-item" onClick={toggleBolsistasDropdown} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                        <FontAwesomeIcon icon={isBolsistasOpen ? faCaretUp : faCaretDown} style={{ color: "#121212", marginRight: '8px' }} />
                        Bolsistas
                    </div>
                    <div className={`submenu ${isBolsistasOpen ? 'open' : ''}`}>
                        <Link to="/addBolsistas" className="menu-item">
                            <div id='adicionarBolsistas' style={{ display: 'flex', alignItems: 'center', color: '#8B909A' }}>
                                <FontAwesomeIcon icon={faCirclePlus} style={{ color: "#969696", marginRight: '8px' }} />
                                Adicionar Bolsistas
                            </div>
                        </Link>
                        <Link to="/gerenciarBolsistas" className="menu-item">
                            <div id='gerenciarBolsistas' style={{ display: 'flex', alignItems: 'center', color: '#8B909A' }}>
                                <FontAwesomeIcon icon={faCube} style={{ color: "#969696", marginRight: '8px' }} />
                                Gerenciar Bolsistas
                            </div>
                        </Link>
                    </div>

                    <Link to="/" className="menu-item logout" onClick={Logout}>
                        <div style={{ display: 'flex', alignItems: 'center', color: '#e74c3c' }} className="sair">
                            <FontAwesomeIcon icon={faSignOutAlt} style={{ color: "#e74c3c", marginRight: '8px' }} />
                            Sair
                        </div>
                    </Link>
                </div>
            </div>
        </>
    );
}
