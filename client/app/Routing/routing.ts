import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../components/Login/login.component';
import { RegisterComponent } from '../components/Register/register.component'
import {DashComponent} from '../components/Dashboard/dashboard.component'

export const signupRoutes = [

    { path: 'signup', component: RegisterComponent },
    { path: 'dashboard', component: DashComponent },
    { path: '', component: LoginComponent }
];