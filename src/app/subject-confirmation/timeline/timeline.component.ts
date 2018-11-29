import { Component, OnInit, Input } from '@angular/core';
import { Timeline, TimelineItem, ObjectReference } from '../subject-confirmation.service';
import { TimelineComponentService } from './timeline-component.service';
import { SubjectCellComponentEvent } from '../subject-cell/subject-cell.component';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  /** timeline que será apresentada */
  private _timeline: Timeline;
  @Input()
  get timeline(): Timeline {
    return this._timeline;
  }
  set timeline(timeline: Timeline) {
    this._timeline = timeline;

    this._timeLineItems = this._timelineComponentService.groupAndSortTimelineItems(timeline.items);
  }

  /** período letivo que está sendo ratificado */
  @Input()
  targetLecturePeriodRef: ObjectReference;

  /** itens de timeline. Cada linha representa as disciplinas de um módulo */
  _timeLineItems: TimelineItem[][] = [];

  actionTaken: SubjectCellComponentEvent;

  constructor(private _timelineComponentService: TimelineComponentService) { }

  ngOnInit() {
  }

  /**
   * organiza o timeline agrupando todos os itens na forma das linhas de uma matriz
   *
   * @returns {*}
   * @memberof TimelineComponent
   */
  _organizeLoadedTimeline(): void {
    throw new Error("Method not implemented.");
  }

  _actionHandler(evt: SubjectCellComponentEvent) {
    this.actionTaken = evt;
  }

}
