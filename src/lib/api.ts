import {Patient} from '../types/api'

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

// Função para converter formatos de data
const formatDate = (dateString: string, toBackend: boolean = true): string => {
  if (!dateString) return '';
  
  if (toBackend) {
    // Converte de yyyy-MM-dd (front) para dd/MM/yyyy (back)
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  }
  
  // Converte de dd/MM/yyyy (back) para yyyy-MM-dd (front)
  const [day, month, year] = dateString.split('/');
  return `${year}-${month}-${day}`;
};

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const login = async (data: { email: string; password: string }) => {
  const response = await api.post('/auth/login', data);
  localStorage.setItem('token', response.data.token);
  return response.data;
};

export const register = async (data: { company: string; firstName: string; lastName: string; email: string; password: string }) => {
  const response = await api.post('/auth/register', data);
  return response.data;
};

export const getPatients = async (): Promise<Patient[]> => {
  const response = await api.get('/patients');
  return response.data.map((patient: any) => ({
    ...patient,
    birthDate: formatDate(patient.birthDate, false)
  }));
};

export const getPatient = async (id: number): Promise<Patient> => {
  const response = await api.get(`/patients/${id}`);
  return {
    ...response.data,
    birthDate: formatDate(response.data.birthDate, false)
  };
};

export const createPatient = async (data: Patient): Promise<Patient> => {
  const formattedData = {
    ...data,
    birthDate: formatDate(data.birthDate)
  };
  const response = await api.post('/patients', formattedData);
  return response.data;
};

export const updatePatient = async (id: number, data: Patient): Promise<Patient> => {
  const formattedData = {
    ...data,
    birthDate: formatDate(data.birthDate)
  };
  const response = await api.put(`/patients/${id}`, formattedData);
  return response.data;
};

export const deletePatient = async (id: number): Promise<void> => {
  await api.delete(`/patients/${id}`);
};

export default api;