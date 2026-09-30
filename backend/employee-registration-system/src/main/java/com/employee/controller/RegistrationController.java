package com.employee.controller;

import com.employee.dto.ApiResponse;
import com.employee.dto.EmployeeRegistrationRequest;
import com.employee.entity.Employee;
import com.employee.service.RegistrationService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/employees")
public class RegistrationController {

    private final RegistrationService registrationService;

    public RegistrationController(RegistrationService registrationService) {
        this.registrationService = registrationService;
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse> register(@Valid @RequestBody EmployeeRegistrationRequest dto)
    {
        registrationService.register(dto);
        ApiResponse<Employee> response = new ApiResponse<>(
                true,
                "Employee Registered Successfully",
                null
        );
        return ResponseEntity.ok(response);
    }
}
