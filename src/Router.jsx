import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PatientList from './pages/PatientList';
import PatientForm from './pages/PatientForm';
import Layout from './components/Layout';

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function Router() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={
        <PrivateRoute>
          <Layout>
            <Dashboard />
          </Layout>
        </PrivateRoute>
      } />
      <Route path="/patients" element={
        <PrivateRoute>
          <Layout>
            <PatientList />
          </Layout>
        </PrivateRoute>
      } />
      <Route path="/patients/new" element={
        <PrivateRoute>
          <Layout>
            <PatientForm />
          </Layout>
        </PrivateRoute>
      } />
      <Route path="/patients/:id" element={
        <PrivateRoute>
          <Layout>
            <PatientForm />
          </Layout>
        </PrivateRoute>
      } />
    </Routes>
  );
}

export default Router;