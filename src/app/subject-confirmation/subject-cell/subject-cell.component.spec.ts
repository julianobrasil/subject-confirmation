import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectCellComponent } from './subject-cell.component';

describe('SubjectCellComponent', () => {
  let component: SubjectCellComponent;
  let fixture: ComponentFixture<SubjectCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
