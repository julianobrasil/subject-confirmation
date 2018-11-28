import {Injectable} from '@angular/core';

import {CdkDropList} from '@angular/cdk/drag-drop';

import {BehaviorSubject} from 'rxjs';

import * as moment from 'moment';
type Moment = moment.Moment;

export interface User {
  name: string;
  email: string;
}

export interface ObjectReference {
  code: string;
  description: string;
}

export interface BusinessStatus {
  name: string;
}

export interface LecturePeriodConfirmationStatus {
  lecturePeriodRef: ObjectReference;
  businessStatus: BusinessStatus;
}

export enum EntityStatus {
  ACTIVE = 'ACTIVE',
  DELETED = 'ACTIVE',
}

export abstract class EntityModel {
  _id?: string;
  _rev?: string;
  entityStatus?: EntityStatus;
}

export interface Timeline extends EntityModel {
  label: string;

  /** período letivo em que a turma ingressou (em conjunto com o curso, identificação da turma) */
  startLecturePeriodRef: ObjectReference;

  /** curso à qual esta time line se refere */
  courseRef: ObjectReference;

  /** tipo de curso de courseRef */
  courseTypeRef: ObjectReference;

  /** turno desta timeline */
  dayShiftRef: ObjectReference;

  /** campus desta timeline */
  campusRef: ObjectReference;

  /** matriz a que este timeline se refere */
  syllabusRef: ObjectReference;

  /** indica quais items da timeline tiveram sua ratificação finalizada */
  lecturePeriodConfirmationStatuses: Array<LecturePeriodConfirmationStatus>;

  /** disciplinas ofertadas */
  items: TimelineItem[];
}

export interface MergedTimeLine {
  /** time line que participa de uma junção */
  timeLineRef: ObjectReference;

  /** curso que participa da junção */
  courseRef: ObjectReference;

  /** unidade do curso que participa da junção */
  campusRef: ObjectReference;

  /** tipo do curso que participa da junção */
  courseTypeRef: ObjectReference;

  /** turno curso que participa da junção */
  dayShiftRef: ObjectReference;

  /** período da timeline do curso que está participando da junção */
  sequence: number;
}

export enum MergePlanning {
  /** ratifica disciplina sem junção */
  NO_MERGE = 'NO_MERGE',

  /** ratifica disicplina com junção somente dentro do curso */
  MERGED_INSIDE_COURSE = 'MERGED_INSIDE_COURSE',

  /** ratifica disciplina com junção incluindo outros cursos */
  MERGE_OTHER_COURSES = 'MERGE_OTHER_COURSES',
}

export interface TimelineItem {
  /** disciplina a ser ofertada */
  syllabusItem: SyllabusItem;

  performedData: {
    /** período do curso (sequência) em que foi realmente executada a disciplina */
    sequence: number;

    /** período letivo em que a disciplina foi ofertada */
    lecturePeriodRef: ObjectReference;

    /** junções que podem ocorrer neste curso */
    mergedTimeLineItems: MergedTimeLine[];

    /** Junção planejada mas ainda não efetivada */
    mergingPlanned: MergePlanning;

    /** dados de eletiva oferecida */
    electiveSubject: {
      /** nome do grupo (usado no caso de disciplinas eletivas) */
      subjectGroupName: string;

      /** disciplina eletiva escolhida */
      subjectRef: ObjectReference;

      /** carga horária da disciplina eletiva que foi oferecida */
      electiveSubjectCreditHours: number;
    };

    /** disciplina equivalente que foi ofertada em lugar da disciplina original */
    equivalentSubject: ObjectReference;
  };
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

  mapSubjectUse: {[key: string]: string[]} = {};
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
