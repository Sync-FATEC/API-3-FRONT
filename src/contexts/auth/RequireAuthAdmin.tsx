import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

interface RequireAuthProps {
    children: React.ReactNode;
}

const RequireAuthAdmin: React.FC<RequireAuthProps> = ({ children }) => {
    const { isAuthenticated, user } = useContext(AuthContext);

    if (!isAuthenticated || user?.role !== 'ADMIN') {
        return <Navigate to="/auth" />;
    }

    return <>{children}</>;
};

export default RequireAuthAdmin;