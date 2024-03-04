import axios from 'axios';

import { store } from '../../domain/app/store';
import { apiTokenSelector } from '../../domain/auth/selectors';

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_APP_API_REPORT_URI}`,
  timeout: 30000,
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = apiTokenSelector(store.getState());
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export enum ROUTES {
  EVENTS_ENROLMENTS = '/palvelutarjotinevent/enrolments/csv/',
}

export default axiosClient;
