import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user/user.service';
import { EmployeeRequestDTO } from 'src/app/models/EmployeeRequestDTO.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

// Angular provides lifecycle hooks (special methods that run at certain times in a component’s life).
// OnInit is one such hook.
//you’re telling Angular: “This component will use the ngOnInit() lifecycle method.
export class DashboardComponent implements OnInit {

  // The user property will hold the details of the currently logged-in user.
  // This is a property of the component class.
  // It holds the logged‑in user’s data (name, email, role).
  // You can replace any with a specific type (like User) once you define the structure of the user object.
  // The exclamation mark (!) is a TypeScript feature called the definite assignment assertion.
  // It tells TypeScript: “I promise this property will be assigned a value before it’s used.”
  // This is useful when you know that the property will be initialized later (like after an HTTP request), but TypeScript can’t infer that from the code.
  //  here, you’re telling TypeScript that user will definitely be assigned a value (the logged-in user’s details) before it’s accessed in the template.
  // we have Created a User interface in src/app/models/user.ts to define the structure of the user object.
  // The User interface has properties like id, name, email, and role.
  // By using the User interface, you ensure that the user property in the DashboardComponent adheres to this structure.
  // The service response wraps the employee details in its `data` property.
  user!: User;
  loggedInUser!: User;

  constructor(private userService: UserService,private router: Router) {}

  // The getLoggedInUser() method retrieves the logged-in user’s details from localStorage.
  // It checks if there’s user data stored in localStorage (from a previous login).
  // If found, it parses the JSON string back into a User object and assigns it to the loggedInUser property.
  private getLoggedInUser(): void 
  {
    const userData = localStorage.getItem('user');

    if (userData)
    {
      this.loggedInUser = JSON.parse(userData);
    } 
    else 
    {
      this.router.navigate(['/login']);
    }
  }

  loadCurrentUser(): void {
    //You make an HTTP request to backend.
    // If successful → store user details in this.user.
    // If error (like invalid token) → redirect to login.
    // Fetch user details from backend using token
    // The backend endpoint is assumed to be /api/user/me,
    // which returns the details of the currently logged-in user based on the token provided in the request headers.

    this.userService
      .getCurrentUser(this.loggedInUser.email)
      .subscribe({

        next: (response) => {

          if (response.success) {
            this.user = response.data;
          }

        },

        error: (err) => {

          console.error('Error fetching user:', err);

          Swal.fire({
            icon: 'error',
            title: 'Failed',
            text: 'Unable to load profile details.'
          });

        }

      });
  }

  // The ngOnInit() method is called once the component has been initialized.
  // In this case, you’re using ngOnInit() to fetch user details from the backend when the dashboard component is loaded.
  // The ngOnInit() method is part of the OnInit interface, which you’ve implemented in your component class.
  // The ngOnInit() method is called after the component’s constructor and after Angular has initialized all data-bound properties of the component.
  // The ngOnInit() method is a good place to put initialization logic, such as fetching data from a server.
  //Angular calls ngOnInit().
  ngOnInit(): void {

    // Load the logged-in user from localStorage when the component initializes
    // This ensures that the user details are available even after a page refresh.
    // The getLoggedInUser() method retrieves the logged-in user’s details from localStorage.
    // It checks if there’s user data stored in localStorage (from a previous login).
    // If found, it parses the JSON string back into a User object and assigns it to the loggedInUser property.
    this.getLoggedInUser();

    this.loadCurrentUser();
  }

  //======================================================================================
  // The updateProfile() method is called when the user wants to update their profile information.
  updateProfile(request: EmployeeRequestDTO): void 
  {
    this.userService
    .updateUser(this.loggedInUser.email, request)
    .subscribe({
    next: (response) => {
    if(response.success)
    {
      this.user = response.data;
      Swal.fire({
      icon: 'success',
      title: 'Profile Updated',
      text: response.message
      });
    }
    },
    
    error: (err) => {
        Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: err.error.message
        });
      }
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }


//======================================================================================

//implements OnInit → tells Angular you’ll use the init lifecycle hook.
// ngOnInit() → runs once when component loads, perfect for fetching data.
// user: any; → variable to hold backend response and show in HTML.

/**
 * 🧠 Dashboard Flow
 * 
 * 1. Component Initialization
 *    - Angular calls ngOnInit() once when DashboardComponent loads.
 * 
 * 2. API Call
 *    - this.http.get<User>('http://localhost:8080/api/user/me') is executed.
 *    - The <User> generic ensures TypeScript knows the response shape (id, name, email, role).
 * 
 * 3. Token Handling
 *    - You don’t see the token here because the HTTP Interceptor handles it.
 *    - Interceptor automatically clones every request and adds:
 *        Authorization: Bearer <token>
 *    - This way, you don’t need to manually add headers in each service/component.
 * 
 * 4. Backend Validation
 *    - Backend checks the JWT token.
 *    - If valid → returns user details (name, email, role).
 *    - If invalid/expired → request fails.
 * 
 * 5. Response Handling
 *    - next: (data: User) => this.user = data
 *        → Assigns backend response to the user property.
 *    - error: () => this.router.navigate(['/login'])
 *        → Redirects to login if token is invalid or request fails.
 * 
 * 6. Template Binding
 *    - {{ user.name }}, {{ user.role }}, {{ user.email }} display user info in dashboard.component.html.
 * 
 * ✅ Key Takeaway
 * - ngOnInit() is the lifecycle hook for initialization.
 * - Token is passed automatically via HTTP Interceptor.
 * - Dashboard shows user details only if token is valid.
 */





openUpdateProfilePopup(): void {

  Swal.fire({

    title: 'Update Profile',

    html: `
      <input id="name"
             class="swal2-input"
             placeholder="Name"
             style="padding: 6px 10px; margin: 5px auto; width: 85%; font-size: 14px;"
             value="${this.user.name}">

      <input id="department"
             class="swal2-input"
             placeholder="Department"
             style="padding: 6px 10px; margin: 5px auto; width: 85%; font-size: 14px;"
             value="${this.user.department}">

      <input id="salary"
             class="swal2-input"
             placeholder="Salary"
             style="padding: 6px 10px; margin: 5px auto; width: 85%; font-size: 14px;"
             placeholder = "Salary"
             value="${this.user.salary}">
      
      <input id="mail"
             class="swal2-input"
             placeholder="mail"
             style="padding: 6px 10px; margin: 5px auto; width: 85%; font-size: 14px;"
             placeholder = "mail" 
             value="${this.user.email}">
    `,

    focusConfirm: false,

    showCancelButton: true,

    confirmButtonText: 'Save',

    preConfirm: () => {

      const name =
      (document.getElementById('name') as HTMLInputElement).value;

      const department =
      (document.getElementById('department') as HTMLInputElement).value;

      const salary =
      (document.getElementById('salary') as HTMLInputElement).value;

      const mail =
      (document.getElementById('mail') as HTMLInputElement).value;

      if (!name || !department || !salary || !mail) 
      {
        Swal.showValidationMessage(
        'All fields are required.'
        );
    
        return false;
      }

      return {
        name,
        department,
        salary: Number(salary),
        mail
      };
    }

  }).then((result) => {
      if(result.isConfirmed)
      {
          this.updateProfile(result.value);
      }
  });

}
}