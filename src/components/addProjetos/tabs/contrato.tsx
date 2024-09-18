import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip, faTrash} from '@fortawesome/free-solid-svg-icons';
export default function Contratos () {
    return(
        
        <div className="documents">
            <h4>Nenhum documento anexado</h4>
            <button>
            <FontAwesomeIcon icon={faPaperclip} style={{color: "#FFFFF", fontSize: "24px"}} />
            Anexar
            </button>
        </div>
        
        
    )
}