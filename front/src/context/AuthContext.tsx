// src/context/AuthContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";
import type { AppRole } from "../config/permissions";

interface AuthState {
  token: string | null;
  role: AppRole;
}

interface AuthContextType extends AuthState {
  login: (data: { token: string; role: AppRole }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    token: null,
    role: null,
  });

  const login = ({ token, role }: { token: string; role: AppRole }) => {
    setState({ token, role });
  };

  const logout = () => {
    setState({ token: null, role: null });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
};
