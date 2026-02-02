package com.example.student.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "students")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Auto-increment primary key

    private String name;

    @Column(name = "register_number", unique = true, nullable = false)
    private String registerNumber; // Will be auto-generated

    private String phoneNumber;
    private String department;
    private String address;
}
