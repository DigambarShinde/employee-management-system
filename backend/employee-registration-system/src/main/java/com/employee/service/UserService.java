package com.employee.service;

import com.employee.dto.EmployeeRequestDTO;
import com.employee.dto.EmployeeResponseDTO;
import com.employee.entity.Employee;
import com.employee.exception.ResourceNotFoundException;
import com.employee.repository.EmployeeRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final EmployeeRepository repository;

    public UserService(EmployeeRepository repository) {
        this.repository = repository;
    }

    public EmployeeResponseDTO getByEmail(String email)
    {
        Employee employee = repository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        EmployeeResponseDTO dto = new EmployeeResponseDTO();
        dto.setId(employee.getId());
        dto.setName(employee.getName());
        dto.setEmail(employee.getEmail());
        dto.setDepartment(employee.getDepartment());
        dto.setSalary(employee.getSalary());
        dto.setRole(employee.getRole().name()); // if using enum

        return dto;
    }

    public EmployeeResponseDTO updateEmployeeByEmail(String email, EmployeeRequestDTO request)
    {
        Employee employee = repository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        employee.setName(request.getName());
        employee.setDepartment(request.getDepartment());
        employee.setSalary(request.getSalary());
        // password update can be separate for security reasons

        repository.save(employee);

        EmployeeResponseDTO dto = new EmployeeResponseDTO();

        dto.setId(employee.getId());
        dto.setName(employee.getName());
        dto.setEmail(employee.getEmail());
        dto.setDepartment(employee.getDepartment());
        dto.setSalary(employee.getSalary());
        dto.setRole(employee.getRole().name());

        return dto;
    }

}
