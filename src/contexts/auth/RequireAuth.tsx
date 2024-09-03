import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../components/loading";
import IsLogged from "../../components/isLogged";

interface RequireAuthProps {
    children: React.ReactNode;
}

export const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const validadeToken = async (token: string) => {
            try {
                const response = await axios.post('http://localhost:5000/users/validateToken', { token: token });
                localStorage.setItem('token', response.data.success.token);
                setIsLoading(true);
                setIsAuthenticated(true);
                return response.data.success.token;
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    if (error.response) {
                        console.error('Erro na resposta da API:', error.response.data);
                        setIsLoading(true);
                        return false;
                    }
                } else {
                    console.error('Erro desconhecido:', error);
                    setIsLoading(true);
                    return false;
                }
            }
        }

        const token = localStorage.getItem('token');
        const validateToken = async () => {
            const isValid = await validadeToken(token || '');
            if (isValid === false) {
                localStorage.removeItem('token');
            }
        };

        validateToken();
    }, []);

    if (!isLoading) {
        return <Loading />;
    }
    
    if (!isAuthenticated) {
        return <IsLogged />;
    }

    return <>{children}</>;
}