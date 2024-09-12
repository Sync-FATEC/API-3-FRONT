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
    
    const login = async (email: string, senha: string) => {
      try {
        const response = await api.post("/auth/login", {
          email,
          password: senha,
        });

        if (response.status === 200) {
          try {
            const token = response.data.model.token;
            api.defaults.headers["Authorization"] = `Bearer ${token}`;
    
            try {
              const decodedToken = jwtDecode(token);
              const jsonUserInfo = JSON.parse(decodedToken.sub as string);
              console.log(jsonUserInfo);
    
              
              setUser(jsonUserInfo);
              setIsAuthenticated(true);
    
             
              navigate('/sidebar');
            } catch (decodeError) {
              
              console.error("Erro ao decodificar o token:", decodeError);
              errorSwal("Erro ao processar as informações do usuário.");
            }
          } catch (tokenError) {
            
            console.error("Erro ao processar o token:", tokenError);
            errorSwal("Erro ao configurar o token. Por favor, tente novamente.");
          }
        } else {
          
          errorSwal(response.data.error);
        }
      } catch (apiError) {
        
        console.error("Erro ao fazer login:", apiError);
        errorSwal("Erro ao fazer login. Por favor, tente novamente.");
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
}};
