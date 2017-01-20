import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
    moduleId: module.id,
    selector: 'my-reg',
    templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {

    registerForm: FormGroup;

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            email: ['', Validators.required],
            psword: ['', Validators.required],
            repass: ['', Validators.required]
        });
    }
}