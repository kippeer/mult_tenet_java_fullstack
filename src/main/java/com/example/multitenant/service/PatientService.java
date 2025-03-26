package com.example.multitenant.service;

import com.example.multitenant.exception.PatientNotFoundException;
import com.example.multitenant.model.Patient;
import com.example.multitenant.model.User;
import com.example.multitenant.repository.PatientRepository;
import com.example.multitenant.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientService {

    private static final Logger logger = LoggerFactory.getLogger(PatientService.class);
    private final PatientRepository patientRepository;
    private final UserRepository userRepository;

    public PatientService(PatientRepository patientRepository, UserRepository userRepository) {
        this.patientRepository = patientRepository;
        this.userRepository = userRepository;
    }

    public List<Patient> getAllPatients() {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        logger.info("Fetching all patients for user: {}", userEmail);
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> {
                    logger.error("User not found: {}", userEmail);
                    return new RuntimeException("User not found");
                });
        List<Patient> patients = patientRepository.findByCompanyId(user.getCompany().getId());
        logger.info("Found {} patients for user: {}", patients.size(), userEmail);
        return patients;
    }

    public ResponseEntity<Patient> getPatient(Long id) {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        logger.info("Fetching patient with ID: {} for user: {}", id, userEmail);
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> {
                    logger.error("User not found: {}", userEmail);
                    return new RuntimeException("User not found");
                });

        return patientRepository.findById(id)
                .filter(patient -> patient.getCompany().getId().equals(user.getCompany().getId()))
                .map(patient -> {
                    logger.info("Successfully fetched patient with ID: {}", id);
                    return ResponseEntity.ok(patient);
                })
                .orElseThrow(() -> {
                    logger.error("Patient not found with ID: {}", id);
                    return new PatientNotFoundException("Patient not found");
                });
    }

    public Patient createPatient(Patient patient) {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        logger.info("Creating patient: {} for user: {}", patient.getName(), userEmail);
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> {
                    logger.error("User not found: {}", userEmail);
                    return new RuntimeException("User not found");
                });

        patient.setCompany(user.getCompany());
        Patient savedPatient = patientRepository.save(patient);
        logger.info("Successfully created patient with ID: {}", savedPatient.getId());
        return savedPatient;
    }

    public ResponseEntity<Patient> updatePatient(Long id, Patient patientDetails) {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        logger.info("Updating patient with ID: {} for user: {}", id, userEmail);
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> {
                    logger.error("User not found: {}", userEmail);
                    return new RuntimeException("User not found");
                });

        return patientRepository.findById(id)
                .filter(patient -> patient.getCompany().getId().equals(user.getCompany().getId()))
                .map(patient -> {
                    patient.setName(patientDetails.getName());
                    patient.setEmail(patientDetails.getEmail());
                    patient.setBirthDate(patientDetails.getBirthDate());
                    logger.info("Successfully updated patient with ID: {}", id);
                    return ResponseEntity.ok(patientRepository.save(patient));
                })
                .orElseThrow(() -> {
                    logger.error("Patient not found with ID: {}", id);
                    return new PatientNotFoundException("Patient not found");
                });
    }

    public ResponseEntity<?> deletePatient(Long id) {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        logger.info("Deleting patient with ID: {} for user: {}", id, userEmail);
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> {
                    logger.error("User not found: {}", userEmail);
                    return new RuntimeException("User not found");
                });

        return patientRepository.findById(id)
                .filter(patient -> patient.getCompany().getId().equals(user.getCompany().getId()))
                .map(patient -> {
                    patientRepository.delete(patient);
                    logger.info("Successfully deleted patient with ID: {}", id);
                    return ResponseEntity.ok().build();
                })
                .orElseThrow(() -> {
                    logger.error("Patient not found with ID: {}", id);
                    return new PatientNotFoundException("Patient not found");
                });
    }
}
