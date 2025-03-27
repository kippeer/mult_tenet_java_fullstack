import {Patient,RegisterRequest} from '../types/index'
const API_URL = 'http://localhost:8080/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Authorization': token ? `Bearer ${token}` : '',
    'Content-Type': 'application/json',
  };
};

export const login = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || 'Login failed');
  }
  
  const data = await response.json();
  if (data.token) {
    localStorage.setItem('token', data.token);
  }
  return data;
};

export const register = async (registerData: RegisterRequest) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(registerData),
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || 'Registration failed');
  }
  
  const data = await response.json();
  if (data.token) {
    localStorage.setItem('token', data.token);
  }
  return data;
};

export const getPatients = async () => {
  const response = await fetch(`${API_URL}/patients`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });
  
  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('token');
      throw new Error('Session expired. Please login again.');
    }
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || 'Failed to fetch patients');
  }
  
  return response.json();
};

export const createPatient = async (patient: Patient) => {
  const response = await fetch(`${API_URL}/patients`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(patient),
  });
  
  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('token');
      throw new Error('Session expired. Please login again.');
    }
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || 'Failed to create patient');
  }
  
  return response.json();
};

export const updatePatient = async (id: number, patient: Patient) => {
  const response = await fetch(`${API_URL}/patients/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(patient),
  });
  
  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('token');
      throw new Error('Session expired. Please login again.');
    }
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || 'Failed to update patient');
  }
  
  return response.json();
};

export const deletePatient = async (id: number) => {
  const response = await fetch(`${API_URL}/patients/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  
  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('token');
      throw new Error('Session expired. Please login again.');
    }
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || 'Failed to delete patient');
  }
};