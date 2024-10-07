import { link, stat } from 'fs';
import React, { useState } from 'react';
import { api, links } from '../../../api/api';
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

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(event.target.value);
    };

    const handleSearch = async () => {
        try {
            const response = await api.get(`/projects/getAll?keyword=${keyword}&dataInicio=${dataInicio}&dataFim=${dataFim}&status=${status}&classificacao=${classificacao}`);
            if(response.status === 200 && response.data != null) {
            } else {
                errorSwal('Nenhum projeto encontrado');
            }
            onSearch(keyword);
        } catch (error) {
            errorSwal('Erro ao buscar projetos');
        }


    };

    return (
        <div>
            <input 
                type="text" 
                value={keyword} 
                onChange={handleInputChange} 
                placeholder="Digite a palavra-chave" 
            />
            <button onClick={handleSearch}>Buscar</button>
        </div>
    );
};

export default FiltroPorPalavraChave;