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
            firstname: ['', Validators.required],
            lastname: [''],
            email: ['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
            psword: ['', Validators.required],
            repass: ['', Validators.required],

        });
    }

    onRegister(event, fname, lname, email, pwd, cpwd, role) {
        this.users = [];
        var recipt = {
            first_name: fname.value,
            last_name: lname.value,
            email: email.value,
            pwd: pwd.value,
            role: role.value
            // cpwd: cpwd.value
        };
        console.log(recipt);
        var result = this.register_service.addUser(recipt);

        result.subscribe(x => {
            this.users.push(recipt);
            if (!recipt) {
                alert("User is not registered");
            }
            else {
                alert("User is registered. Please login to continue");
                fname.value = '';
                lname.value = '';
                email.value = '';
                pwd.value = '';
                cpwd.value = '';
                this.router.navigate(['']);
            }
        });
    }

    checkpass(pwd, cpwd) {
        if (pwd.value == cpwd.value) {
            return true;
        }
        else {
            return false;
        }
    }
}
