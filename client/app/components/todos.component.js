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
var todo_service_1 = require("../services/todo.service");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var TodosComponent = (function () {
    function TodosComponent(_todoService, router, formbuilder) {
        this._todoService = _todoService;
        this.router = router;
        this.formbuilder = formbuilder;
        this.e_mail = sessionStorage.getItem("host_email");
        this.host_name = sessionStorage.getItem('host_name');
    }
    TodosComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dashForm = this.formbuilder.group({
            name: ['', forms_1.Validators.required],
            email: ['', [forms_1.Validators.required, forms_1.Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
            number: ['', [forms_1.Validators.required, forms_1.Validators.minLength(10), forms_1.Validators.maxLength(10)]],
            in_time: ['', forms_1.Validators.required],
            out_time: ['', forms_1.Validators.required],
        });
        this.todos = [];
        var check = {
            hmail: this.e_mail
        };
        this._todoService.hostedTodo(check)
            .subscribe(function (todos) {
            _this.todos = todos;
        });
    };
    TodosComponent.prototype.addTodo = function (event, todoname, todoaddress, todonumber, todoin, todoout) {
        var _this = this;
        var result;
        var newTodo = {
            name: todoname.value,
            email: todoaddress.value,
            number: todonumber.value,
            in_time: todoin.value,
            out_time: todoout.value,
            hmail: this.e_mail,
            receptionist_name: this.host_name
        };
        result = this._todoService.saveTodo(newTodo);
        result.subscribe(function (x) {
            _this.todos.push(newTodo);
        });
        todoname.value = '';
        todoaddress.value = '';
        todoin.value = '';
        todonumber.value = '';
        todoout.value = '';
    };
    TodosComponent.prototype.setEditState = function (todo, state) {
        if (state) {
            todo.isEditMode = state;
        }
        else {
            delete todo.isEditMode;
        }
    };
    /*
      updateStatus(todo) {
        var _todo = {
          _id: todo._id,
          text: todo.text,
          isCompleted: !todo.isCompleted
        };
    
        this._todoService.updateTodo(_todo)
          .subscribe(data => {
            todo.isCompleted = !todo.isCompleted;
          });
      }
    */
    TodosComponent.prototype.updateTodoText = function (event, todo) {
        var _this = this;
        if (event.which === 13) {
            todo.text = event.target.value;
            var _todo = {
                _id: todo._id,
                text: todo.text,
                isCompleted: todo.isCompleted
            };
            this._todoService.updateTodo(_todo)
                .subscribe(function (data) {
                _this.setEditState(todo, false);
            });
        }
    };
    TodosComponent.prototype.logout = function () {
        sessionStorage.removeItem("hmail");
        this.router.navigate(['']);
        alert(" THANK YOU");
    };
    TodosComponent.prototype.deleteTodo = function (todo) {
        var todos = this.todos;
        this._todoService.deleteTodo(todo._id)
            .subscribe(function (data) {
            if (data.n == 1) {
                for (var i = 0; i < todos.length; i++) {
                    if (todos[i]._id == todo._id) {
                        todos.splice(i, 1);
                    }
                }
            }
        });
    };
    return TodosComponent;
}());
TodosComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'todos',
        templateUrl: 'todos.component.html',
        providers: [todo_service_1.TodoService]
    }),
    __metadata("design:paramtypes", [todo_service_1.TodoService, router_1.Router, forms_1.FormBuilder])
], TodosComponent);
exports.TodosComponent = TodosComponent;
//# sourceMappingURL=todos.component.js.map