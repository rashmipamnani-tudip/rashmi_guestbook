import { Component, OnInit } from '@angular/core';
import { DashService} from '../../services/dash.service';
import { visitors } from './visitor';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router, RouterModule } from '@angular/router'

@Component({
  moduleId: module.id,
  selector: 'dash_board',
  templateUrl: 'dashboard.component.html',
  providers: [DashService]
})

export class DashComponent implements OnInit {
  visitors: visitors[];
  search_: visitors[];
  dashForm: FormGroup;
  e_mail = sessionStorage.getItem("host_email");
  host_name = sessionStorage.getItem('host_name');
  constructor(private _dashService: DashService, private router: Router, private formbuilder: FormBuilder) {

  }

  ngOnInit() {


    this.dashForm = this.formbuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
      number: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      in_time: ['', Validators.required],
      out_time: ['', Validators.required],

    });

    this.visitors = [];

    var check = {
      hmail: this.e_mail
    }
    this._dashService.host_visitor(check)
      .subscribe(visitors => {
        this.visitors = visitors;
      });

  }

  add_visitor(event, visitor_name, visitor_email, visitor_number, visitor_in, visitor_out) {
    var result;
    var new_visitor = {
      name: visitor_name.value,
      email: visitor_email.value,
      number: visitor_number.value,
      in_time: visitor_in.value,
      out_time: visitor_out.value,
      hmail: this.e_mail,
      receptionist_name: this.host_name
    };

    result = this. _dashService.save_visitors(new_visitor);
    result.subscribe(x => {
      this.visitors.push(new_visitor);
    });

    visitor_name.value = '';
    visitor_email.value = '';
    visitor_in.value = '';
    visitor_number.value = '';
    visitor_out.value = '';
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
/*  updateTodoText(event, todo) {
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
  }*/

  logout() {

    sessionStorage.removeItem("hmail");
    this.router.navigate(['']);
    alert(" THANK YOU");

  }

  delete_visitor(visitor) {
    var visitors = this.visitors;

    this._dashService.delete_visitor(visitor._id)
      .subscribe(data => {
        if (data.n == 1) {
          for (var i = 0; i < visitors.length; i++) {
            if (visitors[i]._id == visitor._id) {
              visitors.splice(i, 1);
            }
          }
        }
      })
  }

  search(event, search_data){
    this.search_ = [];
    this.visitors.forEach(element => {if (element.name.search(search_data.value) == 0) 
      {this.search_.push(element);
        }
      });
      var sharedData = JSON.stringify(this.search_);
      sessionStorage.setItem('search_item',sharedData);
     // var response = JSON.parse(sessionStorage.getItem('search_item'))
     this.router.navigate(['search']);
      //console.log(response[0].email);
  }
}
