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
import {searchComponent} from './components/Search/search.component'
import {editComponent} from './components/Edit/edit.component'
import {DataTableModule} from "angular2-datatable";

//import { ToastrModule } from '/home/tudip/Desktop/backup/rashmi_guestbook/client/node_modules/toastr-ng2'
// import {ToastModule} from 'ng2-toastr/ng2-toastr';

@NgModule({
imports: [BrowserModule, HttpModule,FormsModule,ReactiveFormsModule, RouterModule.forRoot(signupRoutes),DataTableModule/*,ToastrModule.forRoot()*/],
  declarations: [AppComponent, DashComponent, LoginComponent, RegisterComponent, searchComponent, editComponent],
  bootstrap: [AppComponent]
})

export class AppModule { }
