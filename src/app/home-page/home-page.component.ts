import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddQuestionComponent, NgbdModalContent } from '../add-question/add-question.component';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  @ViewChild(AddQuestionComponent) add: AddQuestionComponent;
  // @Output() myEvent = new EventEmitter();
  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal) { }

  ngOnInit() {
  }
  open() {
    const modalRef = this.modalService.open(NgbdModalContent, { size: 'lg' });
    modalRef.componentInstance.name = 'World';
  }
}