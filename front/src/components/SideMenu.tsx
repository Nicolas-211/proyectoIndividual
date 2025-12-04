import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "../config/styles/homeStyles";
import { SideMenuItem, SectionId } from "../config/permissions";

interface SideMenuProps {
  open: boolean;
  items: SideMenuItem[];
  selected: SectionId;
  onSelect: (id: SectionId) => void;
  onLogout: () => void;
  onClose: () => void;
}

export function SideMenu({
  open,
  items,
  selected,
  onSelect,
  onLogout,
  onClose,
}: SideMenuProps) {
  if (!open) return null;

  return (
    <View style={styles.sideMenuWrapper}>
      {/* Fondo oscuro clickeable */}
      <TouchableOpacity
        style={styles.sideMenuBackdrop}
        activeOpacity={1}
        onPress={onClose}
      />

      {/* Panel lateral */}
      <View style={styles.sideMenu}>
        <Text style={styles.sideMenuTitle}>Menú</Text>

        {items.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.sideMenuItem,
              selected === item.id && styles.sideMenuItemActive,
            ]}
            onPress={() => onSelect(item.id)}
          >
            <Text
              style={[
                styles.sideMenuItemText,
                selected === item.id && styles.sideMenuItemTextActive,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}

        <View style={{ marginTop: 16 }}>
          <TouchableOpacity onPress={onLogout}>
            <Text style={[styles.sideMenuItemText, { color: "red" }]}>
              Cerrar sesión
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
