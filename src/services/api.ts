const API_URL = 'http://localhost:8080/api';

export const login = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  
  if (!response.ok) {
    throw new Error('Login failed');
  }
  
  const data = await response.json();
  localStorage.setItem('token', data.token);
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
    throw new Error('Registration failed');
  }
  
  return response.json();
};

export const getPatients = async () => {
  const response = await fetch(`${API_URL}/patients`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch patients');
  }
  
  return response.json();
};

export const createPatient = async (patient: Patient) => {
  const response = await fetch(`${API_URL}/patients`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(patient),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create patient');
  }
  
  return response.json();
};

export const updatePatient = async (id: number, patient: Patient) => {
  const response = await fetch(`${API_URL}/patients/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(patient),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update patient');
  }
  
  return response.json();
};

export const deletePatient = async (id: number) => {
  const response = await fetch(`${API_URL}/patients/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete patient');
  }
};