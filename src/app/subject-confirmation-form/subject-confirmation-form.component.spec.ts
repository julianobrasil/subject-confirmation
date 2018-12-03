import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectConfirmationFormComponent } from './subject-confirmation-form.component';

describe('SubjectConfirmationFormComponent', () => {
  let component: SubjectConfirmationFormComponent;
  let fixture: ComponentFixture<SubjectConfirmationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectConfirmationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectConfirmationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
