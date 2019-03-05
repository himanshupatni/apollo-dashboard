import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-question-type-table',
  templateUrl: './question-type-table.component.html',
  styleUrls: ['./question-type-table.component.css']
})
export class QuestionTypeTableComponent implements OnInit {
  temp = [];
  productID;

  allQuestions;
  constructor(private apollo: Apollo, private route: ActivatedRoute) {
    this.productID = route.snapshot.params['type'];
    console.log(this.productID);
  }

  ngOnInit() {


    this.allQuestions = this.apollo.watchQuery<any>({
      query: gql`
      query {
getQuestions(first:10,sportsType_GameType:"gk", difficultyLevel_Value:"${this.productID}"){
  edges
  {
    node{
      questionText
      optionA
      optionB
      optionC
      optionD
      correctAnswer
      sourceDifficultyLevel
      difficultyLevel
      {
        value
      }
      questionCategory{
        value
      }        
    }
  }
  }
}
`,
    }).valueChanges.subscribe
      (result => {
        console.log(result.data.getQuestions.edges);
        this.temp = result.data.getQuestions.edges.map((element) => element.node);
        return result.data.getQuestions.edges;
      })
  }
  Search(keyword: string) {
    if (keyword == '') {
      this.ngOnInit();
    }
    else {
      this.allQuestions = this.apollo.watchQuery<any>({
        query: gql`
        query {
  getQuestions(first:10,questionText_Icontains:"${keyword}"){
    edges
    {
      node{
        questionText
        optionA
        optionB
        optionC
        optionD
        difficultyLevel
      {
        value
      }
        correctAnswer
        sourceDifficultyLevel
        questionCategory{
        value
        }
        
      }
    }
    }
  }
  `,
      }).valueChanges.subscribe
        (result => {
          console.log(result.data.getQuestions.edges);
          this.temp = result.data.getQuestions.edges.map((element) => element.node);
          return result.data.getQuestions.edges;
        })
    }
  }
}
