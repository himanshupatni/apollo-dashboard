import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GraphQLService} from '../graph-ql.service';
import gql from 'graphql-tag';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({

  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  allQuestions: any //Observable<any>;
  i;
  last;
  feed: any[];
  type: string;
  itemsPerPage: number = 10;
  currentEditingRow;
  temp = [];
  ques = { questionText: '', optionA: '', optionB: '', optionC: '', optionD: '', correctAnswer: '', questionCategory: { value: '' } };
  constructor(private apollo: Apollo, private graphService: GraphQLService,private spinner: NgxSpinnerService) { }
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
    console.log(quess);


  }
  edit(i) {
    this.currentEditingRow = i;
    console.log(this.currentEditingRow);

  }
  Search(keyword: string) {
    if (keyword == '') {
      this.ngOnInit();
    }
    else {
      this.spinner.show();
      const userAcquisition=gql`  query {
        getQuestions(first:100,questionText_Icontains:"${keyword}"){
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
        // this.spinner.hide()
      })
      
    }
  }

  ngOnInit() {

this.graphQL();
   
  }
   
  graphQL()
  {
    this.spinner.show();

    const userAcquisition=gql`  query {
      getQuestions(first:50,sportsType_GameType:"gk"){
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
          cursor
        }
        }
      }`;
    
    this.graphService.graphQuery(userAcquisition)
    .then ((result:any)=>{
      this.spinner.hide();
      
      this.temp = result.data.getQuestions.edges.map((element) => element.node);
         
      this.last=result.data.getQuestions.edges.map((element)=>element.cursor);
     
      return result.data.getQuestions.edges;
    })
    .catch((err)=>{
      console.log("ERROR", err);
      // this.spinner.hide()
    })


    // asdasd

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
