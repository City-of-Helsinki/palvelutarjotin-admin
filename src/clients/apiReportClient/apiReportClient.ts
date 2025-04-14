import axios from 'axios';

import { getKultusAdminApiTokenFromStorage } from '../../domain/auth/kultusAdminApiUtils';

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_APP_API_REPORT_URI}`,
  timeout: 30000,
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = getKultusAdminApiTokenFromStorage();
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    if (error instanceof Error) {
      return Promise.reject(error);
    } else {
      return Promise.reject(new Error(JSON.stringify(error)));
    }
  }
);

export enum ROUTES {
  EVENTS_ENROLMENTS = '/palvelutarjotinevent/enrolments/csv/',
}

export default axiosClient;
