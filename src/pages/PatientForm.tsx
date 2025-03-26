import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ArrowLeft } from "lucide-react";
import { createPatient, getPatient, updatePatient} from "../lib/api";
import { useAuthStore } from "../stores/authStore";
import { format, parse } from "date-fns";
import {Patient } from '../types/api'

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

const Spinner = () => (
  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

export default function PatientForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuthStore();
  const [loading, setLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Patient>({
    defaultValues: {
      gender: "",
    },
  });

  useEffect(() => {
    if (!token) {
      toast.error("Please login to continue");
      navigate("/login");
      return;
    }

    if (id) {
      loadPatient();
    }
  }, [id, token, navigate]);

  const loadPatient = async () => {
    try {
      setLoading(true);
      const data = await getPatient(Number(id));
      
      const patientData = {
        ...data,
        birthDate: format(parse(data.birthDate, "dd/MM/yyyy", new Date()), "yyyy-MM-dd")
      };
      
      reset(patientData);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to load patient");
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const formatDateToBackend = (dateString: string) => {
    return format(new Date(dateString), "dd/MM/yyyy");
  };

  const onSubmit = async (formData: Patient) => {
    try {
      setLoading(true);
      if (!token) {
        toast.error("Please login to continue");
        navigate("/login");
        return;
      }

      const dataToSend = {
        ...formData,
        birthDate: formatDateToBackend(formData.birthDate)
      };

      if (id) {
        await updatePatient(Number(id), dataToSend);
        toast.success("Patient updated successfully");
      } else {
        await createPatient(dataToSend);
        toast.success("Patient created successfully");
      }
      navigate("/");
    } catch (error: any) {
      if (error.response?.data?.errors) {
        error.response.data.errors.forEach((err: any) => {
          toast.error(`${err.field}: ${err.message}`);
        });
      } else {
        toast.error(error.response?.data?.message || "Failed to save patient");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex items-center mb-6">
            <button
              onClick={() => navigate("/")}
              className="flex items-center text-gray-600 hover:text-gray-900"
              disabled={loading}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>
            <h1 className="text-2xl font-bold text-gray-900 ml-4">
              {id ? "Edit Patient" : "New Patient"}
            </h1>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white shadow rounded-lg p-6"
            noValidate
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Personal Information */}
              <FormField label="First Name" error={errors.firstName?.message}>
                <input
                  type="text"
                  {...register("firstName", {
                    required: "First name is required",
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  disabled={loading}
                />
              </FormField>

              <FormField label="Last Name" error={errors.lastName?.message}>
                <input
                  type="text"
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  disabled={loading}
                />
              </FormField>

              <FormField label="Email" error={errors.email?.message}>
                <input
                  type="email"
                  {...register("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  disabled={loading}
                />
              </FormField>

              <FormField label="Phone" error={errors.phone?.message}>
                <input
                  type="tel"
                  {...register("phone", { 
                    required: "Phone is required",
                    pattern: {
                      value: /^\+?[1-9]\d{1,14}$/,
                      message: "Invalid phone number"
                    }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="+5511999999999"
                  disabled={loading}
                />
              </FormField>

              <FormField label="Birth Date" error={errors.birthDate?.message}>
                <input
                  type="date"
                  {...register("birthDate", {
                    required: "Birth date is required",
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  disabled={loading}
                />
              </FormField>

              <FormField label="Gender" error={errors.gender?.message}>
                <select
                  {...register("gender", { required: "Gender is required" })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  disabled={loading}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </FormField>

              {/* Address Information */}
              <div className="col-span-2">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Address Information
                </h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {[...Array(7)].map((_, index) => (
                    // Address fields remain the same structure
                    // Add similar validation patterns as needed
                    <FormField
                      key={index}
                      label="Street"
                      error={errors.addressStreet?.message}
                    >
                      <input
                        type="text"
                        {...register("addressStreet", {
                          required: "Street is required",
                        })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        disabled={loading}
                      />
                    </FormField>
                  ))}
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="col-span-2">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Emergency Contact
                </h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField
                    label="Name"
                    error={errors.emergencyContactName?.message}
                  >
                    <input
                      type="text"
                      {...register("emergencyContactName", {
                        required: "Emergency contact name is required",
                      })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      disabled={loading}
                    />
                  </FormField>

                  <FormField
                    label="Phone"
                    error={errors.emergencyContactPhone?.message}
                  >
                    <input
                      type="tel"
                      {...register("emergencyContactPhone", {
                        required: "Emergency contact phone is required",
                        pattern: {
                          value: /^\+?[1-9]\d{1,14}$/,
                          message: "Invalid phone number"
                        }
                      })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      disabled={loading}
                    />
                  </FormField>
                </div>
              </div>

              {/* Health Information */}
              <div className="col-span-2">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Health Information
                </h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* Health insurance fields */}
                  <FormField
                    label="Health Insurance"
                    error={errors.healthInsurance?.message}
                  >
                    <input
                      type="text"
                      {...register("healthInsurance")}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      disabled={loading}
                    />
                  </FormField>

                  {/* Insurance number field */}
                  <FormField
                    label="Insurance Number"
                    error={errors.healthInsuranceNumber?.message}
                  >
                    <input
                      type="text"
                      {...register("healthInsuranceNumber")}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      disabled={loading}
                    />
                  </FormField>

                  {/* Text areas */}
                  <div className="col-span-2">
                    <FormField label="Allergies" error={errors.allergies?.message}>
                      <textarea
                        {...register("allergies")}
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        disabled={loading}
                      />
                    </FormField>
                  </div>

                  <div className="col-span-2">
                    <FormField
                      label="Medical Observations"
                      error={errors.medicalObservations?.message}
                    >
                      <textarea
                        {...register("medicalObservations")}
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        disabled={loading}
                      />
                    </FormField>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || loading}
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center">
                    <Spinner />
                    {id ? "Updating..." : "Creating..."}
                  </span>
                ) : id ? (
                  "Update Patient"
                ) : (
                  "Create Patient"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}