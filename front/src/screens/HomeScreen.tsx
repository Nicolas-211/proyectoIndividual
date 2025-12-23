import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import { getRoleFlags, filterMenuByRole } from "../config/permissions";
import { styles } from "../config/styles/homeStyles";
import { SideMenu } from "../components/SideMenu";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const { role, logout } = useAuth();
  const navigation = useNavigation();

  const [menuOpen, setMenuOpen] = useState(false);

  const { isAdmin, isBodeguero } = getRoleFlags(role);
  const sideMenuItems = filterMenuByRole(role);
  const quickLinks = sideMenuItems.filter((item) => item.id !== "dashboard");

  // MAPEO: menu → pantallas reales
  const SCREEN_MAP: Record<string, string> = {
    dashboard: "HomeScreen",
    productos: "ProductosSection",
    bodegas: "BodegaSection",
    reportes: "ReportesScreen",
    devoluciones: "DevolucionesScreen",
  };

  const handleSelect = (screenId: string) => {
    setMenuOpen(false);

    const targetScreen = SCREEN_MAP[screenId];

    if (!targetScreen) {
      console.warn("Pantalla no encontrada:", screenId);
      return;
    }

    (navigation as any).navigate(targetScreen);
  };

  return (
    <SafeAreaView style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => setMenuOpen(true)}
          style={styles.menuButton}
        >
          <Text style={styles.menuIcon}>≡</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Inventario App</Text>
      </View>

      {/* Buscador */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Buscar..."
          placeholderTextColor="#888"
          style={styles.searchInput}
        />
      </View>

      {/* CONTENIDO */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        <Text style={styles.sectionTitle}>Resumen general</Text>

        <View style={styles.cardRow}>
          {isAdmin && (
            <View style={[styles.card, styles.cardBlue]}>
              <Text style={styles.cardTitle}>Stock crítico</Text>
              <Text style={styles.cardSubtitle}>5 productos</Text>
            </View>
          )}

          <View style={[styles.card, styles.cardOrange]}>
            <Text style={styles.cardTitle}>Movimientos hoy</Text>
            <Text style={styles.cardSubtitle}>12 movimientos</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            {isBodeguero ? "Mis bodegas" : "Resumen bodegas"}
          </Text>
          <Text style={styles.cardSubtitle}>
            (Aquí se mostrarán datos del backend)
          </Text>
        </View>

        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>
          Accesos rápidos
        </Text>

        <View style={styles.quickLinksGrid}>
          {quickLinks.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.quickLink}
              onPress={() => handleSelect(item.id)}
            >
              <Text style={styles.quickLinkIcon}>📦</Text>
              <Text style={styles.quickLinkLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Menú lateral */}
      <SideMenu
        open={menuOpen}
        items={sideMenuItems}
        selected={"dashboard"}
        onSelect={handleSelect}
        onLogout={logout}
        onClose={() => setMenuOpen(false)}
      />
    </SafeAreaView>
  );
}
