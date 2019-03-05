import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';


import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-question-category',
  templateUrl: './question-category.component.html',
  styleUrls: ['./question-category.component.scss']
})
export class QuestionCategoryComponent implements OnInit {
  expandCategories =false;
  categories:any;
  
 
  category_hold=[];
  category_hold_value=[];
  temp;

  i;
  category_count;
  easy=[];
  medium=[];
  hard=[];
cat=[];
  constructor(private apollo: Apollo,private route: ActivatedRoute,
    private router: Router) { 
      
    }
  viewAll(){
         //console.log("hey");
    this.expandCategories = !this.expandCategories;
    
  }
  ngOnInit() {
    this.categories = this.apollo.watchQuery<any>({
      query: gql`
      query
{
  allCategories
  {   
    id 
    value
  }
 }`
    }).valueChanges.subscribe(
      result =>{
        //console.log(this)
        this.category_hold_value=result.data.allCategories.map((element) => element.value);
        this.category_hold=result.data.allCategories;
       // console.log("category_hold"+this.category_hold);
         for(var i=0;i<this.category_hold.length;i++)
         {
           //console.log(this.category_hold_value[i]);
              
           this.fetch(this.category_hold_value[i],i);

           }
          // console.log("hellp"+this.cat[0]);
        // this.category_hold_value.forEach(element => {
        //  // console.log(this)
        //   element.count=0;
        //   //console.log(element);
        //   this.fetch(element);
        
        // });
     
      }
      
    )
   
   }
  
  
  fetch( category: any ,index)
  { 
    //console.log( "hs"+ category);
    this.temp = this.apollo.watchQuery<any>({
      query: gql`
      query
{
  categoryQuestionsCount(category:"${category}")
  E:categoryQuestionsCount(category:"${category}",difficulty:"E")
  M:categoryQuestionsCount(category:"${category}",difficulty:"M")
  H:categoryQuestionsCount(category:"${category}",difficulty:"H")
} `
    }).valueChanges.subscribe(
      result =>{
        this.cat=result.data.categoryQuestionsCount;
        this.easy=result['data']['E'];
        this.medium=result['data']['M'];
        this.hard=result['data']['H'];
        //console.log(category + " : " +this.cat +": easy"+ this.easy+": medium"+ this.medium+": hard"+ this.hard);
        this.category_hold[index]['count'] = this.cat;
        this.category_hold[index]['count_easy'] = this.easy;
        this.category_hold[index]['count_medium'] = this.medium;
        this.category_hold[index]['count_hard'] = this.hard;
        // console.log("------------------------- ",JSON.stringify(this.category_hold));
        // this.easy=result.data.categoryEasyQuestionsCount;
        // this.medium=result.data.categoryMediumQuestionsCount;
        // this.hard=result.data.categoryHardQuestionsCount;
       // console.log( this.category_count);
       
        //this.temp=result.data.allCategories.map(element=> element.value);
        //console.log( this.temp);
       // console.log(this.category_hold[0].value);
      }
    )
return this.cat;
  }
  total_Category_Question(categoryName,categoryCount)
  {
    console.log(categoryName);
    console.log(categoryCount);
    this.router.navigate(['app-total-category-questions',{name :categoryName, count: categoryCount}]);
  }
  categoryWiseQuestions(categoryName,categoryType)
  {
    console.log("category : "+categoryName + " categoryType"+ categoryType);
    this.router.navigate(['app-difficulty-wise-category-questions',{name :categoryName, type: categoryType }]);
  }
}
  
