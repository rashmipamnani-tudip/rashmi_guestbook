import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpModule } from '@angular/http'
import { RouterModule } from '@angular/router'
import { AppComponent } from './app.component'
import { TodosComponent } from './components/todos.component'
import { signupRoutes } from './Routing/routing'
import { FormsModule,ReactiveFormsModule } from '@angular/forms'
import { LoginComponent } from './components/Login/login.component'
import { RegisterComponent } from './components/Register/register.component'


@NgModule({
  imports: [BrowserModule, HttpModule,FormsModule,ReactiveFormsModule, RouterModule.forRoot(signupRoutes)],
  declarations: [AppComponent, TodosComponent, LoginComponent, RegisterComponent],
  bootstrap: [AppComponent]
})

export class AppModule { }
