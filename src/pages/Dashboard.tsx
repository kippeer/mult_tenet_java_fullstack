import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { UserPlus, LogOut, Trash2, Edit, Eye } from 'lucide-react';
import { getPatients, deletePatient } from '../lib/api';
import { Patient } from '../types/api';

export default function Dashboard() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    try {
      const data = await getPatients();
      setPatients(data);
    } catch (error) {
      toast.error('Failed to load patients');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      try {
        await deletePatient(id);
        toast.success('Patient deleted successfully');
        loadPatients();
      } catch (error) {
        toast.error('Failed to delete patient');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Patient Management</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/patients/new"
                className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-blue-700"
              >
                <UserPlus className="w-5 h-5" />
                <span>New Patient</span>
              </Link>
              
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Birth Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {patients.map((patient) => (
                <tr key={patient.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {patient.firstName} {patient.lastName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{patient.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{patient.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {format(new Date(patient.birthDate), 'MM/dd/yyyy')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <Link
                        to={`/patients/${patient.id}`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye className="w-5 h-5" />
                      </Link>
                      <Link
                        to={`/patients/${patient.id}/edit`}
                        className="text-green-600 hover:text-green-900"
                      >
                        <Edit className="w-5 h-5" />
                      </Link>
                      <button
                        onClick={() => handleDelete(patient.id!)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}