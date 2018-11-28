import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';

import {SubjectConfirmationComponent} from './subject-confirmation.component';
import {NewStepTemplateDialogComponent} from './new-step-template-dialog/new-step-template-dialog.component';

import {MaterialModule} from '../custom-material/material.module';
import {SubjectConfirmationTimelineComponent} from './subject-confirmation-timeline/subject-confirmation-timeline.component';
import {SubjectCellComponent} from './subject-cell/subject-cell.component';
import {InfoPopoverComponent} from './subject-cell/info-popover/info-popover.component';

import {SafeHtmlPipe} from '../pipes/safe-html.pipe';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  declarations: [
    NewStepTemplateDialogComponent,
    SubjectCellComponent,
    SubjectConfirmationComponent,
    SubjectConfirmationTimelineComponent,
    InfoPopoverComponent,
    SafeHtmlPipe,
  ],
  exports: [SubjectConfirmationComponent],
  entryComponents: [NewStepTemplateDialogComponent],
})
export class SubjectConfirmationModule {}
