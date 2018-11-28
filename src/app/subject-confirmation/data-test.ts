import {
  TimelineItem,
  MergePlanning,
  Timeline,
  ObjectReference,
  EntityStatus,
} from './subject-confirmation.service';

export const _timelineItemTestConfirmed: TimelineItem = {
  performedData: {
    electiveSubject: null,
    equivalentSubject: null,
    lecturePeriodRef: {
      code: '12323243243',
      description: '2018-1',
    },
    mergedTimeLineItems: [],
    mergingPlanned: MergePlanning.NO_MERGE,
    sequence: null,
  },
  syllabusItem: {
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
  performedData: null,
  syllabusItem: {
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
  code: '3',
  description: 'GRADUAÇÃO',
};

const items_2017_2: TimelineItem[] = [
  /** disciplina confirmada, no período correto, e no histórico */
  {
    performedData: {
      electiveSubject: null,
      equivalentSubject: null,
      lecturePeriodRef: {
        code: '2_lp',
        description: 'GRADUAÇÃO::2017::2',
      },
      mergedTimeLineItems: [],
      mergingPlanned: MergePlanning.NO_MERGE,
      sequence: 1,
    },
    syllabusItem: {
      creditHours: 300,
      equivalences: '',
      preRequirements: '',
      subjectCode: 'ENG2017200',
      subjectDescription:
        'EMPREENDEDORISMO E JOGOS DE EMPRESAS APLICADOS À ENGENHARIA DE CONTROLE E AUTOMAÇÃO',
      suggestedSequence: 1,
    },
  },
  /** disciplina confirmada, no período errado (antecipada), e no histórico */
  {
    performedData: {
      electiveSubject: null,
      equivalentSubject: null,
      lecturePeriodRef: {
        code: '2_lp',
        description: 'GRADUAÇÃO::2017::2',
      },
      mergedTimeLineItems: [],
      mergingPlanned: MergePlanning.NO_MERGE,
      sequence: 1,
    },
    syllabusItem: {
      creditHours: 120,
      equivalences: '',
      preRequirements: '',
      subjectCode: 'MAT5119',
      subjectDescription: 'CÁLCULO I',
      suggestedSequence: 2,
    },
  },
  /** disciplina confirmada, no período errado (antecipada), cursada por equivalência, e no histórico */
  {
    performedData: {
      electiveSubject: null,
      equivalentSubject: {
        code: 'MAT201715',
        description: 'NOVO MATERIAIS PARA ENGENHARIA',
      },
      lecturePeriodRef: {
        code: '2_lp',
        description: 'GRADUAÇÃO::2017::2',
      },
      mergedTimeLineItems: [],
      mergingPlanned: MergePlanning.NO_MERGE,
      sequence: 1,
    },
    syllabusItem: {
      creditHours: 80,
      equivalences: '',
      preRequirements: '',
      subjectCode: 'ENG5175',
      subjectDescription: 'ANTIGO MATERIAIS PARA ENGENHARIA',
      suggestedSequence: 3,
    },
  },
  /** disciplina não ratificada do módulo 1 */
  {
    performedData: null,
    syllabusItem: {
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
    performedData: null,
    syllabusItem: {
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
    performedData: null,
    syllabusItem: {
      creditHours: 60,
      equivalences: '',
      preRequirements: '',
      subjectCode: 'MAT201748',
      subjectDescription: 'ÁLGEBRA LINEAR PARA ENGENHARIA',
      suggestedSequence: 2,
    },
  },

  /** disciplina ratificada do módulo 2, cursada no período correto, com junção dentro do curso */
  {
    performedData: {
      electiveSubject: null,
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
          timeLineRef: {
            code: '1_tl',
            description: '2017-1',
          },
        },
      ],
      mergingPlanned: MergePlanning.MERGED_INSIDE_COURSE,
      sequence: 2,
    },
    syllabusItem: {
      creditHours: 60,
      equivalences: '',
      preRequirements: '',
      subjectCode: 'MAT201748',
      subjectDescription: 'ÁLGEBRA LINEAR PARA ENGENHARIA',
      suggestedSequence: 2,
    },
  },
];

export const _timeLine: Timeline = {
  _id: '1_tl',
  _rev: '1',
  campusRef: campusRef_PERIMETRAL,
  courseRef: courseRef_CONTROLE,
  courseTypeRef: courseTypeRef_GRADUACAO,
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
  syllabusRef: {
    code: '1_syllabus',
    description: 'ECEA20171',
  },
  items: items_2017_2,
};
