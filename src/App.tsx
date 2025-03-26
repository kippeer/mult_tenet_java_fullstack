import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PatientList from './pages/PatientDetails';
import PatientForm from './pages/PatientForm';
import Layout from './components/Layout';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const token = useAuthStore((state) => state.token);
  return token ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="patients" element={<PatientList />} />
          <Route path="patients/new" element={<PatientForm />} />
          <Route path="patients/:id" element={<PatientForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;