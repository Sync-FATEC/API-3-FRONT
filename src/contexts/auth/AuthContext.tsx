import React, { createContext, useState } from "react";
import api from "../../api/api";
import { errorSwal } from "../../components/swal/errorSwal";
import { jwtDecode } from 'jwt-decode';
import { AuthContextType, AuthProviderProps, UserInfo } from "../../type/auth";
import { decode } from "punycode";
import { useNavigate } from "react-router-dom";



// Crie o contexto de autenticação
export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

// Crie o provedor do contexto de autenticação
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserInfo>();
  const decodificador = jwtDecode;
  const navigate = useNavigate(); 

  const login = async (email: string, senha: string) => {
    
    const response = await api.post("/auth/login", {
      email: email,
      password: senha,
    });

    if(response.status === 200){
        var token = response.data.model.token;
    
        api.defaults.headers["Authorization"] = `Bearer ${token}`;
        
        const decodedToken = jwtDecode(token);
        const jsonUserInfo = JSON.parse(decodedToken.sub as string);
        console.log(jsonUserInfo);
        setUser(jsonUserInfo);
        setIsAuthenticated(true);
        navigate('/sidebar')

    } else {
        errorSwal(response.data.error);
    }
  };

  const logout = () => {
    api.defaults.headers.common.Authorization = ``;
    setIsAuthenticated(false);
    navigate('/')
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};
