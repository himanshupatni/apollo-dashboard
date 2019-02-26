import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
@Component({
  selector: 'app-difficulty-wise-category-questions',
  templateUrl: './difficulty-wise-category-questions.component.html',
  styleUrls: ['./difficulty-wise-category-questions.component.css']
})
export class DifficultyWiseCategoryQuestionsComponent implements OnInit {
  categoryQuestionsType;
  categoryQuestionsName;
  allQuestions;
  temp=[];
  constructor(private route: ActivatedRoute,private apollo: Apollo) {
    this.categoryQuestionsType = route.snapshot.params['type'];
    this.categoryQuestionsName = route.snapshot.params['name'];
    
    console.log("total"+this.categoryQuestionsType);
    console.log("total"+this.categoryQuestionsName);
    
   }
   ngOnInit() {
      
    this.allQuestions=this.apollo.watchQuery<any> ({
      query: gql `
      query
      {
        
      getQuestions(first:10,questionCategory_Value:"${this.categoryQuestionsName}",difficultyLevel_Value:"${this.categoryQuestionsType}"){
        edges
        {
          node{
            questionText
            optionA
            optionB
            optionC
            optionD
            correctAnswer
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
    (  result =>{ 
      console.log(result.data.getQuestions.edges);
      this.temp = result.data.getQuestions.edges.map((element)=>element.node);
      return result.data.getQuestions.edges;
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
getQuestions(first:7,questionText_Icontains:"${keyword}"){
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
      console.log(result.data.getQuestions.edges);
      this.temp = result.data.getQuestions.edges.map((element)=>element.node);
      return result.data.getQuestions.edges;
    })  
  }
}
}
