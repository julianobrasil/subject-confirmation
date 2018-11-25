import { Component, Input, ViewEncapsulation, ViewChild } from '@angular/core';

import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropList } from '@angular/cdk/drag-drop';

import { MatDialog } from '@angular/material';

import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

import { NewStepTemplateDialogComponent } from './new-step-template-dialog/new-step-template-dialog.component';

import { Status, Disciplina, SubjectConfirmationService } from './subject-confirmation.service';

import * as moment from 'moment';
type Moment = moment.Moment;

@Component({
  selector: 'app-subject-confirmation',
  templateUrl: 'subject-confirmation.component.html',
  styleUrls: ['subject-confirmation.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SubjectConfirmationComponent {
  /** atividade corrente mostrada no expansion */
  private _step: Disciplina;
  @Input()
  get step(): Disciplina { return this._step };
  set step(step: Disciplina) {
    this._step = step;
    setTimeout(() => this._updateStatus());
  }

  /** atividade pai da atividade corrente */
  @Input()
  parentStep: Disciplina;

  /** mostra o botão de remover etapa */
  @Input()
  showRemoveButton = true;

  /** mostra o botão de adicionar etapa filha */
  @Input()
  showAddChildButton = true;

  /** mostra o menu */
  @Input()
  isRootStep = true;

  @Input()
  maxDate: Moment;

  @Input()
  minDate: Moment;

  @ViewChild('cdkSagaDragAndDropList') _cdkSagaDragAndDropList: CdkDropList;

  _connectedToList$: Observable<CdkDropList[]> = this._stepService.dropLists$.pipe(delay(0));

  /** status possíveis */
  _possibleStatuses = Status;

  constructor(private _dialog: MatDialog, public _stepService: SubjectConfirmationService) {
  }

  ngAfterViewInit() {
    this._stepService.addToCdkList(this.step, this._cdkSagaDragAndDropList);
  }

  /** adiciona uma etapa filha */
  _addChild(step: Disciplina) {
    if (!step.steps) {
      step.steps = [];
    }

    const dialogRef = this._dialog.open(NewStepTemplateDialogComponent, { data: { isRootStep: this.isRootStep, minDate: this.minDate, maxDate: this.maxDate, } });

    dialogRef.afterClosed().subscribe((value: { name: string, startDate: Moment; endDate: Moment } | null) => {
      if (value !== null) {
        step.steps.push({ ...value, steps: [] });
      }
    })
  }

  /** remove uma etapa */
  _remove(step: Disciplina, parentStep: Disciplina) {
    console.log({ step, parentStep })
    if (!parentStep || !parentStep.steps) {
      return;
    }

    const index = parentStep.steps.indexOf(step);

    if (index < 0) {
      return;
    }

    parentStep.steps.splice(index, 1);
  }

  _edit(step: Disciplina) {
    this._dialog.open(NewStepTemplateDialogComponent, { data: { step, isRootStep: this.isRootStep, maxDate: this.maxDate, minDate: this.minDate } });
  }

  /** conclui atividade */
  _markAsFinished(step: Disciplina) {
    step.status = Status.FINISHED;

    if (!!step.steps) {
      step.steps.forEach((s: Disciplina) => s.status = Status.FINISHED);
    }

    this._updateStatus();
  }

  /** trata o evento de arrastar e soltar */
  drop(event: CdkDragDrop<Disciplina[]>) {
    if (event.previousContainer === event.container) {
      this._stepService.removeFromList(event.container.data[event.previousIndex]);
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this._stepService.removeFromList(event.previousContainer.data[event.previousIndex]);
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }


  }

  /** obtém as classes para estilizar o expansion */
  get _expansionClass(): any {
    return {
      'saga-step-template-container-expansion': true,
      'saga-step-template-container-expansion-not-started': this.step.status === Status.NOT_STARTED,
      'saga-step-template-container-expansion-in-progress': this.step.status === Status.IN_PROGRESS,
      'saga-step-template-container-expansion-delayed': this.step.status === Status.OVERDUE,
      'saga-step-template-container-expansion-finished': this.step.status === Status.FINISHED

    }
  }

  /** atualiza status geral */
  private _updateStatus() {
    if (!this.step) {
      return;
    }

    const parentFinished = this.parentStep && this.parentStep.steps.length && this.parentStep.steps.every((s: Disciplina) => s.status === Status.FINISHED);

    if (parentFinished) {
      this.parentStep.status = Status.FINISHED;
    }

    if (!this.step.steps) {
      return;
    }

    if (this.step.status === Status.FINISHED) {
      return;
    }

    const finished = this.step.steps.length && this.step.steps.every((s: Disciplina) => s.status === Status.FINISHED);

    if (finished) {
      this.step.status = Status.FINISHED;
      return;
    }

    if (this.step.endDate && !this.step.endDate.isAfter(moment.utc())) {
      this.step.status = Status.OVERDUE;
      return;
    }

    if (this.step.startDate && !this.step.startDate.isAfter(moment.utc()) && this.step.endDate && this.step.endDate.isAfter(moment.utc())) {
      this.step.status = Status.IN_PROGRESS;
      return;
    }

    if (!this.step.startDate || this.step.startDate && this.step.startDate.isAfter(moment.utc())) {
      this.step.status = Status.NOT_STARTED;
      return;
    }
  }

  _buildTooltip(step: Disciplina) {

    const startDate = step.startDate ? moment.utc(step.startDate).format('dd/MM/yyyy') : "-";

    const endDate = step.endDate ? moment.utc(step.endDate).format('dd/MM/yyyy') : "-";

    if (startDate === '-' && endDate === '-') {
      return 'Período não configurado';
    }

    return `${startDate} a ${endDate}`;
  }

}
