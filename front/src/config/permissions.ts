// src/config/permissions.ts

export type AppRole = "admin" | "bodeguero" | "usuario" | null;

// 🔥 AHORA SectionId ES UN STRING PARA USAR NAVIGATOR CORRECTAMENTE
export type SectionId = string;

export interface SideMenuItem {
  id: SectionId;
  label: string;
  allow: AppRole[]; // roles permitidos
}

export const SIDE_MENU_ITEMS: SideMenuItem[] = [
  { id: "dashboard", label: "Dashboard", allow: ["admin", "bodeguero", "usuario"] },
  { id: "productos", label: "Productos", allow: ["admin", "usuario"] },
  { id: "bodegas", label: "Bodegas", allow: ["admin", "bodeguero"] },
  { id: "reportes", label: "Reportes", allow: ["admin"] },
  { id: "devoluciones", label: "Devoluciones", allow: ["admin", "bodeguero"] },
  {
  id: "AdminBodegasSection",
  label: "Administrar bodegas",
  allow: ["admin"],
}

];

export function getRoleFlags(role: AppRole) {
  return {
    isAdmin: role === "admin",
    isBodeguero: role === "bodeguero",
    isUsuario: role === "usuario" || !role,
  };
}

export function filterMenuByRole(role: AppRole) {
  return SIDE_MENU_ITEMS.filter((item) =>
    item.allow.includes(role ?? "usuario")
  );
}
