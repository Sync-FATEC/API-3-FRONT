import Logout from "../contexts/auth/logout";

export default function PrivateComponent() {
    return (
        <div>
            <h1>Private</h1>
            <p>Se você está vendo essa página, é porque você está autenticado</p>
            <p onClick={Logout}>Logout</p>
        </div>
    )
}