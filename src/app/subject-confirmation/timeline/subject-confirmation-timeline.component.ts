import {Component, OnInit, Input} from '@angular/core';
import {SubjectConfirmationTimelineComponentService} from './subject-confirmation-timeline-component.service';
import {SubjectCellComponentEvent} from '../subject-cell/subject-cell.component';
import {Timeline, ObjectReference, TimelineItem} from '../definitions';

@Component({
  selector: 'app-subject-confirmation-timeline',
  templateUrl: './subject-confirmation-timeline.component.html',
  styleUrls: ['./subject-confirmation-timeline.component.scss'],
})
export class SubjectConfirmationTimelineComponent {
  /** timeline que será apresentada */
  private _timeline: Timeline;
  @Input()
  get timeline(): Timeline {
    return this._timeline;
  }
  set timeline(timeline: Timeline) {
    this._timeline = timeline;

    this._timelineItems = this._timelineComponentService.groupAndSortTimelineItems(timeline.items);
  }

  /** período letivo que está sendo ratificado */
  @Input()
  targetLecturePeriodRef: ObjectReference;

  /** itens de timeline. Cada linha representa as disciplinas de um módulo */
  _timelineItems: TimelineItem[][] = [];

  actionTaken: SubjectCellComponentEvent;

  constructor(private _timelineComponentService: SubjectConfirmationTimelineComponentService) {}

  _actionHandler(evt: SubjectCellComponentEvent) {
    this.actionTaken = evt;
  }
}
