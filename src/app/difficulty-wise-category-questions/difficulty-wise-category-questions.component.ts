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
  edit_save;
  i;
  currentEditingRow;
  constructor(private route: ActivatedRoute,private apollo: Apollo) {
    this.categoryQuestionsType = route.snapshot.params['type'];
    this.categoryQuestionsName = route.snapshot.params['name'];
    
    console.log("total"+this.categoryQuestionsType);
    console.log("total"+this.categoryQuestionsName);
    
   }
   edit(i)
{
   this.currentEditingRow=i;
  console.log(this.currentEditingRow);

} 
save(i)
  {
    this.currentEditingRow=-1;
  
   
  var question=document.getElementById('questionText'+i).innerHTML;
 var a=document.getElementById('optionA'+i).innerHTML;
 var b=document.getElementById('optionB'+i).innerHTML;
 var c=document.getElementById('optionC'+i).innerHTML;
 var d=document.getElementById('optionD'+i).innerHTML;
 var ans=document.getElementById('correctAnswer'+i).innerHTML;
 var cat=document.getElementById('questionCategory'+i).innerHTML;
 var  quess= {questionText:question,optionA:a,optionB:b,optionC:c,optionD:d,correctAnswer:ans,questionCategory:{value:cat}};
//  console.log(question);
console.log(quess);
    

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
    
    if(this.categoryQuestionsType==="E")
    {
       

       this.edit_save = "assets/ic_difficulty_easy.svg"; 
    }
    else 
    if(this.categoryQuestionsType==="M")
    {
      

       this.edit_save = "assets/ic_difficulty_medium.svg"; 
    }
    else 
    if(this.categoryQuestionsType==="H")
    {
       

       this.edit_save = "assets/ic_difficulty_hard.svg"; 
    }
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
}
