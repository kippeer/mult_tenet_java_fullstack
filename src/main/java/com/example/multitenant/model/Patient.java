package com.example.multitenant.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.List;

@Entity
@Table(name = "patients")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(exclude = {"appointments", "medicalRecords", "invoices", "documents"})
@EqualsAndHashCode(exclude = {"appointments", "medicalRecords", "invoices", "documents"})
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(unique = true)
    private String email;

    @Column(nullable = false)
    private String phone;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy", locale = "pt-BR")
    @Column(name = "birth_date", nullable = false)
    private LocalDate birthDate;

    private String gender;

    @Column(name = "address_street")
    private String addressStreet;

    @Column(name = "address_number")
    private String addressNumber;

    @Column(name = "address_complement")
    private String addressComplement;

    @Column(name = "address_neighborhood")
    private String addressNeighborhood;

    @Column(name = "address_city")
    private String addressCity;

    @Column(name = "address_state")
    private String addressState;

    @Column(name = "address_zip_code")
    private String addressZipCode;

    @Column(name = "emergency_contact_name")
    private String emergencyContactName;

    @Column(name = "emergency_contact_phone")
    private String emergencyContactPhone;

    @Column(name = "health_insurance")
    private String healthInsurance;

    @Column(name = "health_insurance_number")
    private String healthInsuranceNumber;

    @Column(columnDefinition = "TEXT")
    private String allergies;

    @Column(name = "medical_observations", columnDefinition = "TEXT")
    private String medicalObservations;

    @JsonIgnore
    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Appointment> appointments;

    @JsonIgnore
    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MedicalRecord> medicalRecords;

    @JsonIgnore
    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Invoice> invoices;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy HH:mm:ss", locale = "pt-BR")
    @Column(name = "created_at", updatable = false)
    private OffsetDateTime createdAt;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy HH:mm:ss", locale = "pt-BR")
    @Column(name = "updated_at")
    private OffsetDateTime updatedAt;

    @ManyToOne
    @JoinColumn(name = "company_id", nullable = false)
    @JsonIgnore
    private Company company;

    @PrePersist
    protected void onCreate() {
        createdAt = OffsetDateTime.now();
        updatedAt = OffsetDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = OffsetDateTime.now();
    }

    public String getName() {
        return firstName + " " + lastName;
    }
    public void setName(String name) {
        // Dividir o nome completo em partes (primeiro nome e sobrenome)
        String[] nameParts = name.split(" ");

        // Atribuir o primeiro nome e o sobrenome
        if (nameParts.length >= 1) {
            this.firstName = nameParts[0];
        }
        if (nameParts.length > 1) {
            this.lastName = nameParts[nameParts.length - 1];
        }
    }


}
