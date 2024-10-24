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
  validateToken: () => {},
});

// Crie o provedor do contexto de autenticação
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserInfo>();
  const decodificador = jwtDecode;
  const navigate = useNavigate(); 

  const login = async (email: string, senha: string) => {
    
    try {
      const response = await api.post('/auth/login', {
        email: email,
        password: senha
      });
      
      var token = response.data.model.token;
    
      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      localStorage.setItem('token', token);

      const decodedToken = jwtDecode(token);
      const jsonUserInfo = JSON.parse(decodedToken.sub as string);
      setUser(jsonUserInfo);
      setIsAuthenticated(true);
      navigate('/dashboard')
    } catch (error) {
      errorSwal((error as any).response.data.error);
    };
  };

  const logout = () => {
    api.defaults.headers.common.Authorization = ``;
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/')
  };

  const validateToken = () => {
    const token = localStorage.getItem('token');
    console.log(`TOKE NO AUTHCONTEXT ${token}`)
    if(token) {
      const decodedToken = jwtDecode(token);
      const jsonUserInfo = JSON.parse(decodedToken.sub as string);
      setUser(jsonUserInfo);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user, validateToken }}>
      {children}
    </AuthContext.Provider>
  );
};