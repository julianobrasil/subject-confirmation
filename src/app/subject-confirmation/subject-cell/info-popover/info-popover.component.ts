import {Component, Input, ViewEncapsulation} from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/animations';

import {TimelineItem, SagaCourseType, getCourseTypeName} from '../../../definitions';

@Component({
  selector: 'app-info-popover',
  templateUrl: './info-popover.component.html',
  styleUrls: ['./info-popover.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('magnify', [
      state('true', style({transform: 'scale(2)'})),
      state('false', style({transform: 'scale(1)'})),
      transition('false <=> true', animate(150)),
    ]),
  ],
})
export class InfoPopoverComponent {
  /** item da timeline */
  private _timelineItem: TimelineItem;
  @Input()
  get timelineItem(): TimelineItem {
    return this._timelineItem;
  }
  set timelineItem(t: TimelineItem) {
    this._timelineItem = t;
  }

  /** tipo de curso (conforme definição interna deste projeto SAGA) */
  _friendlySagaCourseType: string;
  private _sagaCourseType: SagaCourseType;
  @Input()
  get sagaCourseType(): SagaCourseType {
    return this._sagaCourseType;
  }
  set sagaCourseType(sagaCourseType: SagaCourseType) {
    this._sagaCourseType = sagaCourseType;

    if (!sagaCourseType) {
      return;
    }

    this._friendlySagaCourseType = getCourseTypeName(sagaCourseType);
  }

  _isHover = false;
}
