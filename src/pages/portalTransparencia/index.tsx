import { useState } from 'react';
import Header from '../../components/header/header';
import './portalTransparencia.css';
import FiltroPortal from '../../components/filtroPortal/filtroPortal';
import filterData from '../../type/filterData';
import ListarProjetos from '../../components/listaProjetos/listaProjetos';

export default function PortalTransparencia() {
    const [filterData, setFilterData] = useState<filterData | null>(null);

    const handleFilterSubmit = (data: filterData) => {
        setFilterData(data);
    };

    return (
        <>
            <div className='background'>
                <Header />
                <section className='section'>
                    <h2>Sobre nós</h2>
                    <p>Bem-vindo à Fundação de Apoio à Pesquisa de Pós-Graduandos (FAPG)!</p>
                    <p>A FAPG é uma instituição dedicada a promover e apoiar a pesquisa acadêmica e científica entre pós-graduandos, oferecendo recursos, orientação e suporte para que nossos pesquisadores possam alcançar excelência em suas áreas de estudo. Fundada com o objetivo de fortalecer a produção científica e fomentar a inovação, nossa fundação desempenha um papel crucial no desenvolvimento de novos conhecimentos e na formação de futuros líderes acadêmicos.</p>
                    <p>Nossa missão é proporcionar um ambiente estimulante e enriquecedor para pós-graduandos em todas as etapas de sua jornada de pesquisa. Apoiamos uma ampla gama de projetos, desde estudos iniciais até pesquisas avançadas, com o intuito de maximizar o impacto e a relevância das descobertas científicas.</p>
                </section>
            </div>
            <FiltroPortal onFilterSubmit={handleFilterSubmit} />    
            <ListarProjetos filterData={filterData}/>   
        </>
    );
}
