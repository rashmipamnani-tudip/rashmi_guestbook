import { Component, OnInit } from '@angular/core';
import { DashService } from '../../services/dash.service';
import { visitors } from './visitor';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router, RouterModule } from '@angular/router'
import { Pipe, PipeTransform } from '@angular/core'

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
  host_role = sessionStorage.getItem('host_role');
  constructor(private _dashService: DashService, private router: Router, private formbuilder: FormBuilder) {

  }

  ngOnInit() {

    if (sessionStorage.getItem('host_name') == null && sessionStorage.getItem('host_role') == null && sessionStorage.getItem('host_email') == null) {
      alert("You need to login to continue");
      this.router.navigate(['']);
    }


    this.dashForm = this.formbuilder.group({
      name: ['', [Validators.required, Validators.pattern("^[a-zA-Z\s]+$")]],
      email: ['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
      number: ['', [Validators.required, Validators.pattern("[1-9][0-9]{9}")]],


    });

    this.visitors = [];

    var check = {
      hmail: this.e_mail,
      role: this.host_role
    }
    this._dashService.host_visitor(check)
      .subscribe(visitors => {
        this.visitors = visitors;
      });

  }

  add_visitor(event, visitor_name, visitor_email, visitor_number) {
    var input = document.getElementById("toast");
    if (visitor_name.value == '' || visitor_number.value == '' || visitor_email == '') {
      input.className = "show";
      input.innerHTML = "Some required fields are not filled";
      input.style.background = "#ff1a1a";
      setTimeout(function () { input.className = input.className.replace("show", ""); }, 3000);
    } else if (!this.dashForm.valid) {
      input.className = "show";
      input.innerHTML = "Enter Valid data";
      input.style.background = "#ff1a1a";
      setTimeout(function () { input.className = input.className.replace("show", ""); }, 3000);
    } else {
      var result;
      var new_visitor = {
        name: visitor_name.value,
        email: visitor_email.value,
        number: visitor_number.value,
        in_date: new Date().getDate() + "-" + new Date().getMonth() + 1 + "-" + new Date().getFullYear(),
        in_time: new Date().toTimeString().split(" ")[0],
        out_date: "",
        out_time: "",
        hmail: this.e_mail,
        receptionist_name: this.host_name
      };

      result = this._dashService.save_visitors(new_visitor);
      result.subscribe(x => {
        this.visitors.unshift(new_visitor);
      });
      input.className = "show";
      input.innerHTML = "Data added";
      input.style.background = "#1add1a";
      setTimeout(function () { input.className = input.className.replace("show", ""); }, 3000);

      visitor_name.value = '';
      visitor_email.value = '';
      visitor_number.value = '';
    }

  }

  logout() {


    sessionStorage.removeItem('host_email');
    sessionStorage.removeItem('host_role');
    sessionStorage.removeItem('host_name');


    sessionStorage.removeItem('this_visitor_name');
    sessionStorage.removeItem('this_visitor_email');
    sessionStorage.removeItem('this_visitor_number');
    sessionStorage.removeItem('this_visitor_in_date');
    sessionStorage.removeItem('this_visitor_in_time');
    sessionStorage.removeItem('this_visitor_out_date');
    sessionStorage.removeItem('this_visitor_out_time');
    sessionStorage.removeItem('this_visitor_hmail');
    sessionStorage.removeItem('this_visitor_rec_name');
    this.router.navigate(['']);


  }

  delete_visitor(visitor) {
    var input = document.getElementById("toast");
    var visitors = this.visitors;
    var data = confirm("Visitor will be deleted. Do you want to continue?")
    if (data == true) {
      this._dashService.delete_visitor(visitor._id)
        .subscribe(data => {
          if (data.n == 1) {
            for (var i = 0; i < visitors.length; i++) {
              if (visitors[i]._id == visitor._id) {
                visitors.splice(i, 1);
              }
            }
          }
        });

      var check = {
        hmail: visitor.hmail,
        role: this.host_role
      }
      this._dashService.host_visitor(check)
        .subscribe(visitors => {
          this.visitors = visitors;
        });
      input.className = "show";
      input.innerHTML = "Visitor deleted successfully";
      input.style.background = "#1add1a";
      setTimeout(function () { input.className = input.className.replace("show", ""); }, 3000);

    }
  }

  search(event, search_data) {
    var input = document.getElementById("toast");
    this.search_ = [];
    var str1 = search_data.value.toString().toLowerCase().trim();
    if (str1.length > 0) {


      this.visitors.forEach(element => {
        var str2 = element.name.toString().toLowerCase().trim();

        if (str2.search(str1) != -1) {
          this.search_.push(element);
          var sharedData = JSON.stringify(this.search_);
          sessionStorage.setItem('search_item', sharedData);
          this.router.navigate(['search']);
        }

      });

      if (this.search_.length == 0) {
        input.className = "show";
        input.innerHTML = "No visitor found";
        input.style.background = "#ff1a1a";
        setTimeout(function () { input.className = input.className.replace("show", ""); }, 3000);
      }
    }
    else {
      input.className = "show";
      input.innerHTML = "Please enter some data";
      input.style.background = "#ff1a1a";
      setTimeout(function () { input.className = input.className.replace("show", ""); }, 3000);
    }


  }


  edit_visitor(visitor) {

    sessionStorage.setItem('this_visitor_name', visitor.name);
    sessionStorage.setItem('this_visitor_email', visitor.email);
    sessionStorage.setItem('this_visitor_number', visitor.number);
    sessionStorage.setItem('this_visitor_in_date', visitor.in_date);
    sessionStorage.setItem('this_visitor_in_time', visitor.in_time);
    sessionStorage.setItem('this_visitor_out_date', visitor.out_date)
    sessionStorage.setItem('this_visitor_out_time', visitor.out_time);
    sessionStorage.setItem('this_visitor_hmail', visitor.hmail);
    sessionStorage.setItem('this_visitor_rec_name', visitor.receptionist_name);
    this.router.navigate(['edit']);

  }

  out(visitor) {
    var result;
    var out_visitor = {
      name: visitor.name,
      email: visitor.email,
      number: visitor.number,
      in_date: visitor.in_date,
      in_time: visitor.in_time,
      out_date: new Date().getDate() + "-" + new Date().getMonth() + 1 + "-" + new Date().getFullYear(),
      out_time: new Date().toTimeString().split(" ")[0],
      hmail: visitor.hmail,
      receptionist_name: visitor.receptionist_name
    };
    result = this._dashService.update_visitor(out_visitor)

    result.subscribe(x => {
      console.log(this.visitors);
      this.visitors.forEach(element => {
        if (element.email == visitor.email) {
          element.out_time = x.out_time;
        }
      });
    });




    var check = {
      hmail: visitor.hmail,
      role: this.host_role
    }
    this._dashService.host_visitor(check)
      .subscribe(visitors => {
        this.visitors = visitors;
      });
  }

}
