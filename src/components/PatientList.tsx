import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Info, AlertCircle, Users, FileText, MapPin, Phone, Mail, UserCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getPatients, deletePatient } from '../services/api';
import type { Patient } from '../types';
import PatientForm from './PatientForm';
import PatientModal from './ui/PatientModal';

function PatientList() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [error, setError] = useState('');

  const loadPatients = async () => {
    try {
      const data = await getPatients();
      setPatients(data);
      setError('');
    } catch (err) {
      setError('Falha ao carregar pacientes');
    }
  };

  useEffect(() => {
    loadPatients();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este paciente?')) {
      try {
        await deletePatient(id);
        await loadPatients();
        setError('');
      } catch (err) {
        setError('Falha ao excluir paciente');
      }
    }
  };

  const handleEdit = (patient: Patient) => {
    setEditingPatient(patient);
    setShowForm(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="relative">
        {/* Header */}
        <div className="mb-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              
              <div className="mx-5 text-2xl font-bold text-gray-900">
                <h1>Pacientes</h1>
                
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setEditingPatient(null);
                setShowForm(true);
              }}
              className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2.5 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              <Plus className="w-5 h-5 mr-2" />
              Adicionar Paciente
            </motion.button>
          </div>
        </div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-2"
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Patient Form */}
        <AnimatePresence>
          {showForm && (
            <PatientForm
              patient={editingPatient}
              onClose={() => setShowForm(false)}
              onSuccess={() => {
                setShowForm(false);
                loadPatients();
              }}
            />
          )}
        </AnimatePresence>

        {/* Patient List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white shadow-sm rounded-2xl overflow-hidden border border-gray-100"
        >
          <ul className="divide-y divide-gray-100">
            {patients.map((patient) => (
              <motion.li
                key={patient.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="hover:bg-gray-50/50 transition-colors duration-200"
              >
                <div className="px-6 py-5">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                            <UserCircle className="w-6 h-6 text-blue-600" />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-base font-semibold text-gray-900 truncate">
                            {patient.firstName} {patient.lastName}
                          </h3>
                          <div className="mt-1 flex items-center gap-4">
                            <p className="text-sm text-gray-500 flex items-center gap-1">
                              <Mail className="w-4 h-4" />
                              {patient.email}
                            </p>
                            <p className="text-sm text-gray-500 flex items-center gap-1">
                              <Phone className="w-4 h-4" />
                              {patient.phone}
                            </p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500 flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {patient.addressStreet}, {patient.addressNumber} - {patient.addressCity}, {patient.addressState}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedPatient(patient)}
                        className="inline-flex items-center gap-2 px-3 py-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-xl transition-colors duration-200"
                        title="Mais Informações"
                      >
                        <FileText className="w-4 h-4" />
                        <span className="text-sm font-medium">Detalhes</span>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleEdit(patient)}
                        className="p-2 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-xl transition-colors duration-200"
                        title="Editar Paciente"
                      >
                        <Pencil className="w-5 h-5" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => patient.id && handleDelete(patient.id)}
                        className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-xl transition-colors duration-200"
                        title="Excluir Paciente"
                      >
                        <Trash2 className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.li>
            ))}
            {patients.length === 0 && (
              <motion.li
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="px-6 py-8 text-center"
              >
                <div className="mx-auto w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-4">
                  <Users className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-sm font-medium text-gray-900">Nenhum paciente encontrado</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Comece adicionando seu primeiro paciente
                </p>
                <div className="mt-6">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setEditingPatient(null);
                      setShowForm(true);
                    }}
                    className="inline-flex items-center px-4 py-2.5 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Adicionar Paciente
                  </motion.button>
                </div>
              </motion.li>
            )}
          </ul>
        </motion.div>

        {/* Patient Details Modal */}
        <AnimatePresence>
          {selectedPatient && (
            <PatientModal
              patient={selectedPatient}
              onClose={() => setSelectedPatient(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default PatientList;