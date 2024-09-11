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

    // useEffect(() => {
    //     const validaPermission = async () => {
    
    //     }

    //     const token = localStorage.getItem('token');
    //     const validateToken = async () => {
    //         const isValid = await validadeToken(token || '');
    //         if (isValid === false) {
    //             localStorage.removeItem('token');
    //         }
    //     };

    //     validateToken();
    // }, []);

    if (!isLoading) {
        return <Loading />;
    }
    
    if (!isAuthenticated) {
        return <IsLogged />;
    }

    return <>{children}</>;
}