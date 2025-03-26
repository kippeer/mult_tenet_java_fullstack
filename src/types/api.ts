export interface Company {
  id: number;
  name: string;
  users: User[];
}
export interface Patient {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  gender: string;
  addressStreet: string;
  addressNumber: string;
  addressComplement: string;
  addressNeighborhood: string;
  addressCity: string;
  addressState: string;
  addressZipCode: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  healthInsurance: string;
  healthInsuranceNumber: string;
  allergies: string;
  medicalObservations: string;
  createdAt?: string;
  updatedAt?: string;
  name?: string;
  appointments?: Appointment[];
  medicalRecords?: MedicalRecord[];
  invoices?: Invoice[];
  companyId?: number;
}

export interface Appointment {
  id: number;
  patientId: number;
  date: string;
  status: string;
}

export interface MedicalRecord {
  id: number;
  patientId: number;
  date: string;
  description: string;
}

export interface Invoice {
  id: number;
  patientId: number;
  date: string;
  amount: number;
  status: string;
}

export interface User {
  id: number;
  email: string;
  password: string;
  company: Company;
}

export interface RegisterRequest {
  company: string;
  email: string;
  password: string;
  firstName: string;  // Adicione este campo
  lastName: string;   // Adicione este campo
}
export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}