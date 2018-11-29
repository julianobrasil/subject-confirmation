import {Component, ViewEncapsulation} from '@angular/core';

import {
  SubjectConfirmationComponentService,
} from './subject-confirmation-component.service';

import {
  SubjectCellComponentEvent,
} from './subject-cell/subject-cell.component';


import * as dataTest from './data-test';
import * as dataTest2 from './data-test2';

import {Timeline, TimelineItem, ObjectReference} from './definitions';

@Component({
  selector: 'app-subject-confirmation',
  templateUrl: 'subject-confirmation.component.html',
  styleUrls: ['subject-confirmation.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SubjectConfirmationComponent {

  _targetLecturePeriod = dataTest.lecturePeriodRef;

  _timelines: Timeline[] = [];

  _timeline: Timeline = dataTest._timeline;

  _timelineItemTest: TimelineItem = dataTest.items_2017_2[2];

  _lecturePeriodRefTest: ObjectReference = dataTest.items_2017_2[6].performed.lecturePeriodRef;

  actionTaken: SubjectCellComponentEvent;

  constructor(private _componentService: SubjectConfirmationComponentService) {
    const tls: Timeline[] = [dataTest._timeline, dataTest2._timeline];

    this._timelines = this._componentService.sortTimelines(tls);
  }

  _actionHandler(evt: SubjectCellComponentEvent) {
    this.actionTaken = evt;
  }
}
