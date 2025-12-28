import { useEffect, useState } from "react";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";

export interface Bodega {
  id: number;
  nombre: string;
}

export default function useAdminBodegas() {
  const { token, role } = useAuth();

  const [bodegas, setBodegas] = useState<Bodega[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token || role !== "admin") return;

    const load = async () => {
      try {
        setLoading(true);

        const res = await api.get("/bodegas", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setBodegas(res.data ?? []);
      } catch (e) {
        setError("No se pudieron cargar las bodegas.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [token, role]);

  return {
    bodegas,
    loading,
    error,
  };
}
