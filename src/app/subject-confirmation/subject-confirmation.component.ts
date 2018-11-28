import {Component, ViewEncapsulation} from '@angular/core';

import {SyllabusItem, TimelineItem, ObjectReference, MergePlanning} from './subject-confirmation.service';

import {
  SubjectCellComponentEvent,
  SubjectCellComponentActions,
} from './subject-cell/subject-cell.component';

import * as moment from 'moment';

import * as dataTest from './data-test';

@Component({
  selector: 'app-subject-confirmation',
  templateUrl: 'subject-confirmation.component.html',
  styleUrls: ['subject-confirmation.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SubjectConfirmationComponent {
  // _lecturePeriodRefTest: ObjectReference = {
  //   code: '12323243243',
  //   description: '2018-1',
  // };


  _timelineItemTest: TimelineItem = dataTest.items_2017_2[6];

  _lecturePeriodRefTest: ObjectReference = dataTest.items_2017_2[0].performed.lecturePeriodRef;

  actionTaken: SubjectCellComponentEvent;

  _actionHandler(evt: SubjectCellComponentEvent) {
    this.actionTaken = evt;
  }
}
