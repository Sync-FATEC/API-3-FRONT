import api from '../api/api';

enum TipoAnexo {
    CONTRATO,
    ARTIGO,
    PROPOSTA
}

interface Anexo {
    id: number;
    nome: string;
    tipo: TipoAnexo;
}

const useAnexo = () => {

    const adicionarAnexo = async (nome: string, arquivo: File, tipoAnexo: TipoAnexo) => {
        const formData = new FormData();
        formData.append('nome', nome);
        formData.append('arquivo', arquivo);
        formData.append('tipoAnexo', tipoAnexo.toString());

        try {
            const response = await api.post('/documents/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 200) {
                alert("Deu certo!")
            } else {
                console.error('Erro ao adicionar anexo:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao adicionar anexo:', error);
        }
    };

    return {
        adicionarAnexo,
    };
};

export default useAnexo;