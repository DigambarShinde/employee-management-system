package com.employee.service;

import com.employee.dto.EmployeeRegistrationRequest;
import com.employee.entity.Employee;
import com.employee.enums.Role;
import com.employee.exception.ResourceNotFoundException;
import com.employee.repository.EmployeeRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class RegistrationService {

    private final EmployeeRepository repository;
    private final PasswordEncoder passwordEncoder;
    private static final String EMAIL_REGEX = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.(com|in)$";
    private static final String PHONE_REGEX = "^[6-9]\\d{9}$";

    public RegistrationService(EmployeeRepository repository, PasswordEncoder passwordEncoder)
    {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    public void register(EmployeeRegistrationRequest dto)
    {
        if (!dto.getEmail().matches(EMAIL_REGEX))
        {
            throw new IllegalArgumentException("Invalid email. Only .com and .in domains are allowed");
        }

        if(repository.findByEmail(dto.getEmail()).isPresent())
        {
            throw new ResourceNotFoundException("Email already exists");
        }

        Employee employee = new Employee();

        employee.setName(dto.getName());
        employee.setEmail(dto.getEmail());
        employee.setPassword(passwordEncoder.encode(dto.getPassword()));
        employee.setDepartment(dto.getDepartment());
        employee.setSalary(dto.getSalary());
        employee.setIsActive(dto.getIsActive() != null ? dto.getIsActive() : "Y");
        employee.setRole(Role.EMPLOYEE);

        repository.save(employee);
    }
}
