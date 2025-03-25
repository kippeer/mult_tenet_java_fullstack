package com.example.multitenant.service;

import com.example.multitenant.exception.PatientNotFoundException;
import com.example.multitenant.model.Company;
import com.example.multitenant.model.Patient;
import com.example.multitenant.model.User;
import com.example.multitenant.repository.PatientRepository;
import com.example.multitenant.repository.UserRepository;
import com.example.multitenant.util.TenantContext;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientService {

    private final PatientRepository patientRepository;
    private final UserRepository userRepository;

    public PatientService(PatientRepository patientRepository, UserRepository userRepository) {
        this.patientRepository = patientRepository;
        this.userRepository = userRepository;
    }

    public List<Patient> getAllPatients() {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return patientRepository.findByCompanyId(user.getCompany().getId());
    }

    public ResponseEntity<Patient> getPatient(Long id) {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        return patientRepository.findById(id)
                .filter(patient -> patient.getCompany().getId().equals(user.getCompany().getId()))
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new PatientNotFoundException("Patient not found"));
    }

    public Patient createPatient(Patient patient) {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        patient.setCompany(user.getCompany());
        return patientRepository.save(patient);
    }

    public ResponseEntity<Patient> updatePatient(Long id, Patient patientDetails) {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return patientRepository.findById(id)
                .filter(patient -> patient.getCompany().getId().equals(user.getCompany().getId()))
                .map(patient -> {
                    patient.setName(patientDetails.getName());
                    patient.setEmail(patientDetails.getEmail());
                    patient.setBirthDate(patientDetails.getBirthDate());
                    return ResponseEntity.ok(patientRepository.save(patient));
                })
                .orElseThrow(() -> new PatientNotFoundException("Patient not found"));
    }

    public ResponseEntity<?> deletePatient(Long id) {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return patientRepository.findById(id)
                .filter(patient -> patient.getCompany().getId().equals(user.getCompany().getId()))
                .map(patient -> {
                    patientRepository.delete(patient);
                    return ResponseEntity.ok().build();
                })
                .orElseThrow(() -> new PatientNotFoundException("Patient not found"));
    }
}