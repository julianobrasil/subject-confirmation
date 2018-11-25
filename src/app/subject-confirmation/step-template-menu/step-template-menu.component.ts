import { Component, Input, EventEmitter, Output, ViewEncapsulation } from '@angular/core';

import {Disciplina} from '../subject-confirmation.service';

export interface StepToRemove {
  step: Disciplina;
  parentStep: Disciplina;
}

@Component({
  selector: 'app-step-template-menu',
  templateUrl: 'step-template-menu.component.html',
  styleUrls: ['step-template-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class StepTemplateMenuComponent {
  @Input()
  step: Disciplina;

  @Input()
  parentStep: Disciplina;

  /** mostra o botão de remover etapa */
  @Input()
  showRemoveButton = true;

  /** mostra o botão de adicionar etapa filha */
  @Input()
  showAddChildButton = true;

  /** é o componente raiz */
  @Input()
  isRootStep = true;

  /** emite quando o botão de remover for clicado */
  @Output()
  remove: EventEmitter<StepToRemove> = new EventEmitter<StepToRemove>();

  /** emite quando o botão de adicionar for clicado */
  @Output()
  addChild: EventEmitter<Disciplina> = new EventEmitter<Disciplina>();

  /** emite quando o botão de alterar for clicado */
  @Output()
  edit: EventEmitter<Disciplina> = new EventEmitter<Disciplina>();

  /** emite quando o botão de alterar for clicado */
  @Output()
  markAsFinished: EventEmitter<Disciplina> = new EventEmitter<Disciplina>();
}