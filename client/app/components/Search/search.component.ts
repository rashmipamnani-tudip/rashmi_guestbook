import { Component, OnInit } from '@angular/core'
import {Router,RouterModule} from '@angular/router'

@Component({
  moduleId: module.id,
  selector: 'search',
  templateUrl: 'search.component.html'
 })
export class searchComponent implements OnInit {

constructor (private router : Router ){}
  responses = JSON.parse(sessionStorage.getItem('search_item'));
ngOnInit(){
     if (sessionStorage.getItem('host_name')==null &&  sessionStorage.getItem('host_email')==null){
      alert("You need to login to continue");
      this.router.navigate(['']);
    }
}
goto_dashboard(){
this.router.navigate(['dashboard'])
}
  
}