// src/screens/BodegaSection.tsx
import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import useProductosPorBodega from "../hooks/useProductosPorBodega";
import { styles } from "../config/styles/bodegaStyles";

export default function BodegaSection() {
  const { bodegas, loading, error } = useProductosPorBodega();
  const {role} = useAuth();

  const renderItem = ({ item }: any) => (
    <View style={styles.tableRow}>
      <Text style={[styles.tableCell, { flex: 3 }]}>
        {item.nombre}
      </Text>
      <Text style={[styles.tableCell, styles.roleText, { flex: 2 }]}>
      {role ?? "-"}
    </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.root}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Mis bodegas</Text>

        <TouchableOpacity
          style={styles.newButton}
          onPress={() => console.log("Crear bodega (TODO)")}
        >
          <Text style={styles.newButtonText}>+ Nueva bodega</Text>
        </TouchableOpacity>
      </View>

      {/* ESTADOS */}
      {loading && (
        <View style={styles.loadingBox}>
          <ActivityIndicator />
          <Text>Cargando bodegas...</Text>
        </View>
      )}

      {error && !loading && (
        <Text style={styles.errorText}>{error}</Text>
      )}

      {/* TABLA */}
      {!loading && !error && (
        <>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, { flex: 3 }]}>
              Bodega
            </Text>
            <Text
              style={[
                styles.tableHeaderCell,
                { flex: 2, textAlign: "right" },
              ]}
            >
              Rol
            </Text>
          </View>

          <FlatList
            data={bodegas}
            keyExtractor={(item) =>
              String(item.idRelacion ?? item.bodegaId)
            }
            renderItem={renderItem}
            ListEmptyComponent={
              <Text style={styles.emptyText}>
                No tienes bodegas asignadas.
              </Text>
            }
          />
        </>
      )}
    </SafeAreaView>
  );
}
