package com.employee.controller;

import com.employee.dto.EmployeeRequestDTO;
import com.employee.dto.EmployeeResponseDTO;
import com.employee.dto.ApiResponse;
import com.employee.service.EmployeeService;
import com.employee.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final EmployeeService employeeService;
    private final  UserService userService;

    public UserController(EmployeeService employeeService, UserService userService)
    {
        this.employeeService = employeeService;
        this.userService = userService;
    }

    @GetMapping("/getuser")
    public ResponseEntity<ApiResponse<EmployeeResponseDTO>> getCurrentUser(@RequestParam String email)
    {
        // Temporary approach until JWT validation is added
        EmployeeResponseDTO user = userService.getByEmail(email);

        ApiResponse<EmployeeResponseDTO> response = new ApiResponse<>(
                true,
                "User fetched successfully",
                user
        );
        return ResponseEntity.ok(response);
    }

    // Update user profile by email
    @PutMapping("/updateUser")
    public ResponseEntity<ApiResponse<EmployeeResponseDTO>> updateUser(@RequestParam String email,@RequestBody EmployeeRequestDTO request)
    {
        System.out.println(request.getEmail());
        EmployeeResponseDTO updated = userService.updateEmployeeByEmail(email, request);
        ApiResponse<EmployeeResponseDTO> response = new ApiResponse<>(
                true,
                "User updated successfully",
                updated
        );
        return ResponseEntity.ok(response);
    }
}
