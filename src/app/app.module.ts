import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {InMemoryCache} from 'apollo-cache-inmemory';
import { HttpClientModule} from '@angular/common/http';
import { ApolloModule, Apollo} from 'apollo-angular';
import {HttpLinkModule, HttpLink} from'apollo-angular-link-http';
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { HomePageComponent } from './home-page/home-page.component';
import { QuestionsComponent } from './questions/questions.component';
import { QuestionCategoryComponent } from './question-category/question-category.component';
import { WritersComponent } from './writers/writers.component';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { AddQuestionComponent,NgbdModalContent } from './add-question/add-question.component';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
// import { HttpHeaders } from '@angular/common/http';
// import { ApolloClient } from 'apollo-client';
// import { setContext} from 'apollo-link-context';
// import { httpHeaders } from 'apollo-angular-link-headers';
import {ApolloLink} from 'apollo-link';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuestionTypeTableComponent } from './question-type-table/question-type-table.component';
import { TotalCategoryQuestionsComponent } from './total-category-questions/total-category-questions.component';
import { DifficultyWiseCategoryQuestionsComponent } from './difficulty-wise-category-questions/difficulty-wise-category-questions.component'; //concat
const routes: Routes = [
  { path:'' ,component: DashboardComponent},
  { path: 'app-list', component: ListComponent },
  {path:'app-question-type-table', component: QuestionTypeTableComponent},
  {path: 'app-total-category-questions', component: TotalCategoryQuestionsComponent},
  {path: 'app-difficulty-wise-category-questions', component: DifficultyWiseCategoryQuestionsComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    HomePageComponent,
    QuestionsComponent,
    QuestionCategoryComponent,
    WritersComponent,
    AddQuestionComponent,
    NgbdModalContent,
    DashboardComponent,
    QuestionTypeTableComponent,
    TotalCategoryQuestionsComponent,
    DifficultyWiseCategoryQuestionsComponent
    
  ],
  imports: [
    BsDatepickerModule.forRoot(),
    BrowserModule,
    RouterModule.forRoot(routes),
     NgbModule,
    HttpClientModule,
    FormsModule,
    ApolloModule,
    HttpLinkModule
  ],
  exports:[RouterModule],
  providers: [NgbActiveModal],
  entryComponents: [NgbdModalContent],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor (apollo: Apollo, httpLink: HttpLink){
    const http = httpLink.create({uri: 'http://52.66.137.165:8000/graphql/'});
    
    const auth = new ApolloLink((operation, forward) => {
      // add the authorization to the headers
      operation.setContext({
        headers: {
          authorization:'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImFkaXR5YSIsImV4cCI6MTU1MDA0ODU0OCwib3JpZ0lhdCI6MTU1MDA0ODI0OH0.nsU0cIkTctm03oAvnOGMz6irSkSAYASetNjYe5-LQJw' || null,
        }
      });
    
      return forward(operation);
    })
        
    apollo.create({
          link: auth.concat(http),
          cache: new InMemoryCache(),
          });
  }
}
