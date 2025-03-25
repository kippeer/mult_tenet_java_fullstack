package com.example.multitenant.repository;

import com.example.multitenant.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PatientRepository extends JpaRepository<Patient, Long> {
    List<Patient> findByCompanyId(Long companyId);
}