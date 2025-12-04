import { StyleSheet, Platform, StatusBar } from "react-native";

const STATUS_BAR_HEIGHT =
  Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0;

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    paddingTop: STATUS_BAR_HEIGHT, // evita quedar pegado a la barra de estado en Android
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#222",
    paddingHorizontal: 12,
    paddingVertical: 12, // un poquito más alto
  },
  menuButton: {
    paddingHorizontal: 12,
    paddingVertical: 10, // área táctil más grande
    marginRight: 8,
  },
  menuIcon: {
    color: "white",
    fontSize: 22,
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  searchContainer: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#333",
  },
  searchInput: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  cardRow: {
    flexDirection: "row",
    columnGap: 8,
    marginBottom: 12,
  },
  card: {
    flex: 1,
    backgroundColor: "white",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  cardBlue: {
    backgroundColor: "#e6f0ff",
  },
  cardOrange: {
    backgroundColor: "#ffe9d6",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 13,
    color: "#555",
  },
  quickLinksGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 8,
  },
  quickLink: {
    width: "30%",
    aspectRatio: 1,
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  quickLinkIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  quickLinkLabel: {
    fontSize: 13,
    textAlign: "center",
  },
  logoutButton: {
    marginTop: 24,
    alignSelf: "center",
    backgroundColor: "#d9534f",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  logoutText: {
    color: "white",
    fontWeight: "bold",
  },
  sideMenuWrapper: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row",
  },
  sideMenuBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  sideMenu: {
    width: "70%",
    backgroundColor: "white",
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  sideMenuTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  sideMenuItem: {
    paddingVertical: 10,
  },
  sideMenuItemActive: {
    backgroundColor: "#eee",
    borderRadius: 6,
    paddingHorizontal: 8,
  },
  sideMenuItemText: {
    fontSize: 16,
  },
  sideMenuItemTextActive: {
    fontWeight: "bold",
  },
});
