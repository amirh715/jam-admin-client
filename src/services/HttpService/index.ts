import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import * as _ from 'lodash';

const config : AxiosRequestConfig = {
  baseURL: 'http://localhost:4567/api/v1',
  timeout: 5000,
  headers: {
    // 'x-client-version': 'ADMIN_1.0.0',
    'content-type': 'multipart/form-data',
  },
  responseType: 'json',
};
const http : AxiosInstance = axios.create(config);
http.interceptors.request.use((config) => {
  if (localStorage.getItem('token')) {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return config;
});

class HttpService {
  public static async get(path: string, query?: string, configg?: AxiosRequestConfig)
    : Promise<AxiosResponse> {
    const p = `${config.baseURL}${path}${query || ''}`;
    console.log(`HttpService (get): ${p}`);
    return http.get(p, configg || config);
  }

  public static async post(path: string, data: FormData) : Promise<AxiosResponse> {
    try {
      return await http.post(path, data);
    } catch (error) {
      if (error.response && error.response.data) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject(error);
    }
  }

  public static async put(path: string, data: FormData) : Promise<AxiosResponse> {
    try {
      return await http.put(path, data);
    } catch (error) {
      if (error.response && error.response.data) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject(error);
    }
  }

  public static async delete(path: string, data: FormData) : Promise<AxiosResponse> {
    return http.delete(path, { data });
  }
}

export {
  HttpService,
};
