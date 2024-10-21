import './projectsDue.css';
import Sidebar from '../sideBar';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Projetos } from '../../type/projeto';
import { links } from '../../api/api';
import Loading from '../loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

export default function ProjectsDue() {
    const [projects, setProjects] = useState<Projetos[]>([]);
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

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const localDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
        return localDate.toLocaleDateString('pt-BR');
    };

    return (
        <>
        <Sidebar />
            <div className='MainDadosAuth'>
                <div className='mainDadosMobile'>

                    <div className="admin_center-header">
                        <h1>Projetos a serem concluídos esta semana</h1>
                        <div className="user">
                            <img src="/static/img/user.svg" alt="logo" />
                            <p>Admin</p>
                        </div>
                    </div>
                   
                        <div className="background-projects">
                            <div className="projetos-due">
                                <p>Empresa</p>
                                <p>Coordenador</p>
                                <p>Data de inicio</p>
                                <p>Data de fim</p>
                                <p>Editar</p>
                            </div>
                            {projects.map((projeto) => (
                                <div className="Projetos projetos-due" key={projeto.projectId}>
                                    <p>{projeto.projectCompany}</p>
                                    <p>{projeto.nameCoordinator}</p>
                                    <p>{formatDate(projeto.projectStartDate)}</p>
                                    <p>{formatDate(projeto.projectEndDate)}</p>
                                    <Link to={`/editar-projeto/${projeto.projectId}`}>
                                        <FontAwesomeIcon icon={faPenToSquare} />
                                    </Link>
                                </div>
                            ))}
                        </div>
                </div>
            </div>
        </>
    );
}
