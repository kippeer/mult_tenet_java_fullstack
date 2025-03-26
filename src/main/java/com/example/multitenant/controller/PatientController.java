package com.example.multitenant.controller;

import com.example.multitenant.model.Patient;
import com.example.multitenant.service.PatientService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/patients")
public class PatientController {

    private final PatientService patientService;

    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }

    @GetMapping
    public List<Patient> getAllPatients() {
        log.info("Buscando todos os pacientes...");
        List<Patient> patients = patientService.getAllPatients();
        log.info("Total de pacientes encontrados: {}", patients.size());
        return patients;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Patient> getPatient(@PathVariable Long id) {
        log.info("Buscando paciente com ID: {}", id);
        return patientService.getPatient(id);
    }

    @PostMapping
    public Patient createPatient(@Valid @RequestBody Patient patient) {
        log.info("Criando novo paciente: {}", patient);
        return patientService.createPatient(patient);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Patient> updatePatient(@PathVariable Long id, @Valid @RequestBody Patient patient) {
        log.info("Atualizando paciente com ID: {}", id);
        return patientService.updatePatient(id, patient);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePatient(@PathVariable Long id) {
        log.info("Deletando paciente com ID: {}", id);
        return patientService.deletePatient(id);
    }
}
