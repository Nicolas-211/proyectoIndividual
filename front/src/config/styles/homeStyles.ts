import { StyleSheet, Platform, StatusBar } from "react-native";

const STATUS_BAR_HEIGHT =
  Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0;

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    paddingTop: STATUS_BAR_HEIGHT,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#222",
    paddingHorizontal: 12,
    paddingVertical: 12,
  },

  menuButton: {
    paddingHorizontal: 12,
    paddingVertical: 10,
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

  // -------------------------------
  //    TARJETAS (CARDS)
  // -------------------------------
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  card: {
    width: "48%",
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

  // -------------------------------
  //    QUICK LINKS (BOTONERA)
  // -------------------------------
  quickLinksGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 8,
  },

  quickLink: {
    width: "30%",
    aspectRatio: 1,
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
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

  // -------------------------------
  //    SIDE MENU (MENÚ LATERAL)
  // -------------------------------
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
