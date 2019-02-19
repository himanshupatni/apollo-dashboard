import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';
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
 
  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.totalQuestions = this.apollo.watchQuery<any>({
      query: gql
      `
      query
      {
        
        totalEasyQuestions
        totalMediumQuestions
        totalHardQuestions
      }

      `

    }).valueChanges.subscribe
    (  result =>{ 
      console.log(result.data.totalEasyQuestions);
      this.easyQuestions = result.data.totalEasyQuestions;
      this.mediumQuestions = result.data.totalMediumQuestions;
      this.hardQuestions = result.data.totalHardQuestions;
    
      this.totalQuestions=result.data.totalEasyQuestions+result.data.totalMediumQuestions+result.data.totalHardQuestions;
     
      

    });
    
    console.log(this.easyQuestions,this.mediumQuestions,this.hardQuestions);
    //console.log(typeof(this.totalQuestions),typeof(this.easyQuestions),typeof(this.mediumQuestions),typeof(this.hardQuestions),this.hardQuestions.valueOf());
    
  }

}
