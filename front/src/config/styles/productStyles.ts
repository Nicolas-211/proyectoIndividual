// src/config/styles/productosStyles.ts
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#f4f4f6",
  },

  // HEADER SUPERIOR
  topHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    backgroundColor: "#fff",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ddd",
  },
  topHeaderLeft: {
    flex: 1,
    paddingRight: 8,
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  screenSubtitle: {
    fontSize: 12,
    color: "#777",
    marginTop: 2,
  },
  newButton: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
  },
  newButtonText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },

  // TARJETA BODEGA
  bodegaCard: {
    marginTop: 8,
    marginHorizontal: 16,
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  bodegaLabel: {
    fontSize: 12,
    color: "#888",
    marginBottom: 6,
  },
  bodegaSelector: {
    flexDirection: "row",
    alignItems: "center",
  },
  bodegaAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#e0edff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  bodegaAvatarText: {
    fontSize: 18,
  },
  bodegaTextWrapper: {
    flex: 1,
  },
  bodegaName: {
    fontSize: 16,
    fontWeight: "600",
  },
  bodegaHint: {
    fontSize: 11,
    color: "#888",
    marginTop: 2,
  },
  bodegaChevron: {
    fontSize: 16,
    color: "#666",
    marginLeft: 8,
  },

  // ESTADOS
  loadingBox: {
    marginTop: 16,
    marginHorizontal: 16,
    padding: 12,
    alignItems: "center",
  },
  loadingText: {
    marginTop: 6,
    fontSize: 13,
    color: "#555",
  },
  emptyBox: {
    marginTop: 12,
    marginHorizontal: 16,
    paddingVertical: 16,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 13,
    color: "#777",
  },

  // TABLA
  tableHeader: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginTop: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#ddd",
    backgroundColor: "#f9fafb",
  },
  tableHeaderCell: {
    fontSize: 13,
    fontWeight: "600",
    color: "#444",
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#eee",
  },
  tableCell: {
    fontSize: 13,
    color: "#222",
  },
});
