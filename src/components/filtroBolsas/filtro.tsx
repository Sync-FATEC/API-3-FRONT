import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

type FiltroProps = {
    onFilterChange: (keyword: string) => void;
    title: string; 
};

export function FiltroPages({ onFilterChange, title }: FiltroProps) {
    const [keyword, setKeyword] = useState<string>("");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(event.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onFilterChange(keyword);
    };

    return (
        <div id="MainDadosAuth">
            <h2>{title}</h2>
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
