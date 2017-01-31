import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import { recipts } from './register'
import { RegisterService } from '../../services/register.service'
import { RouterModule, Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'my-reg',
    templateUrl: 'register.component.html',
    providers: [RegisterService]
})
export class RegisterComponent implements OnInit {

    registerForm: FormGroup;
    users: recipts[];
    constructor(private formBuilder: FormBuilder, private register_service: RegisterService, private router: Router) {

    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstname: ['', [Validators.required, Validators.pattern("^[a-zA-Z\s]+$")]],
            lastname: [''],
            email: ['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
            psword: ['', Validators.required]
        });
    }

    onRegister(event, fname, lname, email, pwd, role) {
        var input = document.getElementById("toast");
        if (fname.value == '' || email.value == '' || pwd.value == '') {
            input.className = "show";
            input.innerHTML = "Some required fields are not filled";
            input.style.background = "#ff1a1a";
            setTimeout(function () { input.className = input.className.replace("show", ""); }, 3000);
        } else if (
            !this.registerForm.valid
        ) {
            input.className = "show";
            input.innerHTML = "Please enter valid data";
            input.style.background = "#ff1a1a";
            setTimeout(function () { input.className = input.className.replace("show", ""); }, 3000);
        }
        else {
            this.users = [];
            var recipt = {
                first_name: fname.value,
                last_name: lname.value,
                email: email.value,
                pwd: pwd.value,
                role: role.value
                
            };

            var result = this.register_service.addUser(recipt);

            result.subscribe(x => {
                this.users.push(recipt);
                if (!recipt) {
                    input.className = "show";
                    input.innerHTML = "User not registered";
                    input.style.background = "#ff1a1a";
                }
                else {
                  
                    fname.value = '';
                    lname.value = '';
                    email.value = '';
                    pwd.value = '';
                  
                    this.router.navigate(['']);
                }
            });
        }

    }

   /* checkpass(pwd, cpwd) {

        if (pwd.value == cpwd.value) {
            return true;
        }
        else {
            return false;
        }

    }
}*/
