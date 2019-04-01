import { Component, OnInit, Input } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Sort } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question-category',
  templateUrl: './question-category.component.html',
  styleUrls: ['./question-category.component.scss']
})
export class QuestionCategoryComponent implements OnInit {
  expandCategories = false;
  @Input('matSortStart')  start: 'asc' | 'desc';
  categories: any;
  allCategory1: string = '';
  category_hold = [];
  category_hold_value = [];
  temp;
  i;
  // element: HTMLElement;
  totalArray = [];
  query: string;
  category_count;
  sortedData;
  // removeSpacee;
  table_sort = [];
  // easy = [];
  // medium = [];
  // hard = [];
  cat = [];

  constructor(private apollo: Apollo, private router: Router,private spinner: NgxSpinnerService)//
  {
     this.sortedData = this.table_sort.slice();
    // console.log("sorted" + this.sortedData);

  }
 
  ngOnInit() {
    
    var temp: Sort = {
      active: 'false', direction: ''
    }
    this.GraphQL();
    this.sortData(temp);
    // this.tablemaker(this.category_hold,this.cat,this.totalArray)

  }

  GraphQL() {
    
this.spinner.show();

    this.categories = this.apollo.watchQuery<any>({
      query: gql`
      query
{
  allCategories
  {   
    id 
    value
  }
 }`,
    }).valueChanges.subscribe(
      result => {
        this.spinner.hide();

        this.category_hold_value = result.data.allCategories.map((element) => element.value);
        this.category_hold = result.data.allCategories;
        // console.log(this.category_hold);
        // console.log(this.category_hold_value);
        for (var i = 0; i < this.category_hold_value.length; i++) {
          this.totalArray[i] = this.category_hold_value[i].replace(/ /g, '');

        }

        this.allCategory(this.category_hold_value);
      }

    )

  }
  /**
   * 
   * @param categoryName Holding the Category Name 
   * @param categoryCount Holding the Category Count
   */
  total_Category_Question(categoryName, categoryCount) {
    // console.log(categoryName);
    // console.log(categoryCount);
    console.log("9");

    this.router.navigate(['app-total-category-questions', { name: categoryName, count: categoryCount }]);
  }

  categoryWiseQuestions(categoryName, categoryType) {
    console.log("7");

    // console.log("category : " + categoryName + " categoryType" + categoryType);
    this.router.navigate(['app-difficulty-wise-category-questions', { name: categoryName, type: categoryType }]);
  }
  allCategory(category_hold_value) {
this.spinner.show();
    

    for (var i = 0; i < category_hold_value.length; i++) {
      this.allCategory1 += `
 E_${category_hold_value[i].replace(/ /g, '')}:categoryQuestionsCount(category:"${category_hold_value[i]}",difficulty:"E")
 M_${category_hold_value[i].replace(/ /g, '')}:categoryQuestionsCount(category:"${category_hold_value[i]}",difficulty:"M")
 H_${category_hold_value[i].replace(/ /g, '')}:categoryQuestionsCount(category:"${category_hold_value[i]}",difficulty:"H")
    `;
    }

    this.query = "query {" + this.allCategory1 + "}";

    // Graphql Ql Call
    this.temp = this.apollo.watchQuery<any>({
      query: gql`${this.query}`
    }).valueChanges.subscribe(
      result => {
this.spinner.hide();

        this.cat = result.data;
        //console.log(this.cat);

        this.tablemaker(this.category_hold, this.cat, this.totalArray);
      }

    )

    return this.cat;

  }
  sortData(sort: Sort) {
    console.log("5");
    console.log(this.table_sort);
    
    
    const data = this.table_sort;
    console.log(data);
    
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      // console.log(this.sortedData);
      return ;
      }

    this.sortedData = data.sort((a, b) => {
      // type SortDirection = 'asc' | 'desc' | '';
      const isAsc = sort.direction === 'asc';
      
      // var number=document.getElementById("t+"); 


      // console.log(number);
      switch (sort.active) {
        case 'name': return this.compare(a.name, b.name, isAsc);
        case 'total': return this.compare(a.total, b.total, isAsc);
        case 'easy': return this.compare(a.easy, b.easy, isAsc);
        case 'medium': return this.compare(a.medium, b.medium, isAsc);
        case 'hard': return this.compare(a.hard, b.hard, isAsc);

        default: return 0;
      }
    });
  }

  tablemaker(category_hold, cat, totalArray) {
    console.log("4");

    for (var i = 0; i < category_hold.length; i++) {
      var tablerow = {};
      tablerow['id'] = category_hold[i].id;
      tablerow['name'] = category_hold[i].value;
      var easy = "E_" + totalArray[i]
      var medium = "M_" + totalArray[i]
      var hard = "H_" + totalArray[i]

      tablerow['easy'] = cat[easy];
      tablerow['medium'] = cat[medium];
      tablerow['hard'] = cat[hard];
      tablerow['total'] = cat[easy] + cat[medium] + cat[hard];
      // console.log(totalArray[i]);
      this.table_sort.push(tablerow);

    }
    console.log(this.table_sort);
    
  }
   compare(a: number | string, b: number | string, isAsc: boolean) {
    console.log("6");
  
    console.log("Compare Called");
  
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}






