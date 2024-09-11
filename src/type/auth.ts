export type AuthContextType = {
    isAuthenticated: boolean;
    login: (email: string, senha: string) => void;
    logout: () => void;
  };
  
export type AuthProviderProps = {
    children: React.ReactNode;
  };
  
export type UserInfo = {
      username: string;
      permisao: string;
  }