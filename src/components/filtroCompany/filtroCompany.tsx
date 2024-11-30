import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

type FiltroCompanyProps = {
    onFilterChange: (keyword: string) => void;
};

export function FiltroCompany({ onFilterChange }: FiltroCompanyProps) {
    const [keyword, setKeyword] = useState<string>("");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(event.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onFilterChange(keyword);
    };

    return (
        <div id={"MainDadosAuth"}>
            <h2>Busca de Empresas</h2>
            <form onSubmit={handleSubmit} className="filter formularioPesquisaPalavra">
                <input
                    type="text"
                    value={keyword}
                    onChange={handleInputChange}
                    placeholder="Digite a palavra-chave"
                    className="barraNavegacao"
                />
                <button id="botaoPesquisaBorder"  type="submit">
                    <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                </button>
            </form>
        </div>
    );
}
