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
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var loginService = (function () {
    function loginService(_http) {
        this._http = _http;
    }
    loginService.prototype.verifyUser = function (myuser) {
        var headers = new http_1.Headers();
        console.log("Here we are...");
        headers.append('Content-Type', 'application/json');
        return this._http.post('/api/v1/find', JSON.stringify(myuser), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    return loginService;
}());
loginService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], loginService);
exports.loginService = loginService;
//# sourceMappingURL=login.service.js.map