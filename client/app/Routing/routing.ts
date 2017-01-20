import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../components/Login/login.component';
import { RegisterComponent } from '../components/Register/register.component'
import { TodosComponent } from '../components/todos.component'

export const signupRoutes = [

    { path: 'signup', component: RegisterComponent },
    { path: 'dashboard', component: TodosComponent },
    { path: '', component: LoginComponent }
];