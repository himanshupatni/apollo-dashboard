import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { GraphQLService } from '../graph-ql.service';
import { NgxSpinnerService } from 'ngx-spinner';
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
  last;
  easy_pic = false;
  medium_pic = false;
  hard_pic = false;
  // categoryQuestionsType;
  temp = [];
  constructor(private route: ActivatedRoute, private apollo: Apollo, private graphService:GraphQLService,
    private spinner: NgxSpinnerService) {
    this.categoryQuestionsCount = route.snapshot.params['count'];
    this.categoryQuestionsName = route.snapshot.params['name'];
    // this.categoryQuestionsType = route.snapshot.params['type'];
    console.log("total-cat" + this.categoryQuestionsCount);
    console.log("total-cat" + this.categoryQuestionsName);
    // console.log("total-cat"+this.categoryQuestionsType);
  }

  ngOnInit() {

   this.graphQL();

  
  }
  graphQL()
  {
this.spinner.show();
    const userAcquisition=gql`  query
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
        cursor
      }
    }
    }`;
    
    this.graphService.graphQuery(userAcquisition)
    .then ((result:any)=>{
this.spinner.hide();
      
      this.temp = result.data.getQuestions.edges.map((element) => element.node);
        // console.log("all.difficultyLevel.value"+result.data.getQuestions.difficultyLevel.value);
 
        this.last=result.data.getQuestions.edges.map((element)=>element.cursor);
       
        return result.data.getQuestions.edges;
    })
    .catch((err)=>{
      console.log("ERROR", err);
       this.spinner.hide()
    })


  }
  Search(keyword: string) {
    if (keyword == '') {
      this.graphQL();
    }
    else {
this.spinner.show();
      
      const userAcquisition=gql`  query {
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
        }`;
      
      this.graphService.graphQuery(userAcquisition)
      .then ((result:any)=>{
        this.spinner.hide();
        
        console.log(result.data.getQuestions.edges);
        this.temp = result.data.getQuestions.edges.map((element) => element.node);
        return result.data.getQuestions.edges;
      })
      .catch((err)=>{
        console.log("ERROR", err);
        // this.spinner.hide()
      })
  
     
    }
  }
  easy_p() {
    this.easy_pic = true;

  }
  medium_p() {
    this.medium_pic = true;
  }
  hard_p() {
    this.hard_pic = true;
  }
  next()
  {
this.spinner.show();

    const userAcquisition=gql`  query {
      getQuestions(first:50,sportsType_GameType:"gk", after:"${this.last}"){
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
          cursor
        }
        }
      }`;
    
    this.graphService.graphQuery(userAcquisition)
    .then ((result:any)=>{
      this.spinner.hide();
      
      console.log(result.data.getQuestions.edges);
        this.temp = result.data.getQuestions.edges.map((element) => element.node);
        
        this.last=result.data.getQuestions.edges.map((element)=>element.cursor);
       
        console.log(this.last[this.last.length -1]);
        // this.page=1;
        return result.data.getQuestions.edges;
    })
    .catch((err)=>{
      console.log("ERROR", err);
      // this.spinner.hide()
    })


    

  }
  
}
