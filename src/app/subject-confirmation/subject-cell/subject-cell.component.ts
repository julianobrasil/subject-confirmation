import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';

import { SatPopoverAnchor } from '@ncstate/sat-popover';

import { Subject, merge } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

import { TimelineItem, ObjectReference, SagaCourseType, MergePlanning } from '../../definitions';

export enum SubjectCellComponentActions {
  /** ratifica disciplina sem junção */
  CONFIRMATION_NO_MERGE = 'CONFIRMATION_NO_MERGE',

  /** cancela ratificação desta disciplina */
  CANCEL_CONFIRMATION = 'CANCEL_CONFIRMATION',

  /** ratifica disicplina com junção somente dentro do curso */
  CONFIRMATION_MERGED_INSIDE_COURSE = 'CONFIRMATION_MERGED_INSIDE_COURSE',

  /** ratifica disciplina com junção incluindo outros cursos */
  CONFIRMATION_MERGED_OTHER_COURSES = 'CONFIRMATION_MERGED_OTHER_COURSES',
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
export class SubjectCellComponent implements AfterViewInit, OnDestroy {
  /** div principal, que envolve toda a célula */
  @ViewChild('wrapperDiv') _wrapperDiv: ElementRef;

  /** item da timeline */
  private _timelineItemLoaded$: Subject<void> = new Subject<void>();
  private _timelineItem: TimelineItem;
  @Input()
  get timelineItem(): TimelineItem {
    return this._timelineItem;
  }
  set timelineItem(t: TimelineItem) {
    this._timelineItem = t;
    this._timelineItemLoaded$.next();
  }

  /** período letivo que está sendo alvo da ratificação */
  private _targetLecturePeriodRefLoaded$: Subject<void> = new Subject<void>();
  private _targetLecturePeriodRef: ObjectReference;
  @Input()
  get targetLecturePeriodRef(): ObjectReference {
    return this._targetLecturePeriodRef;
  }
  set targetLecturePeriodRef(lecturePeriodRef: ObjectReference) {
    this._targetLecturePeriodRef = lecturePeriodRef;
    this._targetLecturePeriodRefLoaded$.next();
  }

  /** tipo de curso (conforme definição interna deste projeto SAGA) */
  @Input()
  sagaCourseType: SagaCourseType;

  /** emite quando o usuário escolha uma opção do menu de contexto */
  @Output()
  action: EventEmitter<SubjectCellComponentEvent> = new EventEmitter<SubjectCellComponentEvent>();

  /** valor emitido do componente */
  _currentMergingStatus: SubjectCellComponentActions;

  /** largura da div principal, que envolve toda a célula em pixels */
  _wrapperDivWidth: any;

  /** ações possíveis no menu de contexto */
  _ACTIONS = SubjectCellComponentActions;

  /** classe que envolve toda a div de celula */
  _wrapperClass: { [key: string]: boolean } = {
    'saga-syllabus-item-container': true,
  };

  /** destrói as assinaturas de observables quando o componente é destruído */
  private _destroy$: Subject<void> = new Subject<void>();

  constructor() {
    merge(this._timelineItemLoaded$, this._targetLecturePeriodRefLoaded$)
      .pipe(
        debounceTime(300),
        takeUntil(this._destroy$),
      )
      .subscribe((_) => {
        this._setMerginStatus();
        this._setWrapperClass(this._timelineItem);
      });
  }

  ngAfterViewInit(): void {
    const div = this._wrapperDiv.nativeElement as HTMLDivElement;

    const boundingRect: ClientRect | DOMRect = div.getBoundingClientRect();

    setTimeout(() => (this._wrapperDivWidth = { width: `${boundingRect.width}px` }));
  }

  ngOnDestroy(): void {
    if (this._destroy$ && !this._destroy$.closed) {
      this._destroy$.next();
      this._destroy$.complete();
    }

    if (this._timelineItemLoaded$ && !this._timelineItemLoaded$.closed) {
      this._timelineItemLoaded$.complete();
    }

    if (this._targetLecturePeriodRefLoaded$ && !this._targetLecturePeriodRefLoaded$.closed) {
      this._targetLecturePeriodRefLoaded$.complete();
    }
  }

  _openContextMenu(evt: MouseEvent, popoverAnchor: SatPopoverAnchor) {
    evt.preventDefault();

    if (
      this.timelineItem &&
      this.timelineItem.performed &&
      !!this.timelineItem.performed.lecturePeriodRef &&
      !!this.targetLecturePeriodRef &&
      this.timelineItem.performed.lecturePeriodRef.code !== this.targetLecturePeriodRef.code
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
    const timelineItem: TimelineItem = { ...this.timelineItem };

    timelineItem.performed = timelineItem.performed
      ? { ...timelineItem.performed, mergingPlanned: MergePlanning.MERGED_INSIDE_COURSE }
      : {
        subjectGroupName: '',
        equivalentSubject: null,
        lecturePeriodRef: this.targetLecturePeriodRef,
        mergedTimeLineItems: [],
        mergingPlanned: null,
        sequence: null, // TODO(@julianobrasil): é preciso inferir o período/módulo do curso aqui
      };

    switch (action) {
      case SubjectCellComponentActions.CANCEL_CONFIRMATION: {
        timelineItem.performed = null;
        this._cancelConfirmation(timelineItem);
        break;
      }

      case SubjectCellComponentActions.CONFIRMATION_MERGED_INSIDE_COURSE: {
        timelineItem.performed.mergingPlanned = MergePlanning.MERGED_INSIDE_COURSE;
        this._confirmMergingInsideCourse(timelineItem);
        break;
      }

      case SubjectCellComponentActions.CONFIRMATION_MERGED_OTHER_COURSES: {
        timelineItem.performed.mergingPlanned = MergePlanning.MERGED_OTHER_COURSES;
        this._confirmMergeOtherCourses(timelineItem);
        break;
      }

      case SubjectCellComponentActions.CONFIRMATION_NO_MERGE: {
        timelineItem.performed.mergingPlanned = MergePlanning.NO_MERGE;
        this._confirmNoMerging(timelineItem);
        break;
      }
    }
  }

  /**
   * Ratifica sem nenhuma junção
   */
  _confirmNoMerging(timelineItem: TimelineItem): void {
    this._setWrapperClass(timelineItem);

    this.action.emit({
      actionType: SubjectCellComponentActions.CONFIRMATION_NO_MERGE,
      timelineItem,
    });

    this._currentMergingStatus = SubjectCellComponentActions.CONFIRMATION_NO_MERGE;
  }

  /**
   * Ratifica com junção entre cursos
   */
  _confirmMergeOtherCourses(timelineItem: TimelineItem): void {
    this._setWrapperClass(timelineItem);

    this.action.emit({
      actionType: SubjectCellComponentActions.CONFIRMATION_MERGED_OTHER_COURSES,
      timelineItem,
    });

    this._currentMergingStatus = SubjectCellComponentActions.CONFIRMATION_MERGED_OTHER_COURSES;
  }

  /**
   * Ratifica com junção entre períodos do mesmo curso
   */
  _confirmMergingInsideCourse(timelineItem: TimelineItem): void {
    this._setWrapperClass(timelineItem);

    this.action.emit({
      actionType: SubjectCellComponentActions.CONFIRMATION_MERGED_INSIDE_COURSE,
      timelineItem,
    });

    this._currentMergingStatus = SubjectCellComponentActions.CONFIRMATION_MERGED_INSIDE_COURSE;
  }

  /**
   * Cancela a ratificação
   */
  _cancelConfirmation(timelineItem: TimelineItem): void {
    this._wrapperClass = {
      ...this._wrapperClass,
      'saga-syllabus-item-container-history': false,
      'saga-syllabus-item-container-confirm-no-merge': false,
      'saga-syllabus-item-container-confirm-merge-inner': false,
      'saga-syllabus-item-container-confirm-merge-outer': false,
    };

    timelineItem.performed = timelineItem.performed
      ? { ...timelineItem.performed, lecturePeriodRef: this.targetLecturePeriodRef }
      : timelineItem.performed;

    this.action.emit({
      actionType: SubjectCellComponentActions.CANCEL_CONFIRMATION,
      timelineItem,
    });

    this._currentMergingStatus = SubjectCellComponentActions.CANCEL_CONFIRMATION;
  }

  /** mostra o botão de cancelar */
  get _showCancelButton(): boolean {
    return !!this._currentMergingStatus && this._currentMergingStatus !== SubjectCellComponentActions.CANCEL_CONFIRMATION;
  }

  /** mostra botão de marcar como junção com outros cursos */
  get _showMergeToOthersButton(): boolean {
    return this._currentMergingStatus !== SubjectCellComponentActions.CONFIRMATION_MERGED_OTHER_COURSES;
  }

  /** mostra botão de marcar como junção dentro de um mesmo curso */
  get _showMergeInsideCourseButton(): boolean {
    return this._currentMergingStatus !== SubjectCellComponentActions.CONFIRMATION_MERGED_INSIDE_COURSE;
  }

  /** mostra botão de confirmar sem junção  */
  get _showConfirmationWithNoMergeButton(): boolean {
    return this._currentMergingStatus !== SubjectCellComponentActions.CONFIRMATION_NO_MERGE;
  }

  /**
   * indica se existe junção (essa informação é preenchida somente no momento em que o horário é
   *     montado, ou seja, no momento da ratificação, nada é apresentado)
   */
  get _showInfoBadge(): boolean {
    return (
      !!this.timelineItem &&
      !!this.timelineItem.performed &&
      ((!!this.timelineItem.performed.mergedTimeLineItems &&
        !!this.timelineItem.performed.mergedTimeLineItems.length) ||
        !!this.timelineItem.performed.equivalentSubject)
    );
  }

  /**
   * Converte o status de junção (planejada), para as cores definidas (aplicadas somente nas
   *     discplinas do semestre corrente)
   *
   */
  private _setMerginStatus(): void {
    if (
      !this._timelineItem ||
      !this._timelineItem.performed ||
      !this._timelineItem.performed.lecturePeriodRef ||
      (!!this.targetLecturePeriodRef &&
        this.targetLecturePeriodRef.code !== this._timelineItem.performed.lecturePeriodRef.code)
    ) {
      return;
    }

    switch (this._timelineItem.performed.mergingPlanned) {
      case MergePlanning.MERGED_INSIDE_COURSE: {
        this._currentMergingStatus = SubjectCellComponentActions.CONFIRMATION_MERGED_INSIDE_COURSE;
        break;
      }

      case MergePlanning.MERGED_OTHER_COURSES: {
        this._currentMergingStatus = SubjectCellComponentActions.CONFIRMATION_MERGED_OTHER_COURSES;
        break;
      }

      default: {
        this._currentMergingStatus = SubjectCellComponentActions.CONFIRMATION_NO_MERGE;
      }
    }
  }

  /**
   * Colore a aula conforme definição abaixo:
   *
   *     - Verde: disciplina no histórico
   *     - Vermelho: disciplina sem junção
   *     - Amarelo: disciplina em junção dentro do próprio curso
   *     - Roxo: disciplina em junção com outros cursos (mesmo que tenha junção dentro do próprio curso também)
   *
   */
  private _setWrapperClass(timelineItem: TimelineItem) {
    if (!timelineItem || !timelineItem.performed) {
      this._wrapperClass = {
        ...this._wrapperClass,
        'saga-syllabus-item-container-history': false,
        'saga-syllabus-item-container-confirm-no-merge': false,
        'saga-syllabus-item-container-confirm-merge-inner': false,
        'saga-syllabus-item-container-confirm-merge-outer': false,
      };
      return;
    }

    if (
      !!timelineItem &&
      !!timelineItem.performed &&
      !!timelineItem.performed.lecturePeriodRef &&
      !!this.targetLecturePeriodRef &&
      this.targetLecturePeriodRef.code !== timelineItem.performed.lecturePeriodRef.code
    ) {
      this._wrapperClass = {
        ...this._wrapperClass,
        'saga-syllabus-item-container-history': true,
        'saga-syllabus-item-container-confirm-no-merge': false,
        'saga-syllabus-item-container-confirm-merge-inner': false,
        'saga-syllabus-item-container-confirm-merge-outer': false,
      };
      return;
    }

    this._wrapperClass = {
      ...this._wrapperClass,
      'saga-syllabus-item-container-history': false,
      'saga-syllabus-item-container-confirm-no-merge':
        timelineItem.performed.mergingPlanned === MergePlanning.NO_MERGE,
      'saga-syllabus-item-container-confirm-merge-inner':
        timelineItem.performed.mergingPlanned === MergePlanning.MERGED_INSIDE_COURSE,
      'saga-syllabus-item-container-confirm-merge-outer':
        timelineItem.performed.mergingPlanned === MergePlanning.MERGED_OTHER_COURSES,
    };
  }
}
