import {BehaviorSubject} from 'rxjs';

import * as moment from 'moment';
import {TimelineHeaderPipe} from './timeline/pipes/timeline-header.pipe';
type Moment = moment.Moment;

export enum BusinessStatusCode {
  SUBJECT_CONFIRMATION_DONE = 'RATIFICACAO_CONCLUIDA',
  SUBJECT_CONFIRMATION_DOING = 'RATIRICACAO_EM_ANDAMENTO',
}

export enum SagaCourseType {
  /** GRADUAÇÃO */
  UNDERGRADUATION = 'UNDERGRADUATION',

  /** PÓS-GRADUAÇÃO */
  GRADUATION = 'GRADUATION',

  /** FUNDAMENTAL */
  ELEMENTARY_SCHOOL = 'ELEMENTARY_SCHOOL',

  /** ENSINO MÉDIO */
  HIGH_SCHOOL = 'HIGH_SCHOOL',

  /** MESTRADO */
  MASTER_IN_SCIENCE = 'MASTER_IN_SCIENCE',

  /** DOUTORADO */
  DOCTOR_IN_SCIENCE = 'DOCTOR_IN_SCIENCE',

  /** PhD */
  PHD = 'PHD',
}

export const KEY_VALUES: Array<{key: SagaCourseType; value: string}> = [
  {
    key: SagaCourseType.DOCTOR_IN_SCIENCE,
    value: 'Doutorado',
  },

  {
    key: SagaCourseType.ELEMENTARY_SCHOOL,
    value: 'Ensino Fundamental',
  },

  {
    key: SagaCourseType.GRADUATION,
    value: 'Pós-Graduação',
  },

  {
    key: SagaCourseType.UNDERGRADUATION,
    value: 'Graduação',
  },

  {
    key: SagaCourseType.HIGH_SCHOOL,
    value: 'Ensino Médio',
  },

  {
    key: SagaCourseType.MASTER_IN_SCIENCE,
    value: 'Mestrado',
  },

  {
    key: SagaCourseType.PHD,
    value: 'PHD',
  },
];

/**
 * Obtém o nome do curso a partir do código saga
 */
export const getCourseTypeName: (key: SagaCourseType) => string = (
  sagaCourseType: SagaCourseType,
) => {
  const index = KEY_VALUES.findIndex(
    (v: {key: SagaCourseType; value: string}) => v.key === sagaCourseType,
  );

  return index > -1 ? KEY_VALUES[index].value : '';
};

export interface User {
  name: string;
  email: string;
}

export interface ObjectReference {
  code: string;
  description: string;
}

export interface BusinessStatus {
  code: BusinessStatusCode;
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

export interface SyllabusInformation {
  /** id do Syllabus no banco */
  objectId: string;

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
  minCourseDuration: number;

  /** Prazo IDEAL MÍNIMO para conclusão do curso */
  maxCourseDuration: number;

  /** Código da Matriz Curricular */
  name: string;
}

export interface Timeline extends EntityModel {
  label: string;

  /** período letivo em que a turma ingressou (em conjunto com o curso, identificação da turma) */
  startLecturePeriodRef: ObjectReference;

  /** curso à qual esta time line se refere */
  courseRef: ObjectReference;

  /** tipo de curso de courseRef */
  courseTypeRef: ObjectReference;

  /** tipo de curso do SAGA */
  sagaCourseType: SagaCourseType;

  /** turno desta timeline */
  dayShiftRef: ObjectReference;

  /** campus desta timeline */
  campusRef: ObjectReference;

  /** matriz a que este timeline se refere */
  syllabusInformation: SyllabusInformation;

  /** indica quais items da timeline tiveram sua ratificação finalizada */
  lecturePeriodConfirmationStatuses: Array<LecturePeriodConfirmationStatus>;

  /** disciplinas ofertadas */
  items: TimelineItem[];
}

/**
 * Quando uma disciplina é colocada em junção no processo de elaboração do horário (que começa na
 *     ratificação), é preciso ter informações sobre a timeline das disciplinas que participam da junção
 *
 * @export
 */
export interface MergedTimeLine {
  /** time line que participa de uma junção */
  timelineRef: ObjectReference;

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
  MERGED_OTHER_COURSES = 'MERGE_OTHER_COURSES',
}

/**
 * Características da disciplina ofertada
 *
 * @export
 */
export interface PerformedSubject {
  /** período do curso (sequência) em que foi realmente executada a disciplina */
  sequence: number;

  /** período letivo em que a disciplina foi ofertada */
  lecturePeriodRef: ObjectReference;

  /** junções que podem ocorrer neste curso */
  mergedTimeLineItems: MergedTimeLine[];

  /** Junção planejada mas ainda não efetivada */
  mergingPlanned: MergePlanning;

  /** dados de eletiva oferecida */
  subjectGroupName: string;

  /** disciplina equivalente que foi ofertada em lugar da disciplina original */
  equivalentSubject: ObjectReference;
}

export interface TimelineItem {
  /** disciplina a ser ofertada */
  plannedSyllabusItem: SyllabusItem;

  /** dados da disciplina ofertada */
  performed: PerformedSubject;
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
  minCourseDuration: number;

  /** Prazo IDEAL MÍNIMO para conclusão do curso */
  maxCourseDuration: number;

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
