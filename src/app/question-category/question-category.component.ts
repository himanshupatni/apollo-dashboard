import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-question-category',
  templateUrl: './question-category.component.html',
  styleUrls: ['./question-category.component.scss']
})
export class QuestionCategoryComponent implements OnInit {
  expandCategories =false;
  constructor() { }
  
  ngOnInit() {
  }
  
  viewAll(){
    
    
    console.log("hey");
    this.expandCategories = !this.expandCategories;
    
  }
}
