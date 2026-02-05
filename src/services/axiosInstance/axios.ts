import axios from "axios";
import { SystemConstants } from "../../constants/SystemConstants";
import { PATH } from "../../constants/RoutePaths";

const baseURL = import.meta.env.VITE_ENDPOINT || "http://localhost:3000/api";

const instance = axios.create({
  baseURL,
  timeout: 15000,
});

let isRefreshing = false;
let failedQueue: any = [];

const processQueue = (error: any, token = null) => {
  failedQueue.forEach((prom: any) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

instance.interceptors.request.use(
  (cfg) => {
    const token = localStorage.getItem(SystemConstants.ACCESS_TOKEN);
    if (token) cfg.headers.Authorization = `Bearer ${token}`;
    return cfg;
  },
  (e) => Promise.reject(e),
);

instance.interceptors.response.use(
  (r) => r,
  async (error) => {
    const preReq = error.config;

    if (error?.response?.status === 401 && !preReq._retry) {
      if (preReq.url.includes("refresh-token")) {
        localStorage.removeItem(SystemConstants.ACCESS_TOKEN);
        localStorage.removeItem(SystemConstants.REFRESH_TOKEN);
        window.location.href = PATH.LOGIN;
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            preReq.headers.Authorization = `Bearer ${token}`;
            return instance(preReq);
          })
          .catch((err) => Promise.reject(err));
      }

      preReq._retry = true;
      isRefreshing = true;

      const refreshToken = localStorage.getItem(SystemConstants.REFRESH_TOKEN);

      if (!refreshToken) {
        localStorage.removeItem(SystemConstants.ACCESS_TOKEN);
        window.location.href = PATH.LOGIN;
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(`${baseURL}/auth/refresh-token`, {
          refreshToken,
        });

        const { accessToken, refreshToken: newRefreshToken } = response.data;

        localStorage.setItem(SystemConstants.ACCESS_TOKEN, accessToken);
        localStorage.setItem(SystemConstants.REFRESH_TOKEN, newRefreshToken);

        preReq.headers.Authorization = `Bearer ${accessToken}`;
        processQueue(null, accessToken);
        isRefreshing = false;

        return instance(preReq);
      } catch (err) {
        processQueue(err, null);
        isRefreshing = false;

        localStorage.removeItem(SystemConstants.ACCESS_TOKEN);
        localStorage.removeItem(SystemConstants.REFRESH_TOKEN);
        window.location.href = PATH.LOGIN;

        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);

export default instance;
