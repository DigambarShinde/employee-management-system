import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from 'src/app/models/ApiResponse.model';
import { EmployeeRequestDTO } from 'src/app/models/EmployeeRequestDTO.model';
import { EmployeeResponseDTO } from 'src/app/models/EmployeeResponseDTO.model';


@Injectable({
  providedIn: 'root'
})

export class UserService {
  private baseUrl = 'http://localhost:8080/api/user';

  constructor(private http: HttpClient) {}

  // Fetch current user
  getCurrentUser(email: string): Observable<ApiResponse<EmployeeResponseDTO>> {
    return this.http.get<ApiResponse<EmployeeResponseDTO>>(
      `${this.baseUrl}/getuser?email=${email}`
    );
  }

  // Update user profile
  updateUser(email: string, request: EmployeeRequestDTO): Observable<ApiResponse<EmployeeResponseDTO>> {
    return this.http.put<ApiResponse<EmployeeResponseDTO>>(
      `${this.baseUrl}/updateUser?email=${email}`,
      request
    );
  }
}