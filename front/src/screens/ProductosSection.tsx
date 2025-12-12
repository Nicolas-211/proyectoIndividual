// src/screens/ProductosSection.tsx
import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";

import useProductosPorBodega from "../hooks/useProductosPorBodega";
import { styles } from "../config/styles/productStyles";

export default function ProductosSection() {
  const {
    bodegas,
    selectedBodegaId,
    setSelectedBodegaId,
    productosDeBodega,
    loading,
    error,
  } = useProductosPorBodega();

 const selectedBodega = bodegas.find((b) => b.bodegaId === selectedBodegaId);


  const handleChangeBodega = () => {
    // Aquí después puedes abrir un modal/bottom sheet
    // por ahora dejemos solo el log
    console.log("Cambiar bodega (TODO)");
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.tableRow}>
      <Text style={[styles.tableCell, { flex: 3 }]} numberOfLines={1}>
        {item.producto?.nombre ?? "-"}
      </Text>
      <Text style={[styles.tableCell, { flex: 1, textAlign: "right" }]}>
        {item.stockActual ?? 0}
      </Text>
      <Text style={[styles.tableCell, { flex: 1, textAlign: "right" }]}>
        ${item.producto?.precio ?? 0}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.root}>
      {/* HEADER SUPERIOR */}
      <View style={styles.topHeader}>
        <View style={styles.topHeaderLeft}>
          <Text style={styles.screenTitle}>Productos</Text>
          <Text style={styles.screenSubtitle}>
            Gestión de stock por bodega
          </Text>
        </View>

        <TouchableOpacity
          style={styles.newButton}
          onPress={() => console.log("Nuevo producto (TODO)")}
        >
          <Text style={styles.newButtonText}>+ Nuevo producto</Text>
        </TouchableOpacity>
      </View>

      {/* TARJETA DE BODEGA SELECCIONADA */}
      <View style={styles.bodegaCard}>
        <Text style={styles.bodegaLabel}>Bodega seleccionada</Text>

        <TouchableOpacity
          style={styles.bodegaSelector}
          onPress={handleChangeBodega}
          activeOpacity={0.8}
        >
          <View style={styles.bodegaAvatar}>
            <Text style={styles.bodegaAvatarText}>🏬</Text>
          </View>

          <View style={styles.bodegaTextWrapper}>
            <Text style={styles.bodegaName}>
              {selectedBodega?.nombre ?? "Sin bodega"}
            </Text>
            <Text style={styles.bodegaHint}>
              Toca aquí para cambiar de bodega
            </Text>
          </View>

          <Text style={styles.bodegaChevron}>▾</Text>
        </TouchableOpacity>
      </View>

      {/* ESTADO DE CARGA / ERROR */}
      {loading && (
        <View style={styles.loadingBox}>
          <ActivityIndicator />
          <Text style={styles.loadingText}>Cargando productos...</Text>
        </View>
      )}

      {error && !loading && (
        <View style={styles.loadingBox}>
          <Text style={styles.loadingText}>{error}</Text>
        </View>
      )}

      {/* TABLA DE PRODUCTOS */}
      {!loading && !error && (
        <>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, { flex: 3 }]}>
              Producto
            </Text>
            <Text
              style={[
                styles.tableHeaderCell,
                { flex: 1, textAlign: "right" },
              ]}
            >
              Stock
            </Text>
            <Text
              style={[
                styles.tableHeaderCell,
                { flex: 1, textAlign: "right" },
              ]}
            >
              Precio
            </Text>
          </View>

          <FlatList
            data={productosDeBodega}
            keyExtractor={(item) => String(item.id)}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 16 }}
            ListEmptyComponent={
              <View style={styles.emptyBox}>
                <Text style={styles.emptyText}>
                  No hay productos asignados a esta bodega.
                </Text>
              </View>
            }
          />
        </>
      )}
    </SafeAreaView>
  );
}
