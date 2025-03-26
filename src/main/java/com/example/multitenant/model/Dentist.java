package com.example.multitenant.model;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Column;

@Entity
@DiscriminatorValue("DENTIST")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Dentist extends User {

    @Column(name = "specialty")
    private String specialty;  // Ex: Ortodontia, Endodontia, etc.
}
