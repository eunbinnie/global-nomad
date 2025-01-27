/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable no-param-reassign */
import type { AxiosError, AxiosRequestConfig } from 'axios';
import axios from 'axios';

import type { Response } from '@/_types/authentication';

import { getCookie, setCookie } from '@/_utils/cookie';

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  retry?: boolean;
}

const axiosConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
};

declare module 'axios' {
  export interface AxiosRequestConfig {
    authorization?: boolean;
  }
}

const axiosInstance = axios.create(axiosConfig);

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await getCookie('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

const tokenRefresh = async () => {
  const storedRefreshToken = getCookie('refreshToken');
  if (!storedRefreshToken) {
    throw new Error('There is no storedRefreshToken');
  }

  const response = await axiosInstance.post<Response>('/auth/tokens', null);

  const { accessToken, refreshToken: newRefreshToken } = response.data;

  setCookie('accessToken', accessToken);
  setCookie('refreshToken', newRefreshToken);

  return accessToken;
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig | undefined;

    if (originalRequest && error.response?.status === 401 && !originalRequest.retry) {
      originalRequest.retry = true;
      try {
        const newAccessToken = await tokenRefresh();
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return await axiosInstance(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
