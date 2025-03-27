import React, { useState } from 'react';
import { X, User, MapPin, Phone, Heart, AlertCircle, FileText, Mail, Calendar, UserCircle, Home, Building2, MapPinned } from 'lucide-react';
import { motion } from 'framer-motion';
import { createPatient, updatePatient } from '../services/api';
import type { Patient } from '../types';

interface PatientFormProps {
  patient?: Patient | null;
  onClose: () => void;
  onSuccess: () => void;
}

function PatientForm({ patient, onClose, onSuccess }: PatientFormProps) {
  const [formData, setFormData] = useState<Patient>(
    patient || {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      birthDate: '',
      gender: '',
      addressStreet: '',
      addressNumber: '',
      addressNeighborhood: '',
      addressCity: '',
      addressState: '',
      addressZipCode: '',
      emergencyContactName: '',
      emergencyContactPhone: '',
      healthInsurance: '',
      healthInsuranceNumber: '',
      allergies: '',
      medicalObservations: '',
    }
  );
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (patient?.id) {
        await updatePatient(patient.id, formData);
      } else {
        await createPatient(formData);
      }
      onSuccess();
    } catch (err) {
      setError('Falha ao salvar paciente');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const inputClasses = "mt-1 block w-full rounded-xl border-gray-200 bg-white/50 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm transition-colors duration-200";
  const labelClasses = "block text-sm font-medium text-gray-700";
  const sectionClasses = "bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-blue-100 transition-all duration-200";
  const sectionHeaderClasses = "flex items-center gap-3 mb-6";
  const iconContainerClasses = "p-2 rounded-xl";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-md overflow-y-auto h-full w-full z-50 flex items-start justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="relative w-full max-w-4xl bg-gray-50/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden my-8"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative h-32 bg-gradient-to-br from-blue-600 to-indigo-600 px-8 flex items-center">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=2000')] mix-blend-overlay opacity-20 bg-center bg-cover"></div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200 backdrop-blur-sm"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <div className="relative">
            <h2 className="text-2xl font-bold text-white">
              {patient ? 'Editar Paciente' : 'Novo Paciente'}
            </h2>
            <p className="text-white/80 text-sm mt-1">
              Preencha os dados do paciente com atenção
            </p>
          </div>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-8 mt-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-2"
          >
            <AlertCircle className="w-5 h-5" />
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* Personal Information */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className={sectionClasses}
          >
            <div className={sectionHeaderClasses}>
              <div className={`${iconContainerClasses} bg-blue-50`}>
                <UserCircle className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Informações Pessoais</h3>
            </div>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className={labelClasses}>Nome</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={inputClasses}
                  required
                />
              </div>

              <div>
                <label className={labelClasses}>Sobrenome</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={inputClasses}
                  required
                />
              </div>

              <div>
                <label className={labelClasses}>E-mail</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClasses}
                  required
                />
              </div>

              <div>
                <label className={labelClasses}>Telefone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={inputClasses}
                  required
                />
              </div>

              <div>
                <label className={labelClasses}>Data de Nascimento</label>
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  className={inputClasses}
                  required
                />
              </div>

              <div>
                <label className={labelClasses}>Gênero</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={inputClasses}
                  required
                >
                  <option value="">Selecione o gênero</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Feminino">Feminino</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>
            </div>
          </motion.section>

          {/* Address */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={sectionClasses}
          >
            <div className={sectionHeaderClasses}>
              <div className={`${iconContainerClasses} bg-indigo-50`}>
                <MapPin className="w-5 h-5 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Endereço</h3>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className={labelClasses}>Rua</label>
                <div className="mt-1 flex rounded-xl shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-gray-200 bg-gray-50 text-gray-500 sm:text-sm">
                    <Home className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    name="addressStreet"
                    value={formData.addressStreet}
                    onChange={handleChange}
                    className="flex-1 block w-full rounded-none rounded-r-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    required
                  />
                </div>
              </div>

              <div>
                <label className={labelClasses}>Número</label>
                <input
                  type="text"
                  name="addressNumber"
                  value={formData.addressNumber}
                  onChange={handleChange}
                  className={inputClasses}
                  required
                />
              </div>

              <div>
                <label className={labelClasses}>Bairro</label>
                <div className="mt-1 flex rounded-xl shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-gray-200 bg-gray-50 text-gray-500 sm:text-sm">
                    <Building2 className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    name="addressNeighborhood"
                    value={formData.addressNeighborhood}
                    onChange={handleChange}
                    className="flex-1 block w-full rounded-none rounded-r-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    required
                  />
                </div>
              </div>

              <div>
                <label className={labelClasses}>Cidade</label>
                <input
                  type="text"
                  name="addressCity"
                  value={formData.addressCity}
                  onChange={handleChange}
                  className={inputClasses}
                  required
                />
              </div>

              <div>
                <label className={labelClasses}>Estado</label>
                <input
                  type="text"
                  name="addressState"
                  value={formData.addressState}
                  onChange={handleChange}
                  className={inputClasses}
                  required
                />
              </div>

              <div>
                <label className={labelClasses}>CEP</label>
                <div className="mt-1 flex rounded-xl shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-gray-200 bg-gray-50 text-gray-500 sm:text-sm">
                    <MapPinned className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    name="addressZipCode"
                    value={formData.addressZipCode}
                    onChange={handleChange}
                    className="flex-1 block w-full rounded-none rounded-r-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    required
                  />
                </div>
              </div>
            </div>
          </motion.section>

          {/* Emergency Contact */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={sectionClasses}
          >
            <div className={sectionHeaderClasses}>
              <div className={`${iconContainerClasses} bg-orange-50`}>
                <Phone className="w-5 h-5 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Contato de Emergência</h3>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className={labelClasses}>Nome do Contato</label>
                <input
                  type="text"
                  name="emergencyContactName"
                  value={formData.emergencyContactName}
                  onChange={handleChange}
                  className={inputClasses}
                />
              </div>

              <div>
                <label className={labelClasses}>Telefone</label>
                <input
                  type="tel"
                  name="emergencyContactPhone"
                  value={formData.emergencyContactPhone}
                  onChange={handleChange}
                  className={inputClasses}
                />
              </div>
            </div>
          </motion.section>

          {/* Health Information */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className={sectionClasses}
          >
            <div className={sectionHeaderClasses}>
              <div className={`${iconContainerClasses} bg-green-50`}>
                <Heart className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Informações de Saúde</h3>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className={labelClasses}>Plano de Saúde</label>
                <input
                  type="text"
                  name="healthInsurance"
                  value={formData.healthInsurance}
                  onChange={handleChange}
                  className={inputClasses}
                />
              </div>

              <div>
                <label className={labelClasses}>Número do Plano</label>
                <input
                  type="text"
                  name="healthInsuranceNumber"
                  value={formData.healthInsuranceNumber}
                  onChange={handleChange}
                  className={inputClasses}
                />
              </div>

              <div className="sm:col-span-2">
                <label className={labelClasses}>Alergias</label>
                <textarea
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleChange}
                  rows={3}
                  className={inputClasses}
                  placeholder="Liste todas as alergias..."
                />
              </div>

              <div className="sm:col-span-2">
                <label className={labelClasses}>Observações Médicas</label>
                <textarea
                  name="medicalObservations"
                  value={formData.medicalObservations}
                  onChange={handleChange}
                  rows={4}
                  className={inputClasses}
                  placeholder="Informações médicas relevantes..."
                />
              </div>
            </div>
          </motion.section>

          {/* Form Actions */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-end gap-3 pt-4"
          >
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 font-medium text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 font-medium text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {patient ? 'Atualizar' : 'Criar'} Paciente
            </button>
          </motion.div>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default PatientForm;