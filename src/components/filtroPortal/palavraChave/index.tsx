import React, { useState } from 'react';
import { links } from '../../../api/api';
import { errorSwal } from '../../swal/errorSwal';

interface FiltroPorPalavraChaveProps {
    onSearch: (keyword: string) => void;
}

const FiltroPorPalavraChave: React.FC<FiltroPorPalavraChaveProps> = ({ onSearch }) => {
    const [keyword, setKeyword] = useState('');
    const [dataInicio, setDataInicio] = useState('');
    const [dataFim, setDataFim] = useState('');
    const [status, setStatus] = useState('');
    const [classificacao, setClassificacao] = useState('');
    const [projects, setProjects ] = useState([]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(event.target.value);
    };

    const handleSearch = async () => {
        try {
            const response = await links.getFiltered(keyword, dataInicio, dataFim, status, classificacao);
            if(response.data.length > 0) {
                setProjects(response.data);
            } else {
                errorSwal('Nenhum projeto encontrado');
            }
            onSearch(keyword);
        } catch (error) {
            errorSwal('Erro ao buscar projetos');
        }


    };

    return (
        <>
            <input 
                type="text" 
                value={keyword} 
                onChange={handleInputChange} 
                placeholder="Digite a palavra-chave" 
            />
            <button onClick={handleSearch}>Buscar</button>
        </>
    );
};

export default FiltroPorPalavraChave;