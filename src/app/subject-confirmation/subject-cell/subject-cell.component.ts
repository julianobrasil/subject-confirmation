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

import {SyllabusItem} from '../subject-confirmation.service';

export enum SubjectCellComponentActions {
  /** ratirica disciplina sem junção */
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
}

@Component({
  selector: 'app-subject-cell',
  templateUrl: './subject-cell.component.html',
  styleUrls: ['./subject-cell.component.scss'],
})
export class SubjectCellComponent implements AfterViewInit {
  /** item da matriz: provavelmente teremos outro input aqui, relativo à timeline */
  @Input()
  syllabusItem: SyllabusItem;

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

    popoverAnchor.openPopover();
  }

  _confirmSubject(popoverAnchor: SatPopoverAnchor, action: SubjectCellComponentActions): void {
    popoverAnchor.closePopover();

    this._changeSubjectStatus(action);
  }

  _changeSubjectStatus(action: SubjectCellComponentActions): void {
    switch (action) {
      case SubjectCellComponentActions.CANCEL_CONFIRMATION: {
        this._cancelConfirmation();
        break;
      }

      case SubjectCellComponentActions.CONFIRMATION_MERGED_INSIDE_COURSE: {
        this._confirmMergingInsideCourse();
        break;
      }

      case SubjectCellComponentActions.CONFIRMATION_MERGE_OTHER_COURSES: {
        this._confirmMergeOtherCourses();
        break;
      }

      case SubjectCellComponentActions.CONFIRMATION_NO_MERGE: {
        this._confirmNoMerging();
        break;
      }
    }
  }

  /**
   * Ratifica sem nenhuma junção
   */
  _confirmNoMerging(): void {
    this._wrapperClass = {
      ...this._wrapperClass,
      'saga-syllabus-item-container-confirm-no-merge': true,
      'saga-syllabus-item-container-confirm-merge-inner': false,
      'saga-syllabus-item-container-confirm-merge-outer': false,
    };

    this.action.emit({
      actionType: SubjectCellComponentActions.CONFIRMATION_NO_MERGE,
    });

    this._status = SubjectCellComponentActions.CONFIRMATION_NO_MERGE;
  }

  /**
   * Ratifica com junção entre cursos
   */
  _confirmMergeOtherCourses(): void {
    this._wrapperClass = {
      ...this._wrapperClass,
      'saga-syllabus-item-container-confirm-no-merge': false,
      'saga-syllabus-item-container-confirm-merge-inner': false,
      'saga-syllabus-item-container-confirm-merge-outer': true,
    };

    this.action.emit({
      actionType: SubjectCellComponentActions.CONFIRMATION_MERGE_OTHER_COURSES,
    });

    this._status = SubjectCellComponentActions.CONFIRMATION_MERGE_OTHER_COURSES;
  }

  /**
   * Ratifica com junção entre períodos do mesmo curso
   */
  _confirmMergingInsideCourse(): void {
    this._wrapperClass = {
      ...this._wrapperClass,
      'saga-syllabus-item-container-confirm-no-merge': false,
      'saga-syllabus-item-container-confirm-merge-inner': true,
      'saga-syllabus-item-container-confirm-merge-outer': false,
    };

    this.action.emit({
      actionType: SubjectCellComponentActions.CONFIRMATION_MERGED_INSIDE_COURSE,
    });

    this._status = SubjectCellComponentActions.CONFIRMATION_MERGED_INSIDE_COURSE;
  }

  /**
   * Cancela a ratificação
   */
  _cancelConfirmation(): void {
    this._wrapperClass = {
      ...this._wrapperClass,
      'saga-syllabus-item-container-confirm-no-merge': false,
      'saga-syllabus-item-container-confirm-merge-inner': false,
      'saga-syllabus-item-container-confirm-merge-outer': false,
    };

    this.action.emit({
      actionType: SubjectCellComponentActions.CANCEL_CONFIRMATION,
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
}
