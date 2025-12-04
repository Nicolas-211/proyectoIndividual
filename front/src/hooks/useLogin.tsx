// src/hooks/useLogin.ts
import { useState } from "react";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { Alert } from "react-native";
import type { AppRole } from "../config/permissions";

export default function useLogin() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    try {
      const res = await api.post("/auth/login", { email, password });

      console.log("Respuesta login:", res.data);

      const token = res.data.access_token;

      // Cuando tengas el rol real del backend, lo usas aquí:
      // const role: AppRole = res.data.role;
      const role: AppRole = "admin"; // por ahora, para probar

      login({ token, role });
    } catch (e: any) {
      console.log("Error en login:", e?.response?.data || e);
      Alert.alert("Error", "Credenciales incorrectas");
    } finally {
      setLoading(false);
    }
  };

  return { email, password, setEmail, setPassword, handleLogin, loading };
}
