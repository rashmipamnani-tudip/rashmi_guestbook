import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'
import { loginService } from '../../services/login.service'
import { myuser } from './user'

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
  constructor(private formBuilder: FormBuilder, private login_service: loginService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onLogin(event, myemail, mypass) {
    this.users = [];
    var result;
    var myuser = {
      email: myemail.value,
      password: mypass.value
    };

    console.log(myuser.password);

    result = this.login_service.verifyUser(myuser);


    result.subscribe(x => {

      this.users = x;

      console.log(this.users);



      if (x == null) {
        alert("User not registered or wrong password");
        myemail.value = "";
        mypass.value = "";
      }
      else {
        console.log("User is logged in");
        this.router.navigate(['dashboard']);
        //sessionStorage.setItem('',myuser.name);
        sessionStorage.setItem('host_email', myuser.email);

        sessionStorage.setItem('host_name', this.users.first_name + " " + this.users.last_name);
        console.log("email is : " + myuser.email);

      }



    });
  }
}
        /*
          this.savedUser.users_logged = "" + loginUsers.text;

          localStorage.setItem('host_email', loginUsers.email);
          localStorage.setItem('host_name',loginUsers.username);

          console.log(""+loginUsers.email);*/
