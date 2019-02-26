import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionTypeTableComponent } from './question-type-table.component';

describe('QuestionTypeTableComponent', () => {
  let component: QuestionTypeTableComponent;
  let fixture: ComponentFixture<QuestionTypeTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionTypeTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionTypeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
