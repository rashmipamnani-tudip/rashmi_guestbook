"use strict";
var login_component_1 = require("../components/Login/login.component");
var register_component_1 = require("../components/Register/register.component");
var todos_component_1 = require("../components/todos.component");
exports.signupRoutes = [
    { path: 'signup', component: register_component_1.RegisterComponent },
    { path: 'dashboard', component: todos_component_1.TodosComponent },
    { path: '', component: login_component_1.LoginComponent }
];
//# sourceMappingURL=routing.js.map