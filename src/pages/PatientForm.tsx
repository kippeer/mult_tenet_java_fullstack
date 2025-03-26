import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ArrowLeft } from 'lucide-react';
import { createPatient, getPatient, updatePatient } from '../lib/api';
import { Patient } from '../types/api';

const FormField = ({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    {children}
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);

export default function PatientForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Patient>({
    defaultValues: {
      gender: '',
    },
  });

  useEffect(() => {
    if (id) {
      loadPatient();
    }
  }, [id]);

  const loadPatient = async () => {
    try {
      const data = await getPatient(Number(id));
      reset(data);
    } catch (error) {
      toast.error('Failed to load patient');
      navigate('/');
    }
  };

  const onSubmit = async (data: Patient) => {
    try {
      if (id) {
        await updatePatient(Number(id), data);
        toast.success('Patient updated successfully');
      } else {
        await createPatient(data);
        toast.success('Patient created successfully');
      }
      navigate('/');
    } catch (error) {
      toast.error('Failed to save patient');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex items-center mb-6">
            <button
              onClick={() => navigate('/')}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>
            <h1 className="text-2xl font-bold text-gray-900 ml-4">
              {id ? 'Edit Patient' : 'New Patient'}
            </h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow rounded-lg p-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField label="First Name" error={errors.firstName?.message}>
                <input
                  type="text"
                  {...register('firstName', { required: 'First name is required' })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </FormField>

              <FormField label="Last Name" error={errors.lastName?.message}>
                <input
                  type="text"
                  {...register('lastName', { required: 'Last name is required' })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </FormField>

              <FormField label="Email" error={errors.email?.message}>
                <input
                  type="email"
                  {...register('email', { required: 'Email is required' })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </FormField>

              <FormField label="Phone" error={errors.phone?.message}>
                <input
                  type="tel"
                  {...register('phone', { required: 'Phone is required' })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </FormField>

              <FormField label="Birth Date" error={errors.birthDate?.message}>
                <input
                  type="date"
                  {...register('birthDate', { required: 'Birth date is required' })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </FormField>

              <FormField label="Gender" error={errors.gender?.message}>
                <select
                  {...register('gender', { required: 'Gender is required' })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </FormField>

              <div className="col-span-2">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Address Information</h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField label="Street" error={errors.addressStreet?.message}>
                    <input
                      type="text"
                      {...register('addressStreet', { required: 'Street is required' })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </FormField>

                  <FormField label="Number" error={errors.addressNumber?.message}>
                    <input
                      type="text"
                      {...register('addressNumber', { required: 'Number is required' })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </FormField>

                  <FormField label="Complement" error={errors.addressComplement?.message}>
                    <input
                      type="text"
                      {...register('addressComplement')}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </FormField>

                  <FormField label="Neighborhood" error={errors.addressNeighborhood?.message}>
                    <input
                      type="text"
                      {...register('addressNeighborhood', { required: 'Neighborhood is required' })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </FormField>

                  <FormField label="City" error={errors.addressCity?.message}>
                    <input
                      type="text"
                      {...register('addressCity', { required: 'City is required' })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </FormField>

                  <FormField label="State" error={errors.addressState?.message}>
                    <input
                      type="text"
                      {...register('addressState', { required: 'State is required' })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </FormField>

                  <FormField label="ZIP Code" error={errors.addressZipCode?.message}>
                    <input
                      type="text"
                      {...register('addressZipCode', { required: 'ZIP code is required' })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </FormField>
                </div>
              </div>

              <div className="col-span-2">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Emergency Contact</h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField label="Name" error={errors.emergencyContactName?.message}>
                    <input
                      type="text"
                      {...register('emergencyContactName', { required: 'Emergency contact name is required' })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </FormField>

                  <FormField label="Phone" error={errors.emergencyContactPhone?.message}>
                    <input
                      type="tel"
                      {...register('emergencyContactPhone', { required: 'Emergency contact phone is required' })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </FormField>
                </div>
              </div>

              <div className="col-span-2">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Health Information</h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField label="Health Insurance" error={errors.healthInsurance?.message}>
                    <input
                      type="text"
                      {...register('healthInsurance')}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </FormField>

                  <FormField label="Insurance Number" error={errors.healthInsuranceNumber?.message}>
                    <input
                      type="text"
                      {...register('healthInsuranceNumber')}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </FormField>

                  <div className="col-span-2">
                    <FormField label="Allergies" error={errors.allergies?.message}>
                      <textarea
                        {...register('allergies')}
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </FormField>
                  </div>

                  <div className="col-span-2">
                    <FormField label="Medical Observations" error={errors.medicalObservations?.message}>
                      <textarea
                        {...register('medicalObservations')}
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </FormField>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isSubmitting ? 'Saving...' : id ? 'Update Patient' : 'Create Patient'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}