import React, { useState } from 'react';
import { Users, UserPlus, LogIn } from 'lucide-react';
import Login from './components/Login';
import Register from './components/Register';
import PatientList from './components/PatientList';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [showRegister, setShowRegister] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-md mx-auto pt-16 px-4">
          {showRegister ? (
            <div>
              <Register onSuccess={() => setIsAuthenticated(true)} />
              <button
                onClick={() => setShowRegister(false)}
                className="mt-4 text-blue-600 hover:text-blue-800 flex items-center justify-center w-full"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Already have an account? Login
              </button>
            </div>
          ) : (
            <div>
              <Login onSuccess={() => setIsAuthenticated(true)} />
              <button
                onClick={() => setShowRegister(true)}
                className="mt-4 text-blue-600 hover:text-blue-800 flex items-center justify-center w-full"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Create an account
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Users className="w-6 h-6 text-blue-600" />
              <span className="ml-2 text-xl font-semibold">Patient Management</span>
            </div>
            <button
              onClick={handleLogout}
              className="ml-4 px-4 py-2 text-sm font-medium text-red-600 hover:text-red-800"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <PatientList />
      </main>
    </div>
  );
}

export default App;