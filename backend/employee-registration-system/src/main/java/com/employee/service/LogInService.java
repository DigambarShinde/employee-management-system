package com.employee.service;

import com.employee.dto.LoginRequest;
import com.employee.dto.LoginResponse;
import com.employee.entity.Employee;
import com.employee.exception.InvalidPasswordException;
import com.employee.exception.ResourceNotFoundException;
import com.employee.repository.EmployeeRepository;
import com.employee.security.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class LogInService {

    private final EmployeeRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public LogInService(EmployeeRepository repository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil)
    {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public LoginResponse login(LoginRequest request)
    {
        Employee employee = repository
                            .findByEmail(request.getEmail())
                            .orElseThrow(() ->
                                    new ResourceNotFoundException(
                                            "Email not found"));

        boolean isPasswordMatch = passwordEncoder.matches(
                                request.getPassword(),
                                employee.getPassword());

        if(!isPasswordMatch)
        {
            throw new InvalidPasswordException("Invalid Password");
        }

        String token =  jwtUtil.generateToken(employee.getEmail(), employee.getRole().name());

        LoginResponse response = new LoginResponse();

        response.setId(employee.getId());
        response.setName(employee.getName());
        response.setEmail(employee.getEmail());
        response.setRole(employee.getRole().name());
        response.setToken(token);

        return response;
    }


}
