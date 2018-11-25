import { Injectable } from '@angular/core';

import { CdkDropList } from '@angular/cdk/drag-drop';

import { BehaviorSubject } from 'rxjs';

import * as moment from 'moment';
type Moment = moment.Moment;

export enum Status {
  IN_PROGRESS = 'IN_PROGRESS',
  NOT_STARTED = 'NOT_STARTED',
  FINISHED = 'FINISHED',
  OVERDUE = 'OVERDUE',
}

export interface User {
  name: string;
  email: string;
}

export interface ObjectReference {
  code: string;
  description: string;
}

export interface SyllabusItem {
  /** Código da disciplina associada */
  subjectCode: string;

  /** Descrição da disciplina associada */
  subjectDescription: string;

  /** Carga horária da disciplina na matriz */
  creditHours: number;

  /** Período Sugerido */
  suggestedPeriod: number; // pode ser nulo no caso de optativa

  /** Expressão de disciplinas equivalentes */
  equivalents: string;

  /** Disciplinas Pré-requisitos */
  preRequirements: string;
}

export interface SubjectGroup {
  groupName: string;

  /** Horas de crédito total para as disciplinas deste grupo */
  groupCreditHours: number;

  /** Lista de disciplinas eletivas */
  items: Set<SyllabusItem>;
}

export class Syllabus {
  readonly MANDATORY: string = 'Obrigatórias';
  readonly ELECTIVE: string = 'Eletivas';
  readonly OPTATIVE: string = 'Optativas';

  mapSubjectUse: { [key: string]: string[] } = {};
  validHours: string[] = [];

  /** Data de Homologação da Matriz */
  homologationDate: Moment;

  /** Data de Desativação da Matriz */
  deactivationDate: Moment;

  /** Carga Horária */
  creditHours: number;

  /** Carga Horária OBRIGATÓRIA */
  mandatoryCreditHours: number;

  /** Carga Horária ELETIVA */
  electiveCreditHours: number;

  /** Créditos */
  credits: number;

  /** Prazo IDEAL MÁXIMO para conclusão do curso */
  deadline: number;

  /** Prazo IDEAL MÍNIMO para conclusão do curso */
  idealTerm: number;

  /** Código da Matriz Curricular */
  name: string;

  /** Disciplinas OBRIGATÓRIAS */
  subjectsMandatory: Set<SyllabusItem>;

  /** Disciplinas ELETIVAS */
  subjectsElectivesGroups: Set<SubjectGroup>;

  /** Disciplinas OPTATIVAS */
  subjectsOptativesRefs: Set<ObjectReference>;

  /** Cursos que utilizam esta Matriz **/
  courseRefs: Set<ObjectReference>;
}

@Injectable({
  providedIn: 'root',
})
export class SubjectConfirmationService {

  _list: CdkDropList[] = [];

  _cdkPerStep = {};

  dropLists$: BehaviorSubject<CdkDropList[]> = new BehaviorSubject<CdkDropList[]>(this._list);

  minMinDate(minRootDate: Moment): Moment {
    return minRootDate ? moment.utc(minRootDate) : null;
  }

  maxMaxDate(maxRootDate: Moment): Moment {
    return maxRootDate ? moment.utc(maxRootDate) : null;
  }

  maxMinDate(step: Disciplina, maxRootDate: Moment): Moment {
    const minStepStartDate: Moment = this._lookForMinimumStartDate(step, false);

    if ((minStepStartDate && !maxRootDate) || (minStepStartDate && maxRootDate && minStepStartDate.isBefore(maxRootDate))) {
      return minStepStartDate
    }

    return maxRootDate;
  }

  minMaxDate(step: Disciplina, minRootDate: Moment): Moment {
    const maxStepStartDate: Moment = this._lookForMaximumStartDate(step, false);

    if ((maxStepStartDate && !minRootDate) || (maxStepStartDate && minRootDate && maxStepStartDate.isAfter(minRootDate))) {
      return maxStepStartDate
    }

    return minRootDate;
  }

  addToCdkList(step: Disciplina, dropList: CdkDropList) {
    if (this._list.some((cdkList: CdkDropList) => cdkList === dropList)) {
      return;
    }

    const key: string = this._sortString(JSON.stringify(step));
    if (!this._cdkPerStep[key]) {
      this._cdkPerStep[key] = dropList;
      this._list.push(dropList);
    }

    this.dropLists$.next([...this._list]);

    console.log(this._list.length);
  }

  removeFromList(step: Disciplina) {
    const key: string = this._sortString(JSON.stringify(step));

    if (!this._cdkPerStep[key]) {
      return;
    }

    const index = this._list.findIndex((cdkList: CdkDropList) => cdkList === this._cdkPerStep[key]);

    if (index < 0) {
      return;
    }

    this._list.splice(index, 1);

    this.dropLists$.next([...this._list]);
  }

  /**
   * Ordena uma string
   *
   * @private
   * @param {string} str
   * @returns {string}
   * @memberof StepTemplateService
   */
  _sortString(str: string): string {
    if (!str) {
      return;
    }

    const strSplitted = str.split('').sort((a, b) => a.localeCompare(b, 'pt-br'));

    return strSplitted.reduce((acc, a) => acc = acc + a, '');
  }

  _lookForMinimumStartDate(step: Disciplina, includeInitialStep = true) {
    if (!step) {
      return null;
    }

    let minDate: Moment = null;
    if (includeInitialStep) {
      minDate = step.startDate ? moment.utc(step.startDate) : null;
    }

    if (!step.steps || !step.steps.length) {
      return minDate;
    }

    for (const s of step.steps) {
      const date = this._lookForMinimumStartDate(s);

      if ((date && !minDate) || (date && minDate && date.isBefore(minDate))) {
        minDate = date;
      }
    }

    return minDate;
  }

  _lookForMaximumStartDate(step: Disciplina, includeInitialStep = true) {
    if (!step) {
      return null;
    }

    let maxDate: Moment = null;
    if (includeInitialStep) {
      maxDate = step.endDate ? moment.utc(step.endDate) : null;
    }

    if (!step.steps || !step.steps.length) {
      return maxDate;
    }

    for (const s of step.steps) {
      const date = this._lookForMaximumStartDate(s);

      if ((date && !maxDate) || (date && maxDate && !date.isBefore(maxDate))) {
        maxDate = date;
      }
    }

    return maxDate;
  }
}