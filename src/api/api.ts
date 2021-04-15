import axios from 'axios';

export const makeApi = () => {
  const api = axios.create({
    baseURL: `https://ya-praktikum.tech/api/v2`,
    timeout: 5000,
    withCredentials: true
  });
  api.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
  );
  return api;
};

export const makeLocalApi = () => {
  const api = axios.create({
    baseURL: `/api/`,
    timeout: 5000,
    withCredentials: true
  });
  api.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
  );
  return api;
};
