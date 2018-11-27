import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Output,
  EventEmitter,
} from '@angular/core';

import {SatPopoverAnchor} from '@ncstate/sat-popover';

import {TimelineItem, ObjectReference, MergePlanning} from '../subject-confirmation.service';

export enum SubjectCellComponentActions {
  /** ratifica disciplina sem junção */
  CONFIRMATION_NO_MERGE = 'CONFIRMATION_NO_MERGE',

  /** cancela ratificação desta disciplina */
  CANCEL_CONFIRMATION = 'CANCEL_CONFIRMATION',

  /** ratifica disicplina com junção somente dentro do curso */
  CONFIRMATION_MERGED_INSIDE_COURSE = 'CONFIRMATION_MERGED_INSIDE_COURSE',

  /** ratifica disciplina com junção incluindo outros cursos */
  CONFIRMATION_MERGE_OTHER_COURSES = 'CONFIRMATION_MERGE_OTHER_COURSES',
}

export interface SubjectCellComponentEvent {
  actionType: SubjectCellComponentActions;
  timelineItem: TimelineItem;
}

@Component({
  selector: 'app-subject-cell',
  templateUrl: './subject-cell.component.html',
  styleUrls: ['./subject-cell.component.scss'],
})
export class SubjectCellComponent implements AfterViewInit {
  /** item da matriz: provavelmente teremos outro input aqui, relativo à timeline */
  private _timelineItem: TimelineItem;
  @Input()
  get timelineItem(): TimelineItem {
    return this._timelineItem;
  }
  set timelineItem(t: TimelineItem) {
    this._timelineItem = t;

    this._setMerginStatus();
  }

  /** período letivo que está sendo alvo da ratificação */
  @Input()
  targetLecturePeriodRef: ObjectReference;

  /** emite quando o usuário escolha uma opção do menu de contexto */
  @Output()
  action: EventEmitter<SubjectCellComponentEvent> = new EventEmitter<SubjectCellComponentEvent>();

  /** div principal, que envolve toda a célula */
  @ViewChild('wrapperDiv') _wrapperDiv: ElementRef;

  /** largura da div principal, que envolve toda a célula em pixels */
  _wrapperDivWidth: any;

  /** ações possíveis no menu de contexto */
  _ACTIONS = SubjectCellComponentActions;

  /** classe que envolve toda a div de celula */
  _wrapperClass: {[key: string]: boolean} = {
    'saga-syllabus-item-container': true,
  };

  _status: SubjectCellComponentActions;

  ngAfterViewInit(): void {
    const div = this._wrapperDiv.nativeElement as HTMLDivElement;

    const boundingRect: ClientRect | DOMRect = div.getBoundingClientRect();

    setTimeout(() => (this._wrapperDivWidth = {width: `${boundingRect.width}px`}));
  }

  _openContextMenu(evt: MouseEvent, popoverAnchor: SatPopoverAnchor) {
    evt.preventDefault();

    if (
      this.timelineItem &&
      this.timelineItem.performedData &&
      !!this.timelineItem.performedData.lecturePeriodRef &&
      !!this.targetLecturePeriodRef &&
      this.timelineItem.performedData.lecturePeriodRef.code !== this.targetLecturePeriodRef.code
    ) {
      return;
    }

    popoverAnchor.openPopover();
  }

  _confirmSubject(popoverAnchor: SatPopoverAnchor, action: SubjectCellComponentActions): void {
    popoverAnchor.closePopover();

    this._changeSubjectStatus(action);
  }

  _changeSubjectStatus(action: SubjectCellComponentActions): void {
    const timelineItem: TimelineItem = {...this.timelineItem};

    timelineItem.performedData = timelineItem.performedData
      ? {...timelineItem.performedData, mergingPlanned: MergePlanning.MERGED_INSIDE_COURSE}
      : {
          electiveSubject: null,
          equivalentSubject: null,
          lecturePeriodRef: this.targetLecturePeriodRef,
          mergedTimeLineItems: [],
          mergingPlanned: null,
          sequence: null, // TODO(@julianobrasil): é preciso inferir o período/módulo do curso aqui
        };

    switch (action) {
      case SubjectCellComponentActions.CANCEL_CONFIRMATION: {
        timelineItem.performedData = null;
        this._cancelConfirmation(timelineItem);
        break;
      }

      case SubjectCellComponentActions.CONFIRMATION_MERGED_INSIDE_COURSE: {
        timelineItem.performedData.mergingPlanned = MergePlanning.MERGED_INSIDE_COURSE;
        this._confirmMergingInsideCourse(timelineItem);
        break;
      }

      case SubjectCellComponentActions.CONFIRMATION_MERGE_OTHER_COURSES: {
        timelineItem.performedData.mergingPlanned = MergePlanning.MERGE_OTHER_COURSES;
        this._confirmMergeOtherCourses(timelineItem);
        break;
      }

      case SubjectCellComponentActions.CONFIRMATION_NO_MERGE: {
        timelineItem.performedData.mergingPlanned = MergePlanning.NO_MERGE;
        this._confirmNoMerging(timelineItem);
        break;
      }
    }
  }

  /**
   * Ratifica sem nenhuma junção
   */
  _confirmNoMerging(timelineItem: TimelineItem): void {
    this._wrapperClass = {
      ...this._wrapperClass,
      'saga-syllabus-item-container-confirm-no-merge': true,
      'saga-syllabus-item-container-confirm-merge-inner': false,
      'saga-syllabus-item-container-confirm-merge-outer': false,
    };

    this.action.emit({
      actionType: SubjectCellComponentActions.CONFIRMATION_NO_MERGE,
      timelineItem,
    });

    this._status = SubjectCellComponentActions.CONFIRMATION_NO_MERGE;
  }

  /**
   * Ratifica com junção entre cursos
   */
  _confirmMergeOtherCourses(timelineItem: TimelineItem): void {
    this._wrapperClass = {
      ...this._wrapperClass,
      'saga-syllabus-item-container-confirm-no-merge': false,
      'saga-syllabus-item-container-confirm-merge-inner': false,
      'saga-syllabus-item-container-confirm-merge-outer': true,
    };

    this.action.emit({
      actionType: SubjectCellComponentActions.CONFIRMATION_MERGE_OTHER_COURSES,
      timelineItem,
    });

    this._status = SubjectCellComponentActions.CONFIRMATION_MERGE_OTHER_COURSES;
  }

  /**
   * Ratifica com junção entre períodos do mesmo curso
   */
  _confirmMergingInsideCourse(timelineItem: TimelineItem): void {
    this._wrapperClass = {
      ...this._wrapperClass,
      'saga-syllabus-item-container-confirm-no-merge': false,
      'saga-syllabus-item-container-confirm-merge-inner': true,
      'saga-syllabus-item-container-confirm-merge-outer': false,
    };

    this.action.emit({
      actionType: SubjectCellComponentActions.CONFIRMATION_MERGED_INSIDE_COURSE,
      timelineItem,
    });

    this._status = SubjectCellComponentActions.CONFIRMATION_MERGED_INSIDE_COURSE;
  }

  /**
   * Cancela a ratificação
   */
  _cancelConfirmation(timelineItem: TimelineItem): void {
    this._wrapperClass = {
      ...this._wrapperClass,
      'saga-syllabus-item-container-confirm-no-merge': false,
      'saga-syllabus-item-container-confirm-merge-inner': false,
      'saga-syllabus-item-container-confirm-merge-outer': false,
    };

    timelineItem.performedData = timelineItem.performedData
      ? {...timelineItem.performedData, lecturePeriodRef: this.targetLecturePeriodRef}
      : timelineItem.performedData;

    this.action.emit({
      actionType: SubjectCellComponentActions.CANCEL_CONFIRMATION,
      timelineItem,
    });

    this._status = SubjectCellComponentActions.CANCEL_CONFIRMATION;
  }

  /** mostra o botão de cancelar */
  get _showCancelButton(): boolean {
    return !!this._status && this._status !== SubjectCellComponentActions.CANCEL_CONFIRMATION;
  }

  /** mostra botão de marcar como junção com outros cursos */
  get _showMergeToOthersButton(): boolean {
    return this._status !== SubjectCellComponentActions.CONFIRMATION_MERGE_OTHER_COURSES;
  }

  /** mostra botão de marcar como junção dentro de um mesmo curso */
  get _showMergeInsideCourseButton(): boolean {
    return this._status !== SubjectCellComponentActions.CONFIRMATION_MERGED_INSIDE_COURSE;
  }

  /** mostra botão de confirmar sem junção  */
  get _showConfirmationWithNoMergeButton(): boolean {
    return this._status !== SubjectCellComponentActions.CONFIRMATION_NO_MERGE;
  }

  /**
   * indica se existe junção (essa informação é preenchida somente no momento em que o horário é
   *     montado, ou seja, no momento da ratificação, nada é apresentado)
   */
  get _mergedBadgeText(): string {
    return this.timelineItem &&
      this.timelineItem.performedData &&
      this.timelineItem.performedData.mergedTimeLineItems &&
      this.timelineItem.performedData.mergedTimeLineItems.length
      ? 'J'
      : '';
  }

  /**
   * Converte o status de junção (planejada), para as cores definidas (aplicadas somente nas
   *     discplinas do semestre corrente)
   *
   */
  private _setMerginStatus(): void {
    if (
      !this._timelineItem ||
      !this._timelineItem.performedData ||
      !this._timelineItem.performedData.lecturePeriodRef ||
      (!!this.targetLecturePeriodRef &&
        this.targetLecturePeriodRef.code !== this._timelineItem.performedData.lecturePeriodRef.code)
    ) {
      return;
    }

    switch (this._timelineItem.performedData.mergingPlanned) {
      case MergePlanning.MERGED_INSIDE_COURSE: {
        this._status = SubjectCellComponentActions.CONFIRMATION_MERGED_INSIDE_COURSE;
        break;
      }

      case MergePlanning.MERGE_OTHER_COURSES: {
        this._status = SubjectCellComponentActions.CONFIRMATION_MERGE_OTHER_COURSES;
        break;
      }

      default: {
        this._status = SubjectCellComponentActions.CONFIRMATION_NO_MERGE;
      }
    }
  }
}
