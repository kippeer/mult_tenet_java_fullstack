import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { UserPlus, Users, Building } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';

export default function Dashboard() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <Building className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Company</h3>
                <p className="text-gray-600">{user?.company.name}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-full">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Total Users</h3>
                <p className="text-gray-600">{user?.company.users.length}</p>
              </div>
            </div>
          </div>

          <div 
            className="bg-white p-6 rounded-lg shadow-sm border cursor-pointer hover:bg-gray-50"
            onClick={() => navigate('/patients')}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-full">
                <UserPlus className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Manage Patients</h3>
                <p className="text-gray-600">View and manage patients</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <p className="text-gray-600 text-center py-4">
              Your recent activity will appear here
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}