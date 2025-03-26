import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (data: { email: string; password: string }) => {
  const response = await api.post('/auth/login', data);
  localStorage.setItem('token', response.data.token);
  return response.data;
};

export const register = async (data: { company: string; firstName: string; lastName: string; email: string; password: string }) => {
  const response = await api.post('/auth/register', data);
  return response.data;
};

export const getPatients = async () => {
  const response = await api.get('/patients');
  return response.data;
};

export const getPatient = async (id: number) => {
  const response = await api.get(`/patients/${id}`);
  return response.data;
};

export const createPatient = async (data: any) => {
  const response = await api.post('/patients', data);
  return response.data;
};

export const updatePatient = async (id: number, data: any) => {
  const response = await api.put(`/patients/${id}`, data);
  return response.data;
};

export const deletePatient = async (id: number) => {
  const response = await api.delete(`/patients/${id}`);
  return response.data;
};

export default api;