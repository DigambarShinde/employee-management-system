import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) {}

  // Login method
  login(credentials: { email: string; password: string }): Observable<any> 
  {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  // Save token in localStorage
  saveToken(token: string): void 
  {
    localStorage.setItem('token', token);
  }

  // Get token
  getToken(): string | null 
  {
    return localStorage.getItem('token');
  }

  // Check if user is logged in
  isLoggedIn(): boolean 
  {
    return !!this.getToken();
  }

  // Logout
  logout(): void 
  {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}
