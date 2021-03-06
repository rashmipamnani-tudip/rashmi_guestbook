import { Component, OnInit } from '@angular/core'
import { Router, RouterModule } from '@angular/router'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { DashService } from '../../services/dash.service'

@Component({
    moduleId: module.id,
    selector: 'edit',
    templateUrl: 'edit.component.html',
    providers: [DashService]
})
export class editComponent implements OnInit {

    

    edit_form: FormGroup;
    get_hmail = sessionStorage.getItem('this_visitor_hmail');
    get_hname = sessionStorage.getItem('this_visitor_rec_name');
    get_in_date = sessionStorage.getItem('this_visitor_in_time');
    get_in_time = sessionStorage.getItem('this_visitor_in_time');
    get_out_date = sessionStorage.getItem('this_visitor_out_time');
    get_out_time = sessionStorage.getItem('this_visitor_out_time');


    constructor(private formbuilder: FormBuilder, private dash_service: DashService, private router: Router) {
    }

    ngOnInit() {

          if (sessionStorage.getItem('host_name')==null &&  sessionStorage.getItem('host_email')==null){
      alert("You need to login to continue");
      this.router.navigate(['']);
    }

        var get_name = sessionStorage.getItem('this_visitor_name');
        var get_email = sessionStorage.getItem('this_visitor_email');
        var get_number = sessionStorage.getItem('this_visitor_number');
        var get_in_time = sessionStorage.getItem('this_visitor_in_time');
        var get_out_time = sessionStorage.getItem('this_visitor_out_time');

        this.edit_form = this.formbuilder.group({
            name: [get_name, Validators.required],
            email: [get_email, [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
            number: [get_number, [Validators.required,Validators.pattern("[1-9][0-9]{9}")]],
            in_time: [get_in_time, Validators.required],
            out_time: [get_out_time, Validators.required]
        });
    }

    save_edited(event, name, email, number, intime, outtime) {
        var result;
        var edited_visitor = {
            name: name.value,
            email: email.value,
            number: number.value,
            in_date:this.get_in_date,
            in_time: this.get_in_time,
            out_date: this.get_out_date,
            out_time: this.get_out_time,
            hmail: this.get_hmail,
            receptionist_name: this.get_hname
        };

        result = this.dash_service.update_visitor(edited_visitor);

        result.subscribe(x => {

        });

        this.router.navigate(['dashboard']);
        sessionStorage.removeItem('this_visitor_name');
        sessionStorage.removeItem('this_visitor_email');
        sessionStorage.removeItem('this_visitor_number');
        sessionStorage.removeItem('this_visitor_in_date');
        sessionStorage.removeItem('this_visitor_in_time');
        sessionStorage.removeItem('this_visitor_out_date');
        sessionStorage.removeItem('this_visitor_out_time');
        sessionStorage.removeItem('this_visitor_hmail');
        sessionStorage.removeItem('this_visitor_rec_name');


    }

}