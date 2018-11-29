import {
  TimelineItem,
  MergePlanning,
  Timeline,
  ObjectReference,
  EntityStatus,
  SyllabusInformation,
  SagaCourseType,
} from './subject-confirmation.service';

import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
const moment = _rollupMoment || _moment;

export const _timelineItemTestConfirmed: TimelineItem = {
  performed: {
    subjectGroupName: '',
    equivalentSubject: null,
    lecturePeriodRef: {
      code: '12323243243',
      description: '2018-1',
    },
    mergedTimeLineItems: [],
    mergingPlanned: MergePlanning.NO_MERGE,
    sequence: null,
  },
  plannedSyllabusItem: {
    creditHours: 300,
    equivalences: '',
    preRequirements: '',
    subjectCode: 'ENG2017200',
    subjectDescription:
      'EMPREENDEDORISMO E JOGOS DE EMPRESAS APLICADOS À ENGENHARIA DE CONTROLE E AUTOMAÇÃO',
    suggestedSequence: 1,
  },
};

export const _timelineItemTestNotConfirmed: TimelineItem = {
  performed: null,
  plannedSyllabusItem: {
    creditHours: 300,
    equivalences: '',
    preRequirements: '',
    subjectCode: 'ENG2017200',
    subjectDescription:
      'EMPREENDEDORISMO E JOGOS DE EMPRESAS APLICADOS À ENGENHARIA DE CONTROLE E AUTOMAÇÃO',
    suggestedSequence: 1,
  },
};

const campusRef_PERIMETRAL: ObjectReference = {
  code: '1',
  description: 'GOIÂNIA:PERIMETRAL',
};

const courseRef_CONTROLE: ObjectReference = {
  code: '2',
  description: 'ENGENHARIA DE CONTROLE E AUTOMAÇÃO',
};

const courseTypeRef_GRADUACAO: ObjectReference = {
  code: '3',
  description: 'GRADUAÇÃO',
};

const dayShiftRef_NOTURNO: ObjectReference = {
  code: '3_ds',
  description: 'NOTURNO',
};

export const items_2017_2: TimelineItem[] = [
  /** disciplina ratificada no 1o período, pertencente ao período correto, e no histórico */
  {
    performed: {
      subjectGroupName: '',
      equivalentSubject: null,
      lecturePeriodRef: {
        code: '2_lp',
        description: 'GRADUAÇÃO::2017::2',
      },
      mergedTimeLineItems: [],
      mergingPlanned: MergePlanning.NO_MERGE,
      sequence: 1,
    },
    plannedSyllabusItem: {
      creditHours: 300,
      equivalences: '',
      preRequirements: '',
      subjectCode: 'ENG2017200',
      subjectDescription:
        'EMPREENDEDORISMO E JOGOS DE EMPRESAS APLICADOS À ENGENHARIA DE CONTROLE E AUTOMAÇÃO',
      suggestedSequence: 1,
    },
  },
  /** disciplina ratificada no primeiro período, do 2o período (antecipada), e no histórico */
  {
    performed: {
      subjectGroupName: '',
      equivalentSubject: null,
      lecturePeriodRef: {
        code: '2_lp',
        description: 'GRADUAÇÃO::2017::2',
      },
      mergedTimeLineItems: [],
      mergingPlanned: MergePlanning.NO_MERGE,
      sequence: 1,
    },
    plannedSyllabusItem: {
      creditHours: 120,
      equivalences: '',
      preRequirements: '',
      subjectCode: 'MAT5119',
      subjectDescription: 'CÁLCULO I',
      suggestedSequence: 2,
    },
  },
  /** disciplina ratificada no 1o período, do 3o período (antecipada), cursada por equivalência */
  {
    performed: {
      subjectGroupName: '',
      equivalentSubject: {
        code: 'MAT201715',
        description: 'NOVO MATERIAIS PARA ENGENHARIA',
      },
      lecturePeriodRef: {
        code: '2_lp',
        description: 'GRADUAÇÃO::2017::2',
      },
      mergedTimeLineItems: [
        {
          campusRef: campusRef_PERIMETRAL,
          courseRef: courseRef_CONTROLE,
          courseTypeRef: courseTypeRef_GRADUACAO,
          dayShiftRef: dayShiftRef_NOTURNO,
          sequence: 3,
          timelineRef: {
            code: '1_tl',
            description: '2017-1',
          },
        },
        {
          campusRef: campusRef_PERIMETRAL,
          courseRef: {
            code: '2_ENG_CIVIL',
            description: 'ENGENHARIA CIVIL',
          },
          courseTypeRef: courseTypeRef_GRADUACAO,
          dayShiftRef: dayShiftRef_NOTURNO,
          sequence: 4,
          timelineRef: {
            code: '15_tl',
            description: '2016-2',
          },
        },
      ],
      mergingPlanned: MergePlanning.MERGE_OTHER_COURSES,
      sequence: 1,
    },
    plannedSyllabusItem: {
      creditHours: 80,
      equivalences: '(MAT201715) OU (MAT300002)',
      preRequirements: '',
      subjectCode: 'ENG5175',
      subjectDescription: 'ANTIGO MATERIAIS PARA ENGENHARIA',
      suggestedSequence: 3,
    },
  },
  /** disciplina não ratificada do módulo 1 */
  {
    performed: null,
    plannedSyllabusItem: {
      creditHours: 80,
      equivalences: '',
      preRequirements: '',
      subjectCode: 'ENG5113',
      subjectDescription: 'DESENHO AUXILIADO POR COMPUTADOR',
      suggestedSequence: 1,
    },
  },
  /** disciplina não ratificada do módulo 1 */
  {
    performed: null,
    plannedSyllabusItem: {
      creditHours: 40,
      equivalences: '',
      preRequirements: '',
      subjectCode: 'ENG5172',
      subjectDescription: 'INTRODUÇÃO À ENGENHARIA DE COMPUTAÇÃO',
      suggestedSequence: 1,
    },
  },
  /** disciplina não ratificada do módulo 2 */
  {
    performed: null,
    plannedSyllabusItem: {
      creditHours: 60,
      equivalences: '',
      preRequirements: '',
      subjectCode: 'MAT201748',
      subjectDescription: 'ÁLGEBRA LINEAR PARA ENGENHARIA',
      suggestedSequence: 2,
    },
  },

  /** disciplina ratificada 2o período, pertencente ao 2o período, com 3o período do mesmo curso (outra timeline) */
  {
    performed: {
      subjectGroupName: '',
      equivalentSubject: null,
      lecturePeriodRef: {
        code: '3_lp',
        description: 'GRADUAÇÃO::2018::1',
      },
      mergedTimeLineItems: [
        {
          campusRef: campusRef_PERIMETRAL,
          courseRef: courseRef_CONTROLE,
          courseTypeRef: courseTypeRef_GRADUACAO,
          dayShiftRef: dayShiftRef_NOTURNO,
          sequence: 3,
          timelineRef: {
            code: '1_tl',
            description: '2017-1',
          },
        },
      ],
      mergingPlanned: MergePlanning.MERGED_INSIDE_COURSE,
      sequence: 2,
    },
    plannedSyllabusItem: {
      creditHours: 60,
      equivalences: '',
      preRequirements: '',
      subjectCode: 'MAT201748',
      subjectDescription: 'ÁLGEBRA LINEAR PARA ENGENHARIA',
      suggestedSequence: 2,
    },
  },

  /**
   * disciplina ratificada do módulo 2, cursada no período correto, com junção dentro do curso e
   *      fora do curso
   */
  {
    performed: {
      subjectGroupName: '',
      equivalentSubject: null,
      lecturePeriodRef: {
        code: '3_lp',
        description: 'GRADUAÇÃO::2018::1',
      },
      mergedTimeLineItems: [
        {
          campusRef: campusRef_PERIMETRAL,
          courseRef: courseRef_CONTROLE,
          courseTypeRef: courseTypeRef_GRADUACAO,
          dayShiftRef: dayShiftRef_NOTURNO,
          sequence: 3,
          timelineRef: {
            code: '1_tl',
            description: '2017-1',
          },
        },
        {
          campusRef: campusRef_PERIMETRAL,
          courseRef: {
            code: '2_ENG_CIVIL',
            description: 'ENGENHARIA CIVIL',
          },
          courseTypeRef: courseTypeRef_GRADUACAO,
          dayShiftRef: dayShiftRef_NOTURNO,
          sequence: 4,
          timelineRef: {
            code: '15_tl',
            description: '2016-2',
          },
        },
      ],
      mergingPlanned: MergePlanning.MERGE_OTHER_COURSES,
      sequence: 2,
    },
    plannedSyllabusItem: {
      creditHours: 40,
      equivalences: '',
      preRequirements: '',
      subjectCode: 'ENG8001',
      subjectDescription: 'TERMODINÂMICA',
      suggestedSequence: 2,
    },
  },

  /** disciplina não ratificada do módulo 3 */
  {
    performed: null,
    plannedSyllabusItem: {
      creditHours: 80,
      equivalences: '',
      preRequirements: '',
      subjectCode: 'CNT2345',
      subjectDescription: 'FÍSICA',
      suggestedSequence: 3,
    },
  },

  /** disciplina não ratificada do módulo 3 */
  {
    performed: null,
    plannedSyllabusItem: {
      creditHours: 80,
      equivalences: '',
      preRequirements: '',
      subjectCode: 'CNT1223',
      subjectDescription: 'QUÍMICA GERAL TECNOLÓGICA',
      suggestedSequence: 3,
    },
  },

  /** disciplina não ratificada do módulo 4 */
  {
    performed: null,
    plannedSyllabusItem: {
      creditHours: 80,
      equivalences: '',
      preRequirements: '',
      subjectCode: 'MAT5122',
      subjectDescription: 'EQUAÇÕES DIFERENCIAIS',
      suggestedSequence: 4,
    },
  },

  /** disciplina não ratificada do módulo 4 */
  {
    performed: null,
    plannedSyllabusItem: {
      creditHours: 60,
      equivalences: '',
      preRequirements: '',
      subjectCode: 'MAT5123',
      subjectDescription: 'CÁLCULO NUMÉRICO',
      suggestedSequence: 4,
    },
  },

  /** disciplina não ratificada do módulo 5 */
  {
    performed: null,
    plannedSyllabusItem: {
      creditHours: 40,
      equivalences: '',
      preRequirements: '',
      subjectCode: 'TCC2345',
      subjectDescription: 'TRABALHO DE CONCLUSÃO DE CURSO I',
      suggestedSequence: 5,
    },
  },

  /** disciplina não ratificada do módulo 5 */
  {
    performed: null,
    plannedSyllabusItem: {
      creditHours: 80,
      equivalences: '',
      preRequirements: '',
      subjectCode: 'ENG76532',
      subjectDescription: 'DISCIPLINA IMPORTANTÍSSIMA I',
      suggestedSequence: 5,
    },
  },

  /** disciplina eletiva não ratificada do módulo 5 */
  {
    performed: null,
    plannedSyllabusItem: {
      creditHours: 80,
      equivalences: '',
      preRequirements: '',
      subjectCode: 'ENG76532',
      subjectDescription: 'DISCIPLINA IMPORTANTÍSSIMA I',
      suggestedSequence: 5,
    },
  },
];

const syllabusInformation: SyllabusInformation = {
  /** id do Syllabus no banco */
  objectId: '1_syllabus',

  /** Data de Homologação da Matriz */
  homologationDate: moment(),

  /** Data de Desativação da Matriz */
  deactivationDate: moment(),

  /** Carga Horária */
  creditHours: 3600,

  /** Carga Horária OBRIGATÓRIA */
  mandatoryCreditHours: 3000,

  /** Carga Horária ELETIVA */
  electiveCreditHours: 600,

  /** Créditos */
  credits: 900,

  /** Prazo IDEAL MÁXIMO para conclusão do curso */
  minCourseDuration: 10,

  /** Prazo IDEAL MÍNIMO para conclusão do curso */
  maxCourseDuration: 16,

  /** Código da Matriz Curricular */
  name: 'ECEA20171',
};

export const lecturePeriodRef: ObjectReference = {
  code: '3_lp',
  description: 'GRADUAÇÃO::2018::1',
};

export const _timeline: Timeline = {
  _id: '1_tl',
  _rev: '1',
  campusRef: campusRef_PERIMETRAL,
  courseRef: courseRef_CONTROLE,
  courseTypeRef: courseTypeRef_GRADUACAO,
  sagaCourseType: SagaCourseType.UNDERGRADUATION,
  dayShiftRef: dayShiftRef_NOTURNO,
  entityStatus: EntityStatus.ACTIVE,
  label: '2017-2',
  lecturePeriodConfirmationStatuses: [
    {
      lecturePeriodRef: {
        code: '2_lp',
        description: 'GRADUAÇÃO::2017::2',
      },
      businessStatus: {
        name: 'RATIFICACAO_FINALIZADA',
      },
    },
    {
      lecturePeriodRef: {
        code: '3_lp',
        description: 'GRADUAÇÃO::2018::1',
      },
      businessStatus: {
        name: 'RATIFICACAO_FINALIZADA',
      },
    },
    {
      lecturePeriodRef: {
        code: '4_lp',
        description: 'GRADUAÇÃO::2018::1',
      },
      businessStatus: {
        name: 'RATIFICACAO_EM_ANDAMENTO',
      },
    },
  ],
  startLecturePeriodRef: {
    code: '2_lp',
    description: 'GRADUAÇÃO::2017::2',
  },

  syllabusInformation,

  items: items_2017_2,
};
