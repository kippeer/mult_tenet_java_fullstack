import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:8080'
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('@MedicalClinic:token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);