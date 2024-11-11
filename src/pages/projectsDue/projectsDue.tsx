import './projectsDue.css';
import Sidebar from '../../components/sideBar/sideBar';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Projects } from '../../type/projects';
import { links } from '../../api/api';
import Loading from '../../components/loading/loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '../../utils/utils';

export default function ProjectsDue() {
    const [projects, setProjects] = useState<Projects[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const getProjects = async () => {
        try {
            const response = await links.getProectsNearEnd();
            if (Array.isArray(response.data.model)) {
                setProjects(response.data.model);
            } else {
                throw new Error("Dados recebidos não são um array.");
            }
        } catch (err) {
            setError("Erro ao carregar os projetos.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProjects();
    }, []);

    if (loading) return <Loading />;
    if (error) return <div>{error}</div>;

    return (
        <>
            <Sidebar />
            <div className='main-conteiner-auth'>


                <div className="admin_center-header">
                    <h1>Projetos a serem concluídos esta semana</h1>
                    <div className="user">
                        <img src="/static/img/user.svg" alt="logo" />
                        <p>Admin</p>
                    </div>
                </div>

                {projects.length === 0 ? (
                    <p>Nenhum projeto a ser concluído esta semana.</p>
                ) : (
                    <div className="background-projects">
                        {/* Cabeçalho das colunas para telas grandes */}
                        <div className="projetos-due" id='none'>
                            <p>Empresa</p>
                            <p>Coordenador</p>
                            <p>Data de inicio</p>
                            <p>Data de fim</p>
                            <p>Editar</p>
                        </div>
                        {/* Projetos com estrutura responsiva */}
                        {projects.map((projeto) => (
                            <div className="Projetos projetos-due" key={projeto.projectId}>
                                <div className="project-item">
                                    <p className="project-title">Empresa:</p>
                                    <p className="project-info"> {projeto.projectCompany}</p>
                                </div>
                                <div className="project-item">
                                    <p className="project-title">Coordenador:</p>
                                    <p className="project-info"> {projeto.nameCoordinator}</p>
                                </div>
                                <div className="project-item">
                                    <p className="project-title">Data de Início:</p>
                                    <p className="project-info"> {formatDate(projeto.projectStartDate)}</p>
                                </div>
                                <div className="project-item">
                                    <p className="project-title">Data de Fim:</p>
                                    <p className="project-info"> {formatDate(projeto.projectEndDate)}</p>
                                </div>
                                <div className="project-item">
                                    <p className="project-title">Editar:</p>
                                    <Link to={`/editar-projeto/${projeto.projectId}`}>
                                        <FontAwesomeIcon icon={faPenToSquare} />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>

        </>
    );
}
