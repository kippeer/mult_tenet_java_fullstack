import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Users, Home, LogOut } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();
  const { logout, user } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">{user?.company.name}</h2>
          <p className="text-sm text-gray-600">{user?.email}</p>
        </div>
        <nav className="p-4">
          <Link
            to="/"
            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg"
          >
            <Home size={20} />
            <span>Dashboard</span>
          </Link>
          <Link
            to="/patients"
            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg"
          >
            <Users size={20} />
            <span>Patients</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg text-red-600 w-full"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </nav>
      </aside>
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}