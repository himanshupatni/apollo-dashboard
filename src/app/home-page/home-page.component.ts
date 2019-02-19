import { Component, OnInit, Output,EventEmitter } from '@angular/core';

import{ AddQuestionComponent, NgbdModalContent} from '../add-question/add-question.component';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
   @Output() myEvent = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  open()
  {
    this.myEvent.emit(null);
  }
}