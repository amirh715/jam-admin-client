import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';

class HttpService extends EventTarget {
  private config: AxiosRequestConfig = {};
  private http: AxiosInstance;

  public constructor(config: AxiosRequestConfig) {
    super();
    config.onUploadProgress = (ev) => {
      const uploadProgressValue = (ev.loaded * 100) / ev.total;
      this.dispatchEvent(new CustomEvent('uploadProgress', { detail: { uploadProgressValue } }));
    };
    this.config = config;
    this.http = axios.create(this.config);
    this.http.interceptors.request.use((config) => {
      if (localStorage.getItem('token')) {
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
      }
      return config;
    });
  }

  public async get(path: string, query?: string, configg?: AxiosRequestConfig)
    : Promise<AxiosResponse> {
    const p = `${this.config.baseURL}${path}${query || ''}`;
    return this.http.get(p, configg || this.config);
  }

  public async post(path: string, data: FormData) : Promise<AxiosResponse> {
    try {
      return await this.http.post(path, data);
    } catch (error) {
      if (error.response && error.response.data) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject(error);
    }
  }

  public async put(path: string, data: FormData) : Promise<AxiosResponse> {
    try {
      return await this.http.put(path, data);
    } catch (error) {
      if (error.response && error.response.data) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject(error);
    }
  }

  public async delete(path: string, data: FormData) : Promise<AxiosResponse> {
    return this.http.delete(path, { data });
  }
}

const INSTANCE = new HttpService({
  baseURL: 'https://api.jamusicapp.ir/v1',
  headers: {
    // 'x-client-version': 'ADMIN_1.0.0',
    'content-type': 'multipart/form-data',
  },
  responseType: 'json',
});

export {
  INSTANCE as HttpService,
};
