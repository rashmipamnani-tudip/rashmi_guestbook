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
var dash_service_1 = require("../../services/dash.service");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var DashComponent = (function () {
    function DashComponent(_dashService, router, formbuilder) {
        this._dashService = _dashService;
        this.router = router;
        this.formbuilder = formbuilder;
        this.e_mail = sessionStorage.getItem("host_email");
        this.host_name = sessionStorage.getItem('host_name');
    }
    DashComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dashForm = this.formbuilder.group({
            name: ['', forms_1.Validators.required],
            email: ['', [forms_1.Validators.required, forms_1.Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
            number: ['', [forms_1.Validators.required, forms_1.Validators.minLength(10), forms_1.Validators.maxLength(10)]],
        });
        this.visitors = [];
        var check = {
            hmail: this.e_mail
        };
        this._dashService.host_visitor(check)
            .subscribe(function (visitors) {
            _this.visitors = visitors;
        });
    };
    DashComponent.prototype.add_visitor = function (event, visitor_name, visitor_email, visitor_number) {
        var _this = this;
        var result;
        var new_visitor = {
            name: visitor_name.value,
            email: visitor_email.value,
            number: visitor_number.value,
            in_time: new Date().toTimeString().split(" ")[0],
            out_time: "",
            hmail: this.e_mail,
            receptionist_name: this.host_name
        };
        result = this._dashService.save_visitors(new_visitor);
        result.subscribe(function (x) {
            _this.visitors.push(new_visitor);
        });
        visitor_name.value = '';
        visitor_email.value = '';
        visitor_number.value = '';
    };
    DashComponent.prototype.logout = function () {
        sessionStorage.removeItem("hmail");
        this.router.navigate(['']);
        alert(" THANK YOU");
    };
    DashComponent.prototype.delete_visitor = function (visitor) {
        var visitors = this.visitors;
        this._dashService.delete_visitor(visitor._id)
            .subscribe(function (data) {
            if (data.n == 1) {
                for (var i = 0; i < visitors.length; i++) {
                    if (visitors[i]._id == visitor._id) {
                        visitors.splice(i, 1);
                    }
                }
            }
        });
    };
    DashComponent.prototype.search = function (event, search_data) {
        var _this = this;
        this.search_ = [];
        this.visitors.forEach(function (element) {
            if (element.name.search(search_data.value) == 0) {
                _this.search_.push(element);
            }
        });
        var sharedData = JSON.stringify(this.search_);
        sessionStorage.setItem('search_item', sharedData);
        // var response = JSON.parse(sessionStorage.getItem('search_item'))
        this.router.navigate(['search']);
        //console.log(response[0].email);
    };
    DashComponent.prototype.edit_visitor = function (visitor) {
        sessionStorage.setItem('this_visitor_name', visitor.name);
        sessionStorage.setItem('this_visitor_email', visitor.email);
        sessionStorage.setItem('this_visitor_number', visitor.number);
        sessionStorage.setItem('this_visitor_in_time', visitor.in_time);
        sessionStorage.setItem('this_visitor_out_time', visitor.out_time);
        sessionStorage.setItem('this_visitor_hmail', visitor.hmail);
        sessionStorage.setItem('this_visitor_rec_name', visitor.receptionist_name);
        this.router.navigate(['edit']);
    };
    DashComponent.prototype.out = function (visitor) {
        var result;
        var out_visitor = {
            name: visitor.name,
            email: visitor.email,
            number: visitor.number,
            in_time: visitor.in_time,
            out_time: new Date().toTimeString().split(" ")[0],
            hmail: visitor.hmail,
            receptionist_name: visitor.receptionist_name
        };
        result = this._dashService.update_visitor(out_visitor);
        result.subscribe(function (x) {
        });
    };
    return DashComponent;
}());
DashComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'dash_board',
        templateUrl: 'dashboard.component.html',
        providers: [dash_service_1.DashService]
    }),
    __metadata("design:paramtypes", [dash_service_1.DashService, router_1.Router, forms_1.FormBuilder])
], DashComponent);
exports.DashComponent = DashComponent;
//# sourceMappingURL=dashboard.component.js.map