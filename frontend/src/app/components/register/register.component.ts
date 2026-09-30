import { Component } from '@angular/core';
import { RegisterService } from '../../services/register/register.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent {

  constructor(private registerService: RegisterService , private router: Router) {}

  isNameValid(): boolean {
    return /^[A-Za-z ]+$/.test(this.name || '');
  }

  name = '';
  email = '';
  department = '';
  salary = '';
  role = '';
  createPassword = '';

  employeeRegister() 
  {
    console.log('Registering employee with details:');
    if (this.name && this.email && this.department && this.salary && this.role && this.createPassword) 
    {
      const employee = {
        name: this.name,
        email: this.email,
        password: this.createPassword,
        department: this.department,
        salary: this.salary,
        active: 'Y',
        role: this.role
      };


      //Here We are Calling the Register Service to Register 
      // the Employee and Subscribing to the Observable to get the Response from the Backend.
      this.registerService.registerEmployee(employee).subscribe({
        next: (response) => {

          Swal.fire({
          icon: 'success',
          title: 'Registration Successful',
          text: response.message,
          timer: 2000,
          showConfirmButton: false
          }).then(() => {
          this.router.navigate(['/login']);
           
          });
          
          console.log(response);
        },
        error: (err) => {
            if (err.error && err.error.message) 
            {
              Swal.fire({
              icon: 'error',
              title: 'Registration Failed',
              text: err.error.message,
              confirmButtonText: 'OK'
              });
            }
            else 
            {
              Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Something went wrong',
              confirmButtonText: 'OK'
              });
            }
        }
      });
    }
    else 
    {
      Swal.fire({
        icon: 'warning',
        title: 'Required Fields Missing',
        text: 'Please fill in all required fields.'
      });
      return;
    }
   
  }
}