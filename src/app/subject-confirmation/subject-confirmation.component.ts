import {Component, ViewEncapsulation} from '@angular/core';

import {SyllabusItem, TimelineItem, ObjectReference, MergePlanning} from './subject-confirmation.service';

import {
  SubjectCellComponentEvent,
  SubjectCellComponentActions,
} from './subject-cell/subject-cell.component';

import * as moment from 'moment';

@Component({
  selector: 'app-subject-confirmation',
  templateUrl: 'subject-confirmation.component.html',
  styleUrls: ['subject-confirmation.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SubjectConfirmationComponent {
  _lecturePeriodRefTest: ObjectReference = {
    code: '12323243243',
    description: '2018-1',
  };

  _timelineItemTest: TimelineItem = {
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

  actionTaken: SubjectCellComponentEvent;

  _actionHandler(evt: SubjectCellComponentEvent) {
    this.actionTaken = evt;
  }
}
