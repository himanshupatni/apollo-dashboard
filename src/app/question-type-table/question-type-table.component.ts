import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { ActivatedRoute } from '@angular/router';
import { GraphQLService } from '../graph-ql.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-question-type-table',
  templateUrl: './question-type-table.component.html',
  styleUrls: ['./question-type-table.component.css']
})
export class QuestionTypeTableComponent implements OnInit {
  temp = [];
  productID;
  pages = 25;
  last = "";
  // collectionSize=50;
  currentEditingRow;
  allQuestions;
  totalCount;
  totalPagination;
  // page=1;
  constructor(private apollo: Apollo, private route: ActivatedRoute, private graphService: GraphQLService,
    private spinner: NgxSpinnerService) {
    this.productID = route.snapshot.params['type'];
    this.totalCount = route.snapshot.params['category'];
    this.totalPagination = this.totalCount / 50;
    console.log(this.productID);
    console.log("total" + this.totalCount);
    console.log("total pagination" + this.totalPagination);


  }


  ngOnInit() {

    this.graphQL();

  }
  graphQL() {
    this.spinner.show();

    const userAcquisition=gql`query {
      getQuestions(first:50,sportsType_GameType:"gk", difficultyLevel_Value:"${this.productID}"){
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

        this.last = result.data.getQuestions.edges.map((element) => element.cursor);

        console.log(this.last[this.last.length - 1]);
        // this.page=1;
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

      const userAcquisition=gql`     query {
        getQuestions(questionText_Icontains:"${keyword}"){
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
         this.spinner.hide()
      })
     
    
    }
  }

  save(i) {
    this.currentEditingRow = -1;


    var question = document.getElementById('questionText' + i).innerHTML;
    var a = document.getElementById('optionA' + i).innerHTML;
    var b = document.getElementById('optionB' + i).innerHTML;
    var c = document.getElementById('optionC' + i).innerHTML;
    var d = document.getElementById('optionD' + i).innerHTML;
    var ans = document.getElementById('correctAnswer' + i).innerHTML;
    var cat = document.getElementById('questionCategory' + i).innerHTML;
    var quess = { questionText: question, optionA: a, optionB: b, optionC: c, optionD: d, correctAnswer: ans, questionCategory: { value: cat } };
    //  console.log(question);
    //console.log(quess);


  }
  edit(i) {
    this.currentEditingRow = i;
    console.log(this.currentEditingRow);

  }
  next() {
    this.spinner.show();
    const userAcquisition=gql`     query {
      getQuestions(first:50,sportsType_GameType:"gk", difficultyLevel_Value:"${this.productID}",after:"${this.last}"){
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
      this.spinner.hide()
      console.log(result.data.getQuestions.edges);
      this.temp = result.data.getQuestions.edges.map((element) => element.node);

      this.last = result.data.getQuestions.edges.map((element) => element.cursor);

      console.log(this.last[this.last.length - 1]);
      // this.page=1;
      return result.data.getQuestions.edges;

    })
    .catch((err)=>{
      console.log("ERROR", err);
       this.spinner.hide()
    })
    

  }

}
