import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Router, ActivatedRoute} from '@angular/router';
import {GraphQLService} from 'src/app/graph-ql.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  totalQuestions: any;
  easyQuestions: any;
  mediumQuestions: any;
  hardQuestions: any;
  allCategories: any;
  
  constructor( private router: Router,private graphQLService:GraphQLService,private spinner: NgxSpinnerService) { }



  ngOnInit() {
    this.graphQL();
    }
    graphQL(){
      this.spinner.show();
      const userAcquisition=gql`query
      {
        
        totalEasyQuestionsCount
        totalMediumQuestionsCount
        totalHardQuestionsCount
        allCategories
        {
          id
          value
          
        }
      }`;
      
      this.graphQLService.graphQuery(userAcquisition)
      .then ((result:any)=>{
        this.spinner.hide();
        console.log("result" , result);
        this.easyQuestions = result.data.totalEasyQuestionsCount;
          this.mediumQuestions = result.data.totalMediumQuestionsCount;
          this.hardQuestions = result.data.totalHardQuestionsCount;
          //this.totalQuestions = result.data.totalEasyQuestionsCount + result.data.totalMediumQuestionsCount + result.data.totalHardQuestionsCount;
          this.allCategories = result.data.allCategories;
      })
      .catch((err)=>{
        console.log("ERROR", err);
         this.spinner.hide()
      })
    
    }
  totalQuestion() {
    console.log("total question called ");
    this.router.navigateByUrl('app-list');
    console.log("total question called twice");
  }


categoryQuestion(val)
{
  if(val==='E')
  {
    this.router.navigate(['app-question-type-table', { type: val, category: this.easyQuestions }]);
  }
  else if (val==='M')
  {
    this.router.navigate(['app-question-type-table', { type: val, category: this.mediumQuestions }]);
  }
  else if(val==='H')
  {
    this.router.navigate(['app-question-type-table', { type: val, category: this.hardQuestions }]);
  }

}
  Question(val) {

    console.log(" question called " + val);
    this.router.navigate(['app-question-type-table', { type: val }]);
  }
}
