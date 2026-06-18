import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");

  // แนบ token ไปกับ request ทุกครั้ง
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    // ถ้า token หมดอายุ หรือไม่ได้รับอนุญาต
    if (status === 401) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");

      // กัน redirect ซ้ำ ถ้าอยู่หน้า login อยู่แล้ว
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);