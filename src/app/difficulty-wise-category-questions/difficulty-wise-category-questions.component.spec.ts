import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DifficultyWiseCategoryQuestionsComponent } from './difficulty-wise-category-questions.component';

describe('DifficultyWiseCategoryQuestionsComponent', () => {
  let component: DifficultyWiseCategoryQuestionsComponent;
  let fixture: ComponentFixture<DifficultyWiseCategoryQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DifficultyWiseCategoryQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DifficultyWiseCategoryQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
