package com.example.multitenant.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.time.OffsetDateTime;

@Entity
@Table(name = "appointments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "appointment_date", nullable = false)
    private OffsetDateTime appointmentDate;

    @Column(name = "procedure_type", nullable = false)
    private String procedureType; // Ex: "Limpeza", "Canal", "Ortodontia", "Implante"

    @Column(name = "status", nullable = false)
    private String status; // Ex: "AGENDADO", "CANCELADO", "REALIZADO"

    @Column(name = "notes", columnDefinition = "TEXT")
    private String notes; // Anotações do dentista

    @ManyToOne
    @JoinColumn(name = "patient_id", nullable = false)
    @JsonIgnore
    private Patient patient;

    @ManyToOne
    @JoinColumn(name = "dentist_id", nullable = false)
    private Dentist dentist;

    @Column(name = "created_at", updatable = false)
    private OffsetDateTime createdAt;

    @Column(name = "updated_at")
    private OffsetDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = OffsetDateTime.now();
        updatedAt = OffsetDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = OffsetDateTime.now();
    }
}
