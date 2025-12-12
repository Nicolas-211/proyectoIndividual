import { createContext, useContext, useState, ReactNode } from "react";
import type { AppRole } from "../config/permissions";
import { setApiToken } from "../services/api";

interface AuthState {
  token: string | null;
  role: AppRole | null;
  id: number | null; // <-- SE AGREGA
}

interface AuthContextType extends AuthState {
  user: { token: string; role: AppRole; id: number } | null;
  login: (data: { token: string; role: AppRole; id: number }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    token: null,
    role: null,
    id: null,
  });

  const login = ({ token, role, id }: { token: string; role: AppRole; id: number }) => {
    setState({ token, role, id });
    setApiToken(token);
  };

  const logout = () => {
    setState({ token: null, role: null, id: null });
    setApiToken(null);
  };

  // user derivado
  const user = state.token
    ? { token: state.token, role: state.role as AppRole, id: state.id as number }
    : null;

  return (
    <AuthContext.Provider value={{ ...state, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
};
