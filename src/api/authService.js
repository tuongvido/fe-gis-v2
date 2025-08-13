import api from "./api"; // default import
import Cookies from "js-cookie";

export const login = async (username, password) => {
  const response = await api.post("/users/login", { username, password });
  const token = response.token;

  // Lưu token vào cookie
  Cookies.set("token", token); 
  return response.data;
};

export const logout = () => {
  Cookies.remove("token");
};

export const changePassword = async (oldPass, newPass) => {
  return await api.post("/auth/change-password", { oldPass, newPass });
};
