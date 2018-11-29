import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';

import {SubjectConfirmationComponent} from './subject-confirmation.component';
import {NewStepTemplateDialogComponent} from './new-step-template-dialog/new-step-template-dialog.component';

import {MaterialModule} from '../custom-material/material.module';
import {SubjectCellComponent} from './subject-cell/subject-cell.component';
import {InfoPopoverComponent} from './subject-cell/info-popover/info-popover.component';

import {SafeHtmlPipe} from '../pipes/safe-html.pipe';
import {MergedClassFriendlyTextPipe} from './subject-cell/info-popover/pipes/merged-class-friendly-text.pipe';
import {ModuleHeaderPipe} from './timeline/pipes/module-header.pipe';
import {TimelineHeaderPipe} from './timeline/pipes/timeline-header.pipe';
import {SubjectConfirmationTimelineComponent} from './timeline/subject-confirmation-timeline.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  declarations: [
    InfoPopoverComponent,
    NewStepTemplateDialogComponent,
    SubjectCellComponent,
    SubjectConfirmationComponent,
    SubjectConfirmationTimelineComponent,

    MergedClassFriendlyTextPipe,
    ModuleHeaderPipe,
    SafeHtmlPipe,
    TimelineHeaderPipe,
  ],
  exports: [SubjectConfirmationComponent],
  entryComponents: [NewStepTemplateDialogComponent],
})
export class SubjectConfirmationModule {}
