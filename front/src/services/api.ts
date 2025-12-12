import axios from "axios";

export const api = axios.create({
  baseURL: "http://192.168.1.91:3000",
});

// setear / limpiar token globalmente
export const setApiToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    console.log("TOKEN SETEADO:", api.defaults.headers.common["Authorization"]);
  } else {
    delete api.defaults.headers.common["Authorization"];
    console.log("TOKEN ELIMINADO");
  }
};
