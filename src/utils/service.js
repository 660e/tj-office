import axios from 'axios';
import { Notify } from 'vant';

const service = axios.create({
  timeout: 10000
});

service.interceptors.request.use(
  config => {
    config.headers.Authorization = `Bearer ${sessionStorage.getItem('token')}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return response.data;
    } else {
      Notify({ type: 'danger', message: '服务器错误' });
    }
  },
  error => {
    switch (error.response.status) {
      case 401:
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        window.location.href = '/#/login';
        break;
      case 404:
        Notify({ type: 'danger', message: error.response.statusText });
        break;
    }
    return Promise.reject(error.response.statusText);
  }
);

export { service };
