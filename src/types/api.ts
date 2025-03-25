export interface Company {
  id: number;
  name: string;
  users: User[];
}

export interface Patient {
  id: number;
  name: string;
  birthDate: string;
  email: string;
  company: Company;
}

export interface User {
  id: number;
  email: string;
  password: string;
  company: Company;
}

export interface RegisterRequest {
  companyName: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}