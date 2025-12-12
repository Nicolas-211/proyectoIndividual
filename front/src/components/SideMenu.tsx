import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";

export interface SideMenuItem {
  id: string;
  label: string;
}

interface Props {
  open: boolean;
  items: SideMenuItem[];
  selected: string;
  onSelect: (id: string) => void;
  onLogout: () => void;
  onClose: () => void;
}

export const SideMenu: React.FC<Props> = ({
  open,
  items,
  selected,
  onSelect,
  onLogout,
  onClose,
}) => {
  // Si no está abierto, no renderizamos nada
  if (!open) return null; // 👈 BOOLEAN, no string

  return (
    <View style={styles.wrapper}>
      {/* Fondo oscuro para cerrar al tocar afuera */}
      <Pressable style={styles.backdrop} onPress={onClose} />

      {/* Panel lateral */}
      <View style={styles.menu}>
        <Text style={styles.title}>Menú</Text>

        {items.map((item) => {
          const active = item.id === selected;
          return (
            <TouchableOpacity
              key={item.id}
              style={[styles.item, active && styles.itemActive]}
              onPress={() => onSelect(item.id)}
            >
              <Text
                style={[styles.itemText, active && styles.itemTextActive]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}

        <TouchableOpacity
          style={[styles.item, { marginTop: 20 }]}
          onPress={onLogout}
        >
          <Text style={[styles.itemText, { color: "red" }]}>
            Cerrar sesión
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row",
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  menu: {
    width: "70%",
    backgroundColor: "white",
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  item: {
    paddingVertical: 10,
  },
  itemActive: {
    backgroundColor: "#eee",
    borderRadius: 6,
    paddingHorizontal: 8,
  },
  itemText: {
    fontSize: 16,
  },
  itemTextActive: {
    fontWeight: "bold",
  },
});
