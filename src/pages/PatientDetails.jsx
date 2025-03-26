import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getPatient, deletePatient } from '../services/api';
import toast from 'react-hot-toast';

function PatientDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    loadPatient();
  }, [id]);

  const loadPatient = async () => {
    try {
      const data = await getPatient(id);
      setPatient(data);
    } catch (error) {
      toast.error('Failed to load patient details');
      navigate('/');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      try {
        await deletePatient(id);
        toast.success('Patient deleted successfully');
        navigate('/');
      } catch (error) {
        toast.error('Failed to delete patient');
      }
    }
  };

  if (!patient) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Patient Details</h1>
        <div className="space-x-4">
          <Link
            to={`/patients/${id}/edit`}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
              <dl className="space-y-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Name</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {patient.firstName} {patient.lastName}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="mt-1 text-sm text-gray-900">{patient.email}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Phone</dt>
                  <dd className="mt-1 text-sm text-gray-900">{patient.phone}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Gender</dt>
                  <dd className="mt-1 text-sm text-gray-900">{patient.gender}</dd>
                </div>
              </dl>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4">Address</h2>
              <dl className="space-y-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Street</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {patient.addressStreet}, {patient.addressNumber}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Complement</dt>
                  <dd className="mt-1 text-sm text-gray-900">{patient.addressComplement}</dd>
                </div>
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
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">Emergency Contact</h2>
            <dl className="grid grid-cols-2 gap-6">
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

          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">Medical Information</h2>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">Health Insurance</dt>
                <dd className="mt-1 text-sm text-gray-900">{patient.healthInsurance}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Insurance Number</dt>
                <dd className="mt-1 text-sm text-gray-900">{patient.healthInsuranceNumber}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Allergies</dt>
                <dd className="mt-1 text-sm text-gray-900">{patient.allergies}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Medical Observations</dt>
                <dd className="mt-1 text-sm text-gray-900">{patient.medicalObservations}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientDetails;