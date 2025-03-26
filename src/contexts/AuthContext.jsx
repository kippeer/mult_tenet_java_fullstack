import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const token = localStorage.getItem('@MedicalClinic:token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        
        if (decodedToken.exp > currentTime) {
          api.defaults.headers.authorization = `Bearer ${token}`;
          setUser(decodedToken);
        } else {
          localStorage.removeItem('@MedicalClinic:token');
        }
      } catch {
        localStorage.removeItem('@MedicalClinic:token');
      }
    }
  }, []);

  const login = async (email, password) => {
    const response = await api.post('/api/auth/login', { email, password });
    const { token } = response.data;
    
    localStorage.setItem('@MedicalClinic:token', token);
    api.defaults.headers.authorization = `Bearer ${token}`;
    
    setUser(jwtDecode(token));
  };

  const register = async (userData) => {
    await api.post('/api/auth/register', userData);
  };

  const logout = () => {
    localStorage.removeItem('@MedicalClinic:token');
    api.defaults.headers.authorization = '';
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);