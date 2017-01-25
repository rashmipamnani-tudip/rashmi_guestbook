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
var register_service_1 = require("../../services/register.service");
var router_1 = require("@angular/router");
var RegisterComponent = (function () {
    function RegisterComponent(formBuilder, register_service, router) {
        this.formBuilder = formBuilder;
        this.register_service = register_service;
        this.router = router;
    }
    RegisterComponent.prototype.ngOnInit = function () {
        this.registerForm = this.formBuilder.group({
            firstname: ['', forms_1.Validators.required],
            lastname: [''],
            email: ['', [forms_1.Validators.required, forms_1.Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
            psword: ['', forms_1.Validators.required],
            repass: ['', forms_1.Validators.required]
        });
    };
    RegisterComponent.prototype.onRegister = function (event, fname, lname, email, pwd, cpwd) {
        var _this = this;
        this.users = [];
        var recipt = {
            first_name: fname.value,
            last_name: lname.value,
            email: email.value,
            pwd: pwd.value,
        };
        console.log(recipt);
        var result = this.register_service.addUser(recipt);
        result.subscribe(function (x) {
            _this.users.push(recipt);
            if (!recipt) {
                alert("User is not registered");
            }
            else {
                alert("User is registered");
                fname.value = '';
                lname.value = '';
                email.value = '';
                pwd.value = '';
                cpwd.value = '';
                _this.router.navigate(['']);
            }
        });
    };
    RegisterComponent.prototype.checkpass = function (pwd, cpwd) {
        if (pwd.value == cpwd.value) {
            return true;
        }
        else {
            return false;
        }
    };
    return RegisterComponent;
}());
RegisterComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-reg',
        templateUrl: 'register.component.html',
        providers: [register_service_1.RegisterService]
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, register_service_1.RegisterService, router_1.Router])
], RegisterComponent);
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map