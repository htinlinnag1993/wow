import Qs from "qs";
import axios from "axios";
// import getAdminSession from "./getAdminSession";

// let url = `/${process.env.REACT_APP_API_VERSION}`;
// if (process.env.NODE_ENV === "production") {
//   url = `${process.env.REACT_APP_API_URL}${url}`;
// }

const URL = "http://localhost:3000/api/";

const axiosInstance = axios.create({
  baseURL: URL,
});

// axiosInstance.defaults.withCredentials = true;
axiosInstance.defaults.paramsSerializer = (params) =>
  Qs.stringify(params, {arrayFormat: "brackets"});

// const storageKey = process.env.REACT_APP_LOCAL_STORAGE_KEY;
/**
 * on each request we need to send auth headers
 */
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const platform = getAdminSession();
//     const {accessToken} = JSON.parse(localStorage.getItem(storageKey)) ?? {};
//     Object.assign(config.headers.common, {
//       authorization: `Bearer ${accessToken}`,
//       client: platform.client,
//       platform: platform.platform,
//     });

//     return config;
//   },
//   (error) => Promise.reject(error),
// );

/**
 * on each response we need to grab the auth headers
 * and persist it to a local storage
 */

// axiosInstance.interceptors.response.use(
//   (response) => {
//     const accessToken = response.headers.authorization;
//     if (accessToken) {
//       localStorage.setItem(storageKey, JSON.stringify({accessToken}));
//     }
//     return response;
//   },
//   (error) => Promise.reject(error),
// );

const {get, put, post, delete: destroy, patch} = axiosInstance;

export {get, put, post, destroy, patch};
export default {
  get,
  put,
  post,
  destroy,
  patch,
};
