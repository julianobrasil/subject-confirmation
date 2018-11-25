import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';


import { SubjectConfirmationComponent } from './subject-confirmation.component';
import { StepTemplateMenuComponent } from './step-template-menu/step-template-menu.component';
import { NewStepTemplateDialogComponent } from './new-step-template-dialog/new-step-template-dialog.component';

import {MaterialModule} from '../custom-material/material.module';
import { SubjectConfirmationTimelineComponent } from './subject-confirmation-timeline/subject-confirmation-timeline.component';

@NgModule({
  imports: [CommonModule,ReactiveFormsModule,MaterialModule,],
  declarations: [SubjectConfirmationComponent, NewStepTemplateDialogComponent, StepTemplateMenuComponent, SubjectConfirmationTimelineComponent],
  exports:[SubjectConfirmationComponent],
  entryComponents: [NewStepTemplateDialogComponent],
})
export class SubjectConfirmationModule {}