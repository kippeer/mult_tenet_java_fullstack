import React from 'react';
import { Link } from 'react-router-dom';
import { Users, UserPlus } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';

export default function Dashboard() {
  const user = useAuthStore((state) => state.user);

  return (
    <div>
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Welcome to {user?.company.name}
        </h1>
        <p className="mt-2 text-gray-600">
          Manage your patients and company information from this dashboard.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Manage Patients
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    View and manage your patient records
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link
                to="/patients"
                className="font-medium text-blue-600 hover:text-blue-900"
              >
                View all patients
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <UserPlus className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Add New Patient
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    Register a new patient in the system
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link
                to="/patients/new"
                className="font-medium text-blue-600 hover:text-blue-900"
              >
                Add patient
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}