import { Component, OnInit , Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'ngbd-modal-content',
  templateUrl: './content.html',
  styleUrls: ['./content_set.css']
})
export class NgbdModalContent {
  @Input() name;

  constructor(public activeModal: NgbActiveModal) {}
}
@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  @Input() name;
  constructor(public activeModal: NgbActiveModal,private modalService: NgbModal) { }
 
  ngOnInit() {
  }
  open() {
    const modalRef = this.modalService.open(NgbdModalContent,{ size: 'lg' });
    modalRef.componentInstance.name = 'World';
  }
}

