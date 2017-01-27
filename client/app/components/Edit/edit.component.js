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
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var dash_service_1 = require("../../services/dash.service");
var editComponent = (function () {
    function editComponent(formbuilder, dash_service, router) {
        this.formbuilder = formbuilder;
        this.dash_service = dash_service;
        this.router = router;
        this.get_hmail = sessionStorage.getItem('this_visitor_hmail');
        this.get_hname = sessionStorage.getItem('this_visitor_rec_name');
        this.get_in_time = sessionStorage.getItem('this_visitor_in_time');
        this.get_out_time = sessionStorage.getItem('this_visitor_out_time');
    }
    editComponent.prototype.ngOnInit = function () {
        var get_name = sessionStorage.getItem('this_visitor_name');
        var get_email = sessionStorage.getItem('this_visitor_email');
        var get_number = sessionStorage.getItem('this_visitor_number');
        var get_in_time = sessionStorage.getItem('this_visitor_in_time');
        var get_out_time = sessionStorage.getItem('this_visitor_out_time');
        this.edit_form = this.formbuilder.group({
            name: [get_name, forms_1.Validators.required],
            email: [get_email, [forms_1.Validators.required, forms_1.Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
            number: [get_number, forms_1.Validators.required],
            in_time: [get_in_time, forms_1.Validators.required],
            out_time: [get_out_time, forms_1.Validators.required]
        });
    };
    editComponent.prototype.save_edited = function (event, name, email, number, intime, outtime) {
        var result;
        var edited_visitor = {
            name: name.value,
            email: email.value,
            number: number.value,
            in_time: this.get_in_time,
            out_time: this.get_out_time,
            hmail: this.get_hmail,
            receptionist_name: this.get_hname
        };
        result = this.dash_service.update_visitor(edited_visitor);
        result.subscribe(function (x) {
        });
        this.router.navigate(['dashboard']);
        sessionStorage.removeItem('this_visitor_name');
        sessionStorage.removeItem('this_visitor_email');
        sessionStorage.removeItem('this_visitor_number');
        sessionStorage.removeItem('this_visitor_in_time');
        sessionStorage.removeItem('this_visitor_out_time');
        sessionStorage.removeItem('this_visitor_hmail');
        sessionStorage.removeItem('this_visitor_rec_name');
    };
    return editComponent;
}());
editComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'edit',
        templateUrl: 'edit.component.html',
        providers: [dash_service_1.DashService]
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, dash_service_1.DashService, router_1.Router])
], editComponent);
exports.editComponent = editComponent;
//# sourceMappingURL=edit.component.js.map