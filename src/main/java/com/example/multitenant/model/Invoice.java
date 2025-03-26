package com.example.multitenant.model;

import com.example.multitenant.model.enums.InvoiceStatus;
import com.example.multitenant.model.enums.PaymentMethod;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.OffsetDateTime;

@Entity
@Table(name = "invoices")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Invoice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "invoice_number", nullable = false, unique = true)
    private String invoiceNumber;

    @ManyToOne
    @JoinColumn(name = "patient_id", nullable = false)
    @JsonIgnore
    private Patient patient;  // Relacionamento com paciente

    @ManyToOne
    @JoinColumn(name = "dentist_id", nullable = false)
    @JsonIgnore
    private Dentist dentist;  // Relacionamento com dentista

    @Column(name = "amount", nullable = false)
    private BigDecimal amount;  // Valor da fatura

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private InvoiceStatus status;  // Status da fatura

    @Column(name = "issue_date", nullable = false)
    private OffsetDateTime issueDate;  // Data da emissão

    @Column(name = "due_date", nullable = false)
    private OffsetDateTime dueDate;  // Data de vencimento

    @ManyToOne
    @JoinColumn(name = "company_id", nullable = false)
    @JsonIgnore
    private Company company;  // Relacionamento com a empresa (multi-tenant)

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_method", nullable = false)
    private PaymentMethod paymentMethod;  // Método de pagamento
}
