import { Component, OnInit } from '@angular/core'
import {Router,RouterModule} from '@angular/router'

@Component({
  moduleId: module.id,
  selector: 'search',
  templateUrl: 'search.component.html'
 })
export class searchComponent{

constructor (private router : Router ){}
  responses = JSON.parse(sessionStorage.getItem('search_item'));
goto_dashboard(){
this.router.navigate(['dashboard'])
}
  
}