import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../components/Login/login.component';
import { RegisterComponent } from '../components/Register/register.component'
import {DashComponent} from '../components/Dashboard/dashboard.component'
import {searchComponent} from '../components/Search/search.component'


export const signupRoutes = [

    { path: 'signup', component: RegisterComponent },
    { path: 'dashboard', component: DashComponent },
    {path: 'search', component: searchComponent},
    { path: '', component: LoginComponent }
];