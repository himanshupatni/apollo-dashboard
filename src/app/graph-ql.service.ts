import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { HttpLink } from 'apollo-angular-link-http';
import { ApolloLink } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
@Injectable({
  providedIn: 'root'
})
export class GraphQLService {
  tokenData: String;
  shouldLogin : boolean = false;
  constructor(private apollo : Apollo, httplink : HttpLink) {
  //   this.tokenData = localStorage.getItem("token");
  
  //   const http = httplink.create({uri : 'http://192.168.0.26:8000/graphql/'});

  //   const auth = new ApolloLink((operation, forward) => {
  //     if(this.tokenData == null){ 
  //       operation.setContext({
  //         headers: {
  //           authorization: 'JWT '
  //         }
  //       })
  //       return forward(operation);
  //     } else {
  //       operation.setContext({
  //         headers: {
  //           authorization: 'JWT ' + this.tokenData
  //         }
  //       })
  //       return forward(operation);
  //     }
  //   })
    
  //   apollo.create(
  //     {
  //       link : auth.concat(http)
  //       , cache : new InMemoryCache()
  //     }
  //   )



  //   if(this.tokenData == null){
  //     this.shouldLogin = false;
  //   } else{
  //     this.verifyToken()
  //     .then(()=>{
  //      this.shouldLogin = true;
  //    })
  //    .catch((err)=>{
  //      console.log("ERROR", err);
  //      this.refreshToken()
  //      .then(()=>{
  //       this.shouldLogin = true;
  //      })
  //      .catch(()=>{
  //        console.log("ERROR");
  //        this.shouldLogin = false;
  //      });
  //    });
  //   }
  }
   graphQuery(userAcquisitionQuery : any){
    return new Promise((fulfill, reject)=>{
      this.apollo.watchQuery<any>(
        {                                                                                                      
          query : userAcquisitionQuery
        }
      ).valueChanges.subscribe(
        result => {
          fulfill(result)
        },
        (({ graphQLErrors, networkError }) => {
          if (graphQLErrors)
            graphQLErrors.map(({ message, locations, path }) =>{
              console.log("GraphQL error Message Location, Path",  message, locations, path)
              if(message == "Signature has expired"){
                this.shouldLogin = false;
              }
              reject(graphQLErrors)
            })
        
          if (networkError) {console.log("Network error", networkError);
          reject(networkError)
        }
        })
      )
    })
  }

  dashboardLogin(username : any, password : any){
  //  console.log(name, password, name);
    return new Promise((fulfill, reject)=>{
      this.apollo.mutate(
        {                                                                                                      
          mutation : gql`
          mutation{
            tokenAuth(username: "${username}", password:"${password}"){
              token
            }
          }`
        }
      ).subscribe(({ data }) => {
        localStorage.setItem("token", data.tokenAuth.token);
        this.tokenData = data.tokenAuth.token;
        console.log('got data', data.tokenAuth.token);
        fulfill()
      },(error) => {
        console.log('there was an error sending the query', error);
        reject(error);
      });
    })
  }

  verifyToken(){
    return new Promise((fulfill, reject)=>{
      this.apollo.mutate(
        {                                                                                                      
          mutation : gql`
          mutation{
            verifyToken(token: "${this.tokenData}"){
              payload
            }
          }`
        }
      ).subscribe(({ data }) => {
        console.log('got data',  data.verifyToken.payload);
        fulfill()
      },(error) => {
        console.log('there was an error sending the query', error);
        reject(error);
      });
    })
  }

  refreshToken(){
    return new Promise((fulfill, reject)=>{
      this.apollo.mutate(
        {                                                                                                      
          mutation : gql`
          mutation{
            refreshToken(token : "${this.tokenData}"){
              token
              payload
            }
          }`
        }
      ).subscribe(({ data }) => {
        localStorage.setItem("token", data.verifyToken.token);
        console.log('got data',  data.verifyToken.token);
        fulfill()
      },(error) => {
        console.log('there was an error sending the query', error);
        reject(error);
      });
    })
  }
}
