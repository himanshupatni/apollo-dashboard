import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
@Component({
  selector: 'app-total-category-questions',
  templateUrl: './total-category-questions.component.html',
  styleUrls: ['./total-category-questions.component.css']
})
export class TotalCategoryQuestionsComponent implements OnInit {
  categoryQuestionsCount;
  categoryQuestionsName;
  allQuestions;
  edit_save;
  easy_pic=false;
  medium_pic=false;
  hard_pic=false;
  // categoryQuestionsType;
  temp=[];
  constructor(private route: ActivatedRoute,private apollo: Apollo) {
    this.categoryQuestionsCount = route.snapshot.params['count'];
    this.categoryQuestionsName = route.snapshot.params['name'];
    // this.categoryQuestionsType = route.snapshot.params['type'];
    console.log("total-cat"+this.categoryQuestionsCount);
    console.log("total-cat"+this.categoryQuestionsName);
    // console.log("total-cat"+this.categoryQuestionsType);
   }

  ngOnInit() {
    
    this.allQuestions=this.apollo.watchQuery<any> ({
      query: gql `
      query
      {
        
      getQuestions(first:50,questionCategory_Value:"${this.categoryQuestionsName}"){
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
    (  result =>{ 
      console.log(result.data.getQuestions.edges);
      this.temp = result.data.getQuestions.edges.map((element)=>element.node);
// console.log("all.difficultyLevel.value"+result.data.getQuestions.difficultyLevel.value);
    
      return result.data.getQuestions.edges;
    }) 
    
    
    // if(this.categoryQuestionsType==="E")
    // {
       

    //    this.edit_save = "assets/ic_difficulty_easy.svg"; 
    // }
    // else 
    // if(this.categoryQuestionsType==="M")
    // {
      

    //    this.edit_save = "assets/ic_difficulty_medium.svg"; 
    // }
    // else 
    // if(this.categoryQuestionsType==="H")
    // {
       

    //    this.edit_save = "assets/ic_difficulty_hard.svg"; 
    // }
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
      difficultyLevel
      {
        value
      }
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
easy_p()
{
  this.easy_pic=true;

}
medium_p()
{
  this.medium_pic=true;
}
hard_p()
{
  this.hard_pic=true;
}
}
