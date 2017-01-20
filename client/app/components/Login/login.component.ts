import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router'

@Component({
  moduleId: module.id,
  selector: 'login-form',
  templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
}