interface AnexosProps {
    nome: string;
    link: string
}

export default function Anexos({ nome, link }: AnexosProps) {
    return (
        <>
        <p>Nome do arquivo:</p>
        <p>{nome}</p>

        <p>Download:</p>
        <a target="_blank" href={link}>Link</a>
      </>
    )
}