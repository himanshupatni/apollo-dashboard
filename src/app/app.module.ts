import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {InMemoryCache} from 'apollo-cache-inmemory';
import { HttpClientModule} from '@angular/common/http';
import { ApolloModule, Apollo} from 'apollo-angular';
import {HttpLinkModule, HttpLink} from'apollo-angular-link-http';
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [
    AppComponent,
    ListComponent
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ApolloModule,
    HttpLinkModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor (apollo: Apollo, httpLink: HttpLink)
  {
    
    apollo.create({
      link: httpLink.create({uri:'http://52.66.137.165:8000/graphql/'}),
      cache: new InMemoryCache(),
          });
  }
 }
