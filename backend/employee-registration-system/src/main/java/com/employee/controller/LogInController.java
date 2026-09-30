package com.employee.controller;

import com.employee.dto.ApiResponse;
import com.employee.dto.LoginRequest;
import com.employee.dto.LoginResponse;
import com.employee.service.LogInService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class LogInController {

    private final LogInService service;

    public LogInController(LogInService service)
    {
        this.service = service;
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(@Valid @RequestBody LoginRequest request)
    {
        LoginResponse loginResponse = service.login(request); // Assuming the service returns a LoginResponse with a token
        ApiResponse<LoginResponse> apiResponse = new ApiResponse<>(
                true,
                "Login successful",
                loginResponse // JWT or session token
        );
        return ResponseEntity.ok(apiResponse);
    }
}
