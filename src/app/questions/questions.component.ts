import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
totalQuestions:any;
easyQuestions:any;
mediumQuestions:any;
hardQuestions:any;
allCategories:any; 
  constructor(private apollo: Apollo,private route: ActivatedRoute,
    private router: Router) { }

  

  ngOnInit() {
    this.totalQuestions = this.apollo.watchQuery<any>({
      query: gql
      `
      query
      {
        
        totalEasyQuestionsCount
        totalMediumQuestionsCount
        totalHardQuestionsCount
        allCategories
        {
          id
          value
          
        }
      }

      `

    }).valueChanges.subscribe
    (  result =>{ 
      //console.log(result.data.totalEasyQuestions);
      this.easyQuestions = result.data.totalEasyQuestionsCount;
      this.mediumQuestions = result.data.totalMediumQuestionsCount;
      this.hardQuestions = result.data.totalHardQuestionsCount;
      this.totalQuestions=result.data.totalEasyQuestionsCount+result.data.totalMediumQuestionsCount+result.data.totalHardQuestionsCount;
      this.allCategories=result.data.allCategories;
     // console.log(this.allCategories);
    });  
    
   // console.log(this.allCategories);
  }
  totalQuestion(){    
    console.log("total question called ");
    this.router.navigateByUrl('app-list');
    console.log("total question called twice");
  }

  

  Question(val){
   
    console.log(" question called "+ val);
    this.router.navigate(['app-question-type-table',{type :val}]);
  }
}
