import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './auth.guard';

const routes: Routes = [

  { 
    path: '', 
    redirectTo: '/login', 
    pathMatch: 'full' 
  },
  {
    path: 'home',
    component: HomeComponent
  },
  //Example of lazy loading  component or Steps to lazy load a component in Angular:
  // {
  //   path :'login', 
  //   loadChildren: () => import('./components/login/login.component').then(m => m.LoginComponent)
  // },
  {
    path :'login', 
    component: LoginComponent
  },
  {
    path:'register',
    component: RegisterComponent
  },
  //Result: /dashboard is blocked until login succeeds.
  { 
    path: 'dashboard', 
    component: DashboardComponent, 
    canActivate: [authGuard] 
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
