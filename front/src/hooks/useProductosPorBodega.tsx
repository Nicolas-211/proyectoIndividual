import { useEffect, useState } from "react";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";

interface Bodega {
  id: number | null;
  idRelacion: number;
  bodegaId: number;
  nombre: string;
  rolEnBodega?: string;
}

interface Producto {
  id: string;
  nombre: string;
  precio: number;
}

interface ProductoBodegaItem {
  id: number;
  stockInicial: number;
  stockActual: number;
  producto: Producto;
}

export default function useProductosPorBodega() {
  const { token, user } = useAuth();

  const [bodegas, setBodegas] = useState<Bodega[]>([]);
  const [selectedBodegaId, setSelectedBodegaId] = useState<number | null>(null);
  const [items, setItems] = useState<ProductoBodegaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ===============================
  // 1) Cargar bodegas del usuario
  // ===============================
  useEffect(() => {
    if (!token || !user) return;

    const load = async () => {
      try {
        setLoading(true);
        const authHeader = { Authorization: `Bearer ${token}` };

        const res = await api.get(`/usuario-bodega/usuario/${user.id}`, {
          headers: authHeader,
        });

        const list: Bodega[] = res.data || [];
        setBodegas(list);

        if (list.length === 0) {
          setSelectedBodegaId(null);
          setItems([]);
          return;
        }

        // Primera bodega por defecto
        if (!selectedBodegaId) {
          setSelectedBodegaId(list[0].bodegaId);
        }
      } catch (e) {
        setError("No se pudieron cargar las bodegas del usuario.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [token, user]);

  // ===============================
  // 2) Cargar productos de la bodega
  // ===============================
  useEffect(() => {
    if (!selectedBodegaId || !token) return;

    const loadProductos = async () => {
      try {
        setLoading(true);
        const authHeader = { Authorization: `Bearer ${token}` };
        const res = await api.get(
          `/producto-bodega/bodega/${selectedBodegaId}`,
          { headers: authHeader }
        );

        const data = Array.isArray(res.data?.data) ? res.data.data : [];
        setItems(data);
      } catch (e) {
        setError("No se pudieron cargar los productos de la bodega.");
      } finally {
        setLoading(false);
      }
    };

    loadProductos();
  }, [selectedBodegaId, token]);

  return {
    bodegas,
    selectedBodegaId,
    setSelectedBodegaId,
    productosDeBodega: items,
    loading,
    error,
  };
}
