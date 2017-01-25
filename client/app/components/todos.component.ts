import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../Todo';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router, RouterModule } from '@angular/router'

@Component({
  moduleId: module.id,
  selector: 'todos',
  templateUrl: 'todos.component.html',
  providers: [TodoService]
})

export class TodosComponent implements OnInit {
  todos: Todo[];
  dashForm: FormGroup;
  e_mail = localStorage.getItem("host_email");

  constructor(private _todoService: TodoService, private router: Router, private formbuilder: FormBuilder) {

  }

  ngOnInit() {
    this.dashForm = this.formbuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
      number: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      in_time: ['', Validators.required],
      out_time: ['', Validators.required]
    });

    this.todos = [];

    var check = {
      hmail: this.e_mail
    }
    this._todoService.hostedTodo(check)
      .subscribe(todos => {
        this.todos = todos;
      });

  }

  addTodo(event, todoname, todoaddress, todonumber, todoin, todoout) {
    var result;
    var newTodo = {
      name: todoname.value,
      email: todoaddress.value,
      number: todonumber.value,
      in_time: todoin.value,
      out_time: todoout.value,
      hmail: this.e_mail
    };

    result = this._todoService.saveTodo(newTodo);
    result.subscribe(x => {
      this.todos.push(newTodo);
    });

    todoname.value = '';
    todoaddress.value = '';
    todoin.value = '';
    todonumber.value = '';
    todoout.value = '';
  }

  setEditState(todo, state) {
    if (state) {
      todo.isEditMode = state;
    } else {
      delete todo.isEditMode;
    }
  }

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
  updateTodoText(event, todo) {
    if (event.which === 13) {
      todo.text = event.target.value;
      var _todo = {
        _id: todo._id,
        text: todo.text,
        isCompleted: todo.isCompleted
      };

      this._todoService.updateTodo(_todo)
        .subscribe(data => {
          this.setEditState(todo, false);
        })
    }
  }
  logout() {

    localStorage.removeItem("hmail");
    this.router.navigate(['']);
    alert(" THANK YOU");

  }
  deleteTodo(todo) {
    var todos = this.todos;

    this._todoService.deleteTodo(todo._id)
      .subscribe(data => {
        if (data.n == 1) {
          for (var i = 0; i < todos.length; i++) {
            if (todos[i]._id == todo._id) {
              todos.splice(i, 1);
            }
          }
        }
      })
  }
}
