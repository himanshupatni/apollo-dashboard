import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { GraphQLService } from '../graph-ql.service';
import { Subscription } from 'rxjs';
import {NgbDate, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { query } from '@angular/core/src/render3';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  name: any;
  password: any;
  // passwordShown: boolean = false;
  token: any;
  type= "password";
  show=false;
  constructor(private graphService : GraphQLService,private spinner: NgxSpinnerService) { }

  ngOnInit() {
  }
  login(){
    this.spinner.show();

    console.log(this.name, this.password);
      this.graphService.dashboardLogin(this.name, this.password)
      .then(()=>{
    this.spinner.hide();

        this.graphService.shouldLogin = true;
      })
      .catch((err)=>{
    this.spinner.hide();

        console.log("ERROR", err);
        
      })
  }
  toggleShow()
  {
      this.show = !this.show;
      if (this.show){
          this.type = "text";
      }
      else {
          this.type = "password";
      }
  }

}
