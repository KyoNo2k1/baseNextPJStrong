import { APP_SAVE_KEY } from '@/shared/utils/constants/appConfig';
import { notification } from 'antd';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { deleteCookie, getCookie } from 'cookies-next';

const shouldRedirectToLogin = true;

class Axios {
  private api: AxiosInstance;

  constructor(baseURL: string, noAuth: boolean) {
    this.api = axios.create({
      baseURL,
      headers: {
        'Access-Control-Expose-Headers': 'X-Total-Count',
        'Content-Type': 'application/json',
      },
    });
    if (!noAuth) {
      this.api.interceptors.request.use(
        config => {
          const accessToken = this.getAccessToken();
          if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
          }
          return config;
        },
        error => {
          return Promise.reject(error);
        },
      );
      this.handleResponse(this.api);
    }
  }

  handleResponse(axios: AxiosInstance) {
    axios.interceptors.response.use(
      async (response: AxiosResponse) => {
        return response;
      },
      async error => {
        if (error.response.status === 403 && typeof window !== 'undefined') {
          // if (shouldRedirectToLogin) window.location.href = '/login';
          // notification.error({ message: 'Permission denied!', placement: 'top' });
          // deleteCookie(APP_SAVE_KEY.TOKEN_KEY);
          // deleteCookie(APP_SAVE_KEY.REFRESH_TOKEN_KEY);
        }
        if (error.response.status === 401 && typeof window !== 'undefined') {
          if (shouldRedirectToLogin) window.location.href = '/login';
          notification.error({ message: 'Your session expired!', placement: 'top' });
          deleteCookie(APP_SAVE_KEY.TOKEN_KEY);
          deleteCookie(APP_SAVE_KEY.REFRESH_TOKEN_KEY);
        }
        return Promise.reject(error);
      },
    );
  }
  async get<T>(url: string, configs?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.api.get<T>(url, configs);
      return response.data;
    } catch (error) {
      console.error('GET request failed:', error);
      throw error;
    }
  }

  async search<T>(url: string, data: any, configs?: AxiosRequestConfig): Promise<{ count: number; data: T }> {
    try {
      const response = await this.api.post<T>(url, data, configs);
      return { count: response.headers?.['x-total-count'] || 0, data: response.data };
    } catch (error) {
      console.error('POST request failed:', error);
      throw error;
    }
  }
  async post<T>(url: string, data: any, configs?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.api.post<T>(url, data, configs);

      return response.data;
    } catch (error) {
      console.error('POST request failed:', error);
      throw error;
    }
  }

  async put<T>(url: string, data?: any, configs?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.api.put<T>(url, data, configs);
      return response.data;
    } catch (error) {
      console.error('PUT request failed:', error);
      throw error;
    }
  }

  async delete<T>(url: string, configs?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.api.delete<T>(url, configs);
      return response.data;
    } catch (error) {
      console.error('DELETE request failed:', error);
      throw error;
    }
  }

  private getAccessToken(): string {
    return getCookie(APP_SAVE_KEY.TOKEN_KEY) as string;
  }
  private getRefreshToken(): string {
    return getCookie(APP_SAVE_KEY.REFRESH_TOKEN_KEY) as string;
  }
}

export const axiosInstanceAuth = new Axios(process.env.NEXT_PUBLIC_DEV_API_URL || 'http://localhost:3001', false);
export const axiosInstanceNoAuth = new Axios(process.env.NEXT_PUBLIC_DEV_API_URL || 'http://localhost:3001', true);

