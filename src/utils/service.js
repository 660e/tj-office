import axios from 'axios';

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
    return response;
  },
  error => {
    switch (error.response.status) {
      case 401:
        sessionStorage.removeItem('token');
        window.location.href = '/#/login';
        break;
    }
    return Promise.reject(error.response.statusText);
  }
);

export { service };
