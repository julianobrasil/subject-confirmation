import { Component, ViewEncapsulation, Output, EventEmitter, Input } from '@angular/core';

import {
  SubjectConfirmationComponentService,
} from './subject-confirmation-component.service';

import {
  SubjectCellComponentEvent,
} from './subject-cell/subject-cell.component';




import { Timeline, TimelineItem, ObjectReference } from '../definitions';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-subject-confirmation',
  templateUrl: 'subject-confirmation.component.html',
  styleUrls: ['subject-confirmation.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SubjectConfirmationComponent {
  /** timelines que o componente irá desenhar na tela */
  _timelinesLoaded$: Subject<void> = new Subject<void>();
  private _timelines: Timeline[] = [];
  @Input()
  get timelines(): Timeline[] { return this._timelines; }
  set timelines(timelines: Timeline[]) {
    this._timelines = this._componentService.sortTimelines(timelines);
    this._timelinesLoaded$.next();
  }

  /** período letivo que está sendo ratificado */
  private _targetLecturePeriodRefLoaded$: Subject<void> = new Subject<void>();
  private _targetLecturePeriodRef: ObjectReference;
  @Input()
  get targetLecturePeriodRef(): ObjectReference { return this._targetLecturePeriodRef; }
  set targetLecturePeriodRef(lp: ObjectReference) {
    this._targetLecturePeriodRef = lp;
    this._targetLecturePeriodRefLoaded$.next();
  }

  /** emite quando o usuário escolhe uma opção do menu de contexto */
  @Output()
  action: EventEmitter<SubjectCellComponentEvent> = new EventEmitter<SubjectCellComponentEvent>();

  /** grava a última ação executada */
  actionTaken: SubjectCellComponentEvent;

  constructor(private _componentService: SubjectConfirmationComponentService) { }

  /**
   * Grava a última ação executada e a reemite
   *
   * @param evt
   */
  _actionHandler(evt: SubjectCellComponentEvent) {
    this.actionTaken = evt;

    this.action.emit(evt);
  }
}
