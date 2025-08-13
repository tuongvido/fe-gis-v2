import { getCookie } from "../utils/cookie";

const API_BASE_URL = "http://localhost:8080/api";

async function request(url, method = "GET", body) {
  const token = getCookie("token");

  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    credentials: "include", // gửi cookie nếu server cần
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const res = await fetch(`${API_BASE_URL}${url}`, options);

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Request failed");
  }

  return res.json();
}

const api = {
  get: (url) => request(url, "GET"),
  post: (url, body) => request(url, "POST", body),
  put: (url, body) => request(url, "PUT", body),
  delete: (url) => request(url, "DELETE"),
};

export default api;
