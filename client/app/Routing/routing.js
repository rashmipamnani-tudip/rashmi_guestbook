"use strict";
var login_component_1 = require("../components/Login/login.component");
var register_component_1 = require("../components/Register/register.component");
var dashboard_component_1 = require("../components/Dashboard/dashboard.component");
var search_component_1 = require("../components/Search/search.component");
var edit_component_1 = require("../components/Edit/edit.component");
exports.signupRoutes = [
    { path: 'signup', component: register_component_1.RegisterComponent },
    { path: 'dashboard', component: dashboard_component_1.DashComponent },
    { path: 'search', component: search_component_1.searchComponent },
    { path: 'edit', component: edit_component_1.editComponent },
    { path: '', component: login_component_1.LoginComponent }
];
//# sourceMappingURL=routing.js.map