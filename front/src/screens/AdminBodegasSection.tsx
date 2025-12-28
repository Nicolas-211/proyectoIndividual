// src/screens/AdminBodegasSection.tsx
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";

import { styles } from "../config/styles/bodegaStyles";
import useAdminBodegas from "../hooks/useAdminBodegas";

interface Bodega {
  id: number;
  nombre: string;
}

export default function AdminBodegasSection() {
  
const { bodegas, loading, error } = useAdminBodegas();

  const renderItem = ({ item }: { item: Bodega }) => (
    <View style={styles.tableRow}>
      <Text style={[styles.tableCell, { flex: 3 }]}>
        {item.nombre}
      </Text>

      <TouchableOpacity
        style={styles.assignButton}
        onPress={() => console.log("Asignar bodeguero a", item)}
      >
        <Text style={styles.assignButtonText}>Asignar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.root}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Administrar bodegas</Text>

        <TouchableOpacity
          style={styles.newButton}
          onPress={() => console.log("Crear bodega")}
        >
          <Text style={styles.newButtonText}>+ Nueva bodega</Text>
        </TouchableOpacity>
      </View>

      {loading && (
        <View style={styles.loadingBox}>
          <ActivityIndicator />
          <Text>Cargando bodegas...</Text>
        </View>
      )}

      {error && !loading && (
        <Text style={styles.errorText}>{error}</Text>
      )}

      {!loading && !error && (
        <>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, { flex: 3 }]}>
              Bodega
            </Text>
            <Text style={[styles.tableHeaderCell, { flex: 2, textAlign: "right" }]}>
              Acción
            </Text>
          </View>

          <FlatList
            data={bodegas}
            keyExtractor={(item) => String(item.id)}
            renderItem={renderItem}
          />
        </>
      )}
    </SafeAreaView>
  );
}
