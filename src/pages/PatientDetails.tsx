import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { ArrowLeft, Edit } from 'lucide-react';
import { getPatient } from '../lib/api';
import { Patient } from '../types/api';

export default function PatientDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    loadPatient();
  }, [id]);

  const loadPatient = async () => {
    try {
      const data = await getPatient(Number(id));
      setPatient(data);
    } catch (error) {
      toast.error('Failed to load patient');
      navigate('/');
    }
  };

  if (!patient) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/')}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back
              </button>
              <h1 className="text-2xl font-bold text-gray-900 ml-4">
                {patient.firstName} {patient.lastName}
              </h1>
            </div>
            <button
              onClick={() => navigate(`/patients/${id}/edit`)}
              className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              <Edit className="w-5 h-5 mr-2" />
              Edit
            </button>
          </div>

          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
                  <dl className="grid grid-cols-1 gap-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Email</dt>
                      <dd className="mt-1 text-sm text-gray-900">{patient.email}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Phone</dt>
                      <dd className="mt-1 text-sm text-gray-900">{patient.phone}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Birth Date</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {format(new Date(patient.birthDate), 'MM/dd/yyyy')}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Gender</dt>
                      <dd className="mt-1 text-sm text-gray-900">{patient.gender}</dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Address</h3>
                  <dl className="grid grid-cols-1 gap-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Street</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {patient.addressStreet}, {patient.addressNumber}
                      </dd>
                    </div>
                    {patient.addressComplement && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Complement</dt>
                        <dd className="mt-1 text-sm text-gray-900">{patient.addressComplement}</dd>
                      </div>
                    )}
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Neighborhood</dt>
                      <dd className="mt-1 text-sm text-gray-900">{patient.addressNeighborhood}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">City/State</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {patient.addressCity}, {patient.addressState}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">ZIP Code</dt>
                      <dd className="mt-1 text-sm text-gray-900">{patient.addressZipCode}</dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Emergency Contact</h3>
                  <dl className="grid grid-cols-1 gap-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Name</dt>
                      <dd className="mt-1 text-sm text-gray-900">{patient.emergencyContactName}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Phone</dt>
                      <dd className="mt-1 text-sm text-gray-900">{patient.emergencyContactPhone}</dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Health Information</h3>
                  <dl className="grid grid-cols-1 gap-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Health Insurance</dt>
                      <dd className="mt-1 text-sm text-gray-900">{patient.healthInsurance}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Insurance Number</dt>
                      <dd className="mt-1 text-sm text-gray-900">{patient.healthInsuranceNumber}</dd>
                    </div>
                  </dl>
                </div>

                <div className="col-span-2">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Medical Information</h3>
                  <dl className="grid grid-cols-1 gap-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Allergies</dt>
                      <dd className="mt-1 text-sm text-gray-900">{patient.allergies || 'None'}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Medical Observations</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {patient.medicalObservations || 'None'}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}