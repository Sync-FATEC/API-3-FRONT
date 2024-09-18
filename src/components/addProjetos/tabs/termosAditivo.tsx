import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function TermosAditivo() {
    return (
        <div className="documents">
            <div className='anexado'>
                <h4>Documento.pdf</h4>
                <button>
                    <FontAwesomeIcon icon={faTrash} style={{ color: "#FFFFF", fontSize: "20px" }} />
                    Excluir
                </button>
            </div>

            <button>
                <FontAwesomeIcon icon={faPaperclip} style={{ color: "#FFFFF", fontSize: "24px" }} />
                Anexar
            </button>
        </div>
    )
}