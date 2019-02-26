import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalCategoryQuestionsComponent } from './total-category-questions.component';

describe('TotalCategoryQuestionsComponent', () => {
  let component: TotalCategoryQuestionsComponent;
  let fixture: ComponentFixture<TotalCategoryQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalCategoryQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalCategoryQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
