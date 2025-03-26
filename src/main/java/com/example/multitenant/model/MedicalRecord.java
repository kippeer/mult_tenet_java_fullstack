package com.example.multitenant.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import javax.persistence.*;
import java.time.OffsetDateTime;

@Entity
@Table(name = "medical_records")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MedicalRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient; // O paciente associado ao registro médico

    @Column(name = "record_date", nullable = false)
    private OffsetDateTime recordDate; // Data do registro médico

    @Column(columnDefinition = "TEXT", nullable = false)
    private String details; // Detalhes do histórico médico, como diagnósticos, tratamentos, etc.

    @Column(name = "created_at", nullable = false)
    private OffsetDateTime createdAt; // Data de criação do registro

    @Column(name = "updated_at")
    private OffsetDateTime updatedAt; // Data da última atualização do registro

    @ManyToOne
    @JoinColumn(name = "dentist_id", nullable = false)
    private Dentist dentist; // O dentista responsável pelo registro

    @ManyToOne
    @JoinColumn(name = "company_id", nullable = false)
    @JsonIgnore // Evita a recursão ao serializar a Company
    private Company company; // Relacionamento com a empresa (multi-tenant)
}
