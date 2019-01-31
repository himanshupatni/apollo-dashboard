import { Component, OnInit,OnChanges ,SimpleChanges} from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';


import gql from 'graphql-tag';

import { Qunami,Que} from '../types';//,Rate,Le


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

qunamiUsers : Observable<Qunami[]>;
allQuestions:any //Observable<any>;

temp =[]


  constructor(private apollo: Apollo) { }
  value(n: number) {
    this.allQuestions=this.apollo.watchQuery<any> ({
      query: gql `
      
query {
allQuestions(first:${n},sportsType_GameType:"gk"){
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
      
      
      questionCategory{
        value
      }
      
    }
  }
  }
}
`,
    }).valueChanges.subscribe
    (  result =>{ 
      console.log(result.data.allQuestions.edges);
      this.temp = result.data.allQuestions.edges.map((element)=>element.node);
      return result.data.allQuestions.edges;
    })   
    
  }
  Search(keyword:string)
    {
      if(keyword=='')
      {
        this.ngOnInit();
      }
      else
      {
      this.allQuestions=this.apollo.watchQuery<any> ({
        query: gql `
        
  query {
  allQuestions(first:7,questionText_Icontains:"${keyword}"){
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
        
        
        questionCategory{
          value
        }
        
      }
    }
    }
  }
  `,
      }).valueChanges.subscribe
      (  result =>{ 
        console.log(result.data.allQuestions.edges);
        this.temp = result.data.allQuestions.edges.map((element)=>element.node);
        return result.data.allQuestions.edges;
      })  
    }
  }
  ngOnInit() {
   
      this.allQuestions=this.apollo.watchQuery<any> ({
        query: gql `
        
query {
  allQuestions(first:10,sportsType_GameType:"gk"){
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
        
        
        questionCategory{
          value
        }
        
      }
    }
    }
}
`,
      }).valueChanges.subscribe
      (  result =>{ 
        console.log(result.data.allQuestions.edges);
        this.temp = result.data.allQuestions.edges.map((element)=>element.node);
        return result.data.allQuestions.edges;
      })   

}
