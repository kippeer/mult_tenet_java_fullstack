package com.example.multitenant.service;

import com.example.multitenant.model.Patient;
import com.example.multitenant.repository.PatientRepository;
import com.example.multitenant.util.TenantContext;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientService {

    private final PatientRepository patientRepository;

    public PatientService(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    public List<Patient> getAllPatients() {
        Long companyId = TenantContext.getCurrentTenant();
        return patientRepository.findByCompanyId(companyId);
    }

    public ResponseEntity<Patient> getPatient(Long id) {
        // Implementation
        return null;
    }

    public Patient createPatient(Patient patient) {
        // Implementation
        return null;
    }

    public ResponseEntity<Patient> updatePatient(Long id, Patient patient) {
        // Implementation
        return null;
    }

    public ResponseEntity<?> deletePatient(Long id) {
        // Implementation
        return null;
    }
}