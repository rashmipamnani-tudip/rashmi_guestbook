"use strict";
var login_component_1 = require("../components/Login/login.component");
var register_component_1 = require("../components/Register/register.component");
var dashboard_component_1 = require("../components/Dashboard/dashboard.component");
exports.signupRoutes = [
    { path: 'signup', component: register_component_1.RegisterComponent },
    { path: 'dashboard', component: dashboard_component_1.DashComponent },
    { path: '', component: login_component_1.LoginComponent }
];
//# sourceMappingURL=routing.js.map