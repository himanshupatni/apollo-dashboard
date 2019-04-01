import { Component, OnInit } from '@angular/core';
import {GraphQLService} from '../graph-ql.service'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private graphService: GraphQLService) { }

  ngOnInit() {
  }

}
