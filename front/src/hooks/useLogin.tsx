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
      const backendRole = res.data.user?.rol as AppRole;

      // 🚀 ESTO DISPARA setApiToken(token)
      login({
        token, role: backendRole || "usuario",
        id: res.data.user?.id
      });

      console.log("Respuesta login:", res.data);

    } catch (e: any) {
      console.log("Error en login:", e?.response?.data || e);
      Alert.alert("Error", "Credenciales incorrectas");
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    password,
    setEmail,
    setPassword,
    handleLogin,
    loading,
  };
}
