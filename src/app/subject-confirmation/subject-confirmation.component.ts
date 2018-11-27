import { Component, ViewEncapsulation } from '@angular/core';

import {
  SyllabusItem,
} from './subject-confirmation.service';

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
  _syllabusItemTest: SyllabusItem = {
    creditHours: 300,
    equivalences: '',
    preRequirements: '',
    subjectCode: 'ENG2017200',
    subjectDescription:
      'EMPREENDEDORISMO E JOGOS DE EMPRESAS APLICADOS À ENGENHARIA DE CONTROLE E AUTOMAÇÃO',
    suggestedSequence: 1,
  };

  actionTaken: SubjectCellComponentActions;

  _actionHandler(evt: SubjectCellComponentEvent) {
    this.actionTaken = evt.actionType;
  }
}
