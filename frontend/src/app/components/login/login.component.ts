import { Component } from '@angular/core';
import { LoginService } from '../../services/login/login.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {

  email = '';
  password = '';

  constructor(private loginService: LoginService, private router: Router) {}

  // Login method
  login() 
  {
    if (this.email && this.password) 
    {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
       
      if (!emailRegex.test(this.email))
      {
        Swal.fire({
        icon: 'error',
        title: 'Invalid Email',
        text: 'Please enter a valid email address'
        });
        return;
      }
    
      if (!this.password)
      {
        Swal.fire({
        icon: 'warning',
        title: 'Password Required',
        text: 'Please enter your password'
        });
        return;
      }

      const credentials = {
        email: this.email,
        password: this.password
      };

      this.loginService.login(credentials).subscribe({
      next: (response) => {

       // "Login successful"
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));

      Swal.fire({
        title: 'Login Successful',
        text: response.message,
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      }).then(() => {
        this.router.navigate(['/dashboard']);
      });
    },
    error: (err) => {

      Swal.fire({
      title: 'Login Failed',
      text: err.error.message,
      icon: 'error',
      confirmButtonText: 'Try Again'
      });

    }
    });
    }
    else 
    {

      Swal.fire({
        title: 'Login Failed',
        text: 'Please enter both email and password.',
        icon: 'error',
        confirmButtonText: 'Try Again'
      });

      return;
    }
  }
}
