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
import {
  getRoleFlags,
  filterMenuByRole,
  SectionId,
} from "../config/permissions";
import { styles } from "../config/styles/homeStyles";
import { SideMenu } from "../components/SideMenu";

export default function HomeScreen() {
  const { role, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [section, setSection] = useState<SectionId>("dashboard");

  const { isAdmin, isBodeguero, isUsuario } = getRoleFlags(role);
  const sideMenuItems = filterMenuByRole(role);
  const quickLinks = sideMenuItems.filter((item) => item.id !== "dashboard");

  const handleSelectSection = (id: SectionId) => {
    setSection(id);
    setMenuOpen(false);
  };

  const renderSectionContent = () => {
    switch (section) {
      case "dashboard":
        return (
          <>
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
                (Aquí luego mostraremos datos reales desde el backend)
              </Text>
            </View>
          </>
        );

      case "productos":
        return (
          <>
            <Text style={styles.sectionTitle}>Productos</Text>
            <Text>Acá después podemos listar productos desde tu backend.</Text>
          </>
        );

      case "bodegas":
        return (
          <>
            <Text style={styles.sectionTitle}>Bodegas</Text>
            <Text>Resumen o listado de bodegas.</Text>
          </>
        );

      case "reportes":
        return (
          <>
            <Text style={styles.sectionTitle}>Reportes</Text>
            <Text>Reportes de inventario, rotación, stock, etc.</Text>
          </>
        );

      case "devoluciones":
        return (
          <>
            <Text style={styles.sectionTitle}>Devoluciones</Text>
            <Text>Listado/resumen de devoluciones registradas.</Text>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      {/* Header superior */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => setMenuOpen(true)}
          style={styles.menuButton}
        >
          <Text style={styles.menuIcon}>≡</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Inventario App</Text>
      </View>

      {/* Barra de búsqueda */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Buscar..."
          placeholderTextColor="#888"
          style={styles.searchInput}
        />
      </View>

      {/* Contenido principal */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {renderSectionContent()}

        {/* Quick Links */}
        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>
          Accesos rápidos
        </Text>

        <View style={styles.quickLinksGrid}>
          {quickLinks.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.quickLink}
              onPress={() => handleSelectSection(item.id)}
            >
              <Text style={styles.quickLinkIcon}>📦</Text>
              <Text style={styles.quickLinkLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Botón cerrar sesión */}
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Menú lateral reutilizable */}
      <SideMenu
        open={menuOpen}
        items={sideMenuItems}
        selected={section}
        onSelect={handleSelectSection}
        onLogout={logout}
        onClose={() => setMenuOpen(false)}
      />
    </SafeAreaView>
  );
}
