import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService
{
  private baseUrl = 'http://localhost:8080/employees';

  constructor(private http: HttpClient) {}

  registerEmployee(employee: any): Observable<any> 
  {
    return this.http.post(`${this.baseUrl}/register`, employee);
  }
}
