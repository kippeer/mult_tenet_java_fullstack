import React from 'react';
import { X, User, MapPin, Phone, Heart, AlertCircle, FileText, Mail, Calendar, UserCircle, Clock } from 'lucide-react';
import type { Patient } from '../../types';
import { motion } from 'framer-motion';

interface PatientModalProps {
  patient: Patient;
  onClose: () => void;
}

function PatientModal({ patient, onClose }: PatientModalProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-md overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative h-64 bg-gradient-to-br from-indigo-600 via-blue-600 to-blue-400">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=2000')] mix-blend-overlay opacity-20 bg-center bg-cover"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200 backdrop-blur-sm"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          <div className="absolute bottom-8 left-8 right-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-20 w-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white tracking-tight mb-1">
                  {patient.firstName} {patient.lastName}
                </h2>
                <div className="flex flex-wrap items-center gap-4 text-white/90">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{patient.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">{patient.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">Last updated: 2 days ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Personal Information */}
              <motion.section 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-blue-200 transition-colors duration-200"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-50 rounded-xl">
                    <UserCircle className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                </div>
                <div className="space-y-4 text-gray-600">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>Birth Date: {patient.birthDate}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <User className="w-4 h-4 text-gray-400" />
                    <span>Gender: {patient.gender}</span>
                  </div>
                </div>
              </motion.section>

              {/* Address */}
              <motion.section 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-blue-200 transition-colors duration-200"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-50 rounded-xl">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Address</h3>
                </div>
                <div className="space-y-2 text-gray-600 bg-gray-50 p-4 rounded-xl">
                  <p className="font-medium">{patient.addressStreet}, {patient.addressNumber}</p>
                  <p>{patient.addressNeighborhood}</p>
                  <p>{patient.addressCity}, {patient.addressState}</p>
                  <p className="text-gray-500">{patient.addressZipCode}</p>
                </div>
              </motion.section>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Emergency Contact */}
              <motion.section 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-orange-100 hover:border-orange-200 transition-colors duration-200"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-orange-50 rounded-xl">
                    <Phone className="w-5 h-5 text-orange-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Emergency Contact</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-orange-50/50 rounded-xl">
                    <span className="text-sm text-gray-500 block mb-1">Name</span>
                    <span className="text-gray-900 font-medium">{patient.emergencyContactName || 'Not provided'}</span>
                  </div>
                  <div className="p-4 bg-orange-50/50 rounded-xl">
                    <span className="text-sm text-gray-500 block mb-1">Phone</span>
                    <span className="text-gray-900 font-medium">{patient.emergencyContactPhone || 'Not provided'}</span>
                  </div>
                </div>
              </motion.section>

              {/* Health Insurance */}
              <motion.section 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-green-100 hover:border-green-200 transition-colors duration-200"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-50 rounded-xl">
                    <Heart className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Health Insurance</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-green-50/50 rounded-xl">
                    <span className="text-sm text-gray-500 block mb-1">Provider</span>
                    <span className="text-gray-900 font-medium">{patient.healthInsurance || 'Not provided'}</span>
                  </div>
                  <div className="p-4 bg-green-50/50 rounded-xl">
                    <span className="text-sm text-gray-500 block mb-1">Number</span>
                    <span className="text-gray-900 font-medium">{patient.healthInsuranceNumber || 'Not provided'}</span>
                  </div>
                </div>
              </motion.section>
            </div>

            {/* Full Width Sections */}
            <div className="col-span-full space-y-6">
              {/* Allergies */}
              <motion.section 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-red-100 hover:border-red-200 transition-colors duration-200"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-red-50 rounded-xl">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Allergies</h3>
                </div>
                <div className="p-4 bg-red-50/50 rounded-xl">
                  <p className="text-gray-700">{patient.allergies || 'None reported'}</p>
                </div>
              </motion.section>

              {/* Medical Observations */}
              <motion.section 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-blue-100 hover:border-blue-200 transition-colors duration-200"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-50 rounded-xl">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Medical Observations</h3>
                </div>
                <div className="p-4 bg-blue-50/50 rounded-xl">
                  <p className="text-gray-700 whitespace-pre-wrap">{patient.medicalObservations || 'No observations recorded'}</p>
                </div>
              </motion.section>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default PatientModal;