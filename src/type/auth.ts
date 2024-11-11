export type AuthContextType = {
    isAuthenticated: boolean;
    login: (email: string, senha: string) => void;
    logout: () => void;
    user?: UserInfo;
    validateToken: () => void;
  };
  
export type AuthProviderProps = {
    children: React.ReactNode;
  };
  
export type UserInfo = {
      name: string;
      role: string;
  }