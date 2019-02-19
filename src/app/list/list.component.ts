import { Component, OnInit,OnChanges ,SimpleChanges} from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
@Component({
  
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  allQuestions:any //Observable<any>;
  i;
  currentEditingRow;
  temp =[];
  ques= {questionText:'',optionA:'',optionB:'',optionC:'',optionD:'',correctAnswer:'',questionCategory:{value:''}};
  constructor(private apollo: Apollo) { }
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
  edit(i)
{
   this.currentEditingRow=i;
  console.log(this.currentEditingRow);

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

}
