import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-writers',
  templateUrl: './writers.component.html',
  styleUrls: ['./writers.component.css']
})
export class WritersComponent implements OnInit {

  myForm = new FormGroup({
    myDateDMY: new FormControl(new Date()),
    
  });
  constructor() { }

  ngOnInit() {
  }

}
