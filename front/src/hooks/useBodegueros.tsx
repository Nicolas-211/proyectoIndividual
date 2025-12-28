import { useEffect, useState } from "react";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";

interface Usuario {
  id: string;
  nombre: string;
  apPaterno: string;
  email: string;
}

export default function useBodegueros() {
  const { token, role } = useAuth();

  const [bodegueros, setBodegueros] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token || role !== "admin") return;

    const load = async () => {
      try {
        setLoading(true);

        const res = await api.get("/users?rol=bodeguero", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setBodegueros(res.data ?? []);
      } catch (e) {
        setError("No se pudieron cargar los bodegueros.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [token, role]);

  return { bodegueros, loading, error };
}
