
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'
import { loginService } from '../../services/login.service'
import { myuser } from './user'
//import { ToastrService } from '../../../node_modules/toastr-ng2';
//import { ToastsManager } from '../../../node_modules/ng2-toastr/ng2-toastr';

@Component({
  moduleId: module.id,
  selector: 'login-form',
  templateUrl: 'login.component.html',
  providers: [loginService]
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  users: myuser[];
  //name = this.users.name;
  constructor(private formBuilder: FormBuilder,/*private toastr_service:ToastrService, */private login_service: loginService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
      password: ['', Validators.required]
    });
  }

  onLogin(event, myemail, mypass) {
    var input = document.getElementById("toast")
    if (myemail.value == '' || mypass.value == '') {

      input.className = "show";
      input.innerHTML = "Please enter valid data";
      input.style.background = "#ff1a1a";
      setTimeout(function () { input.className = input.className.replace("show", ""); }, 3000);
    }
    else {
      this.users = [];
      var result;
      var myuser = {
        email: myemail.value,
        password: mypass.value
      };

      result = this.login_service.verifyUser(myuser);
         result.subscribe(x => {

        this.users = x;

       console.log("Ans is : ",this.users);

        if (x.toString() == "User not found") {
          input.className = "show";
          input.style.background = "ff1a1a"
          input.innerHTML = "User not registered or wrong password";
          setTimeout(function () { input.className = input.className.replace("show", ""); }, 3000);
          myemail.value = "";
          mypass.value = "";
        }
        else {
          // console.log("User is logged in");

          //this.toastr_service.success('Hello world!', 'Toastr fun!');
          input.className = "show";
          input.style.background = "1aff1a"
          input.innerHTML = "User logged in successfully";
          setTimeout(function () { input.className = input.className.replace("show", ""); }, 3000);
          this.router.navigate(['dashboard']);

          //sessionStorage.setItem('',myuser.name);
          sessionStorage.setItem('host_email', myuser.email);
          sessionStorage.setItem('host_role', this.users.role);
          sessionStorage.setItem('host_name', this.users.first_name + " " + this.users.last_name);
          console.log("email is : " + myuser.email);
        }



      });
    }

  }
}
