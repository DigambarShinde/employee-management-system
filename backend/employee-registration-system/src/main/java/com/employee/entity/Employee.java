package com.employee.entity;

import com.employee.enums.Role;
import jakarta.persistence.*;
import lombok.*;


@Entity
@Table(name="employees")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true)
    private String email;

    private String password;

    private String department;

    private Double salary;

    private String isActive = "Y"; // Default value is true

    @Enumerated(EnumType.STRING)
    private Role role;
}
