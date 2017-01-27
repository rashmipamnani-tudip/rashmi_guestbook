"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var login_service_1 = require("../../services/login.service");
var LoginComponent = (function () {
    //name = this.users.name;
    function LoginComponent(formBuilder, login_service, router) {
        this.formBuilder = formBuilder;
        this.login_service = login_service;
        this.router = router;
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.loginForm = this.formBuilder.group({
            email: ['', [forms_1.Validators.required, forms_1.Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
            password: ['', [forms_1.Validators.required, forms_1.Validators.minLength(6)]]
        });
    };
    LoginComponent.prototype.onLogin = function (event, myemail, mypass) {
        var _this = this;
        this.users = [];
        var result;
        var myuser = {
            email: myemail.value,
            password: mypass.value
        };
        result = this.login_service.verifyUser(myuser);
        result.subscribe(function (x) {
            _this.users = x;
            if (x.error != null) {
                alert("User not registered or wrong password");
                myemail.value = "";
                mypass.value = "";
            }
            else {
                console.log("User is logged in");
                _this.router.navigate(['dashboard']);
                //sessionStorage.setItem('',myuser.name);
                sessionStorage.setItem('host_email', myuser.email);
                sessionStorage.setItem('host_name', _this.users.first_name + " " + _this.users.last_name);
                console.log("email is : " + myuser.email);
            }
        });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'login-form',
        templateUrl: 'login.component.html',
        providers: [login_service_1.loginService]
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, login_service_1.loginService, router_1.Router])
], LoginComponent);
exports.LoginComponent = LoginComponent;
/*
  this.savedUser.users_logged = "" + loginUsers.text;

  localStorage.setItem('host_email', loginUsers.email);
  localStorage.setItem('host_name',loginUsers.username);

  console.log(""+loginUsers.email);*/
//# sourceMappingURL=login.component.js.map