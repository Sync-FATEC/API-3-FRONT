export type Projetos = {
    id: string;
    referenciaDoProjeto: string;
    empresa: string;
    objetivo: string;
    descricao: string;
    valorDoProjeto: number;
    dataInicio: string;
    dataTermino: string;
    situacao: string;
    classificacao: string;
    coordenador: {
        id: string;
        nome: string;
        usuario: string | null;
    };
    anexos: {
        id: string;
        nome: string;
        tipo: string;
        url: string;
    }[];
}