// src/config/styles/bodegaStyles.ts
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  title: {
    fontSize: 22,
    fontWeight: "600",
  },

  newButton: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 6,
  },

  newButtonText: {
    color: "#fff",
    fontWeight: "500",
  },

  tableHeader: {
    flexDirection: "row",
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderColor: "#e5e7eb",
  },

  tableHeaderCell: {
    fontWeight: "600",
    color: "#374151",
  },

  tableRow: {
    flexDirection: "row",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#f1f5f9",
  },

  tableCell: {
    color: "#111827",
  },

  roleText: {
    textAlign: "right",
    color: "#6b7280",
  },

  emptyText: {
    marginTop: 20,
    textAlign: "center",
    color: "#6b7280",
  },

  loadingBox: {
    marginTop: 40,
    alignItems: "center",
  },

  errorText: {
    marginTop: 20,
    color: "#dc2626",
    textAlign: "center",
  },

  assignButton: {
  marginLeft: 12,
  backgroundColor: "#10b981", // verde
  paddingHorizontal: 12,
  paddingVertical: 6,
  borderRadius: 6,
  justifyContent: "center",
  alignItems: "center",
},

assignButtonText: {
  color: "#fff",
  fontSize: 12,
  fontWeight: "500",
},

});
