import axios from "axios";
import EventBus from "../lib/EventBus";
import localStorage from "../lib/localStorage";

// Set up axios instance
const instance = axios.create({
  baseURL: `https://testing-api.zoneomics.com`,
});

// axios request interceptor
instance.interceptors.request.use(
  (config) => {
    const tokens = localStorage.getToken();
    if (tokens && config.isAuth) {
      // {isAuth:true}
      config.headers.Authorization = `Bearer ${tokens.accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// axios response interceptor
instance.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    const originalConfig = error.config;
    if (error.response) {
      // Access Token was expired
      if (error.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        const tokens = localStorage.getToken();
        if (tokens && tokens.refreshToken) {
          const rs = await axios
            .post(`${process.env.NEXT_PUBLIC_LOCAL_URL}/auth/refresh`, null, {
              headers: {
                Authorization: `Bearer ${tokens.refreshToken}`,
              },
            })
            .then(
              (data) => data,
              // If the refreshToken has expired as well
              (_error) => {
                EventBus.dispatch("logout");
                return Promise.reject(_error);
              }
            );

          const { accessToken, refreshToken } = rs.data.data;
          localStorage.setToken({ accessToken, refreshToken });
          instance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
          return instance(originalConfig);
        }
        EventBus.dispatch("logout");
        return Promise.reject(new Error("No Token exist in the Local Storage"));
      }

      if (error.response.status === 403 && error.response.data) {
        EventBus.dispatch("logout");
        return Promise.reject(error.response.data);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
