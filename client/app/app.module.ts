import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpModule } from '@angular/http'
import { RouterModule } from '@angular/router'
import { AppComponent } from './app.component'
import { DashComponent } from './components/Dashboard/dashboard.component'
import { signupRoutes } from './Routing/routing'
import { FormsModule,ReactiveFormsModule } from '@angular/forms'
import { LoginComponent } from './components/Login/login.component'
import { RegisterComponent } from './components/Register/register.component'


@NgModule({
  imports: [BrowserModule, HttpModule,FormsModule,ReactiveFormsModule, RouterModule.forRoot(signupRoutes)],
  declarations: [AppComponent, DashComponent, LoginComponent, RegisterComponent],
  bootstrap: [AppComponent]
})

export class AppModule { }
