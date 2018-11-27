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
  suggestedSequence: number; // pode ser nulo no caso de optativa

  /** Expressão de disciplinas equivalentes */
  equivalences: string;

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
  mandatorySubjects: Set<SyllabusItem>;

  /** Disciplinas ELETIVAS */
  electiveSubjectsGroups: Set<SubjectGroup>;

  /** Disciplinas OPTATIVAS */
  optativeSubjectsRefs: Set<ObjectReference>;

  /** Cursos que utilizam esta Matriz **/
  courseRefs: Set<ObjectReference>;
}

@Injectable({
  providedIn: 'root',
})
export class SubjectConfirmationService {}
