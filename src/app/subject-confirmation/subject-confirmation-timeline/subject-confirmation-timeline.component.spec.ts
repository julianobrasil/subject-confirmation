import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectConfirmationTimelineComponent } from './subject-confirmation-timeline.component';

describe('SubjectConfirmationTimelineComponent', () => {
  let component: SubjectConfirmationTimelineComponent;
  let fixture: ComponentFixture<SubjectConfirmationTimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectConfirmationTimelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectConfirmationTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
