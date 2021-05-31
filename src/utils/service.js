import axios from 'axios';
import { Toast } from 'vant';
import { $GLOBAL } from '@/global.js';

const noAuthorization = ['/workstation/Common/processQRCode', '/workstation/User/regUserInfo'];
const service = axios.create({
  timeout: 10000
});

service.interceptors.request.use(
  config => {
    if (!noAuthorization.includes(config.url)) {
      config.headers.Authorization = `Bearer ${sessionStorage.getItem('token')}`;
    }
    if (process.env.NODE_ENV === 'production') {
      config.url = `${$GLOBAL.url.api}${config.url}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => {
    switch (response.status) {
      case 200:
        return response.data;
      default:
        Toast.fail(response.status);
        break;
    }
  },
  error => {
    switch (error.response.status) {
      case 401:
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        window.location.href = '/#/login';
        break;
      default:
        Toast.fail(error.response.status);
        break;
    }
    return Promise.reject(error.response.statusText);
  }
);

export { service };
