import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { getPatients, deletePatient } from '../services/api';
import type { Patient } from '../types';
import PatientForm from './PatientForm';

function PatientList() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [error, setError] = useState('');

  const loadPatients = async () => {
    try {
      const data = await getPatients();
      setPatients(data);
    } catch (err) {
      setError('Failed to load patients');
    }
  };

  useEffect(() => {
    loadPatients();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      try {
        await deletePatient(id);
        await loadPatients();
      } catch (err) {
        setError('Failed to delete patient');
      }
    }
  };

  const handleEdit = (patient: Patient) => {
    setEditingPatient(patient);
    setShowForm(true);
  };

  return (
    <div>
      <div className="sm:flex sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Patients</h1>
        <button
          onClick={() => {
            setEditingPatient(null);
            setShowForm(true);
          }}
          className="mt-3 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Patient
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {showForm ? (
        <PatientForm
          patient={editingPatient}
          onClose={() => setShowForm(false)}
          onSuccess={() => {
            setShowForm(false);
            loadPatients();
          }}
        />
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {patients.map((patient) => (
              <li key={patient.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {patient.firstName} {patient.lastName}
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        {patient.email} • {patient.phone}
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        {patient.addressStreet}, {patient.addressNumber} - {patient.addressCity}, {patient.addressState}
                      </p>
                    </div>
                    <div className="flex">
                      <button
                        onClick={() => handleEdit(patient)}
                        className="mr-2 text-blue-600 hover:text-blue-900"
                      >
                        <Pencil className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => patient.id && handleDelete(patient.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
            {patients.length === 0 && (
              <li className="px-4 py-4 sm:px-6 text-center text-gray-500">
                No patients found
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default PatientList;