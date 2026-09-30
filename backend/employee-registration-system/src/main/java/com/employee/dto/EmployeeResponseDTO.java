package com.employee.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmployeeResponseDTO {

    private Long id;

    private String name;

    private String email;

    private String department;

    private Double salary;

    private String role;
}