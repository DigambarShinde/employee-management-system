package com.employee.service;

import com.employee.dto.EmployeeRequestDTO;
import com.employee.dto.EmployeeResponseDTO;
import com.employee.entity.Employee;
import com.employee.repository.EmployeeRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class EmployeeService {

    private final EmployeeRepository repository;

    public EmployeeService(EmployeeRepository repository)
    {
        this.repository = repository;
    }

    public EmployeeResponseDTO createEmployee(EmployeeRequestDTO dto)
    {
        Employee employee = new Employee();

        employee.setName(dto.getName());
        employee.setEmail(dto.getEmail());
        employee.setDepartment(dto.getDepartment());
        employee.setSalary(dto.getSalary());

        Employee saved = repository.save(employee);

        EmployeeResponseDTO response = new EmployeeResponseDTO();

        response.setId(saved.getId());
        response.setName(saved.getName());
        response.setEmail(saved.getEmail());
        response.setDepartment(saved.getDepartment());
        response.setSalary(saved.getSalary());

        return response;
    }

    public Employee updateEmployee(Long id,EmployeeRequestDTO dto)
    {
        Employee employee = repository.findById(id)
                            .orElseThrow(() -> new RuntimeException("Employee Not Found"));

        employee.setName(dto.getName());
        employee.setEmail(dto.getEmail());
        employee.setDepartment(dto.getDepartment());
        employee.setSalary(dto.getSalary());

        return repository.save(employee);
    }

    public List<Employee> getAllEmployees()
    {
        return repository.findAll();
    }

    public Employee getById(Long id)
    {
        return repository.findById(id).orElse(null);
    }

}