package com.example.multitenant.service;

import com.example.multitenant.exception.PatientNotFoundException;
import com.example.multitenant.exception.UserNotFoundException; // Criação de exceção personalizada para "User not found"
import com.example.multitenant.model.Patient;
import com.example.multitenant.model.User;
import com.example.multitenant.repository.PatientRepository;
import com.example.multitenant.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.validation.Valid;
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

    private User getCurrentUser() {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        logger.info("Fetching user with email: {}", userEmail);
        return userRepository.findByEmail(userEmail)
                .orElseThrow(() -> {
                    logger.error("User not found: {}", userEmail);
                    return new UserNotFoundException("User not found");
                });
    }

    public List<Patient> getAllPatients() {
        User user = getCurrentUser();
        logger.info("Fetching all patients for user: {}", user.getEmail());
        List<Patient> patients = patientRepository.findByCompanyId(user.getCompany().getId());
        logger.info("Found {} patients for user: {}", patients.size(), user.getEmail());
        return patients;
    }

    public ResponseEntity<Patient> getPatient(Long id) {
        User user = getCurrentUser();
        logger.info("Fetching patient with ID: {} for user: {}", id, user.getEmail());

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

    public Patient createPatient(@Valid Patient patient) {
        try {
            User user = getCurrentUser();
            logger.info("Attempting to create patient for user: {}", user.getEmail());

            patient.setCompany(user.getCompany());
            Patient savedPatient = patientRepository.save(patient);

            logger.info("Patient created successfully. ID: {}", savedPatient.getId());
            return savedPatient;
        } catch (DataIntegrityViolationException e) {
            logger.error("Database error: {}", e.getMessage());
            throw new RuntimeException("Check patient data for duplicates or constraints");
        } catch (Exception e) {
            logger.error("Unexpected error: {}", e.getMessage());
            throw e;
        }
    }

    public ResponseEntity<Patient> updatePatient(Long id, Patient patientDetails) {
        User user = getCurrentUser();
        logger.info("Updating patient with ID: {} for user: {}", id, user.getEmail());

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
        User user = getCurrentUser();
        logger.info("Deleting patient with ID: {} for user: {}", id, user.getEmail());

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
