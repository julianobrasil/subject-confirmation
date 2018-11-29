import {Injectable} from '@angular/core';

import {Timeline} from './definitions';

import {TimelineHeaderPipe} from './timeline/pipes/timeline-header.pipe';



@Injectable({
  providedIn: 'root',
})
export class SubjectConfirmationComponentService {
  sortTimelines(timelines: Timeline[]): Timeline[] {
    const correctSequence: number[] = [];

    const pipe: TimelineHeaderPipe = new TimelineHeaderPipe();

    // percorre todas as timelines obtendo o próximo número de sequência (período em que estarão no período
    // letivo que está sendo projetado). Subtraindo uma unidade deste número, obtem-se a posição do
    // vetor em que ele deveria estar. Assim teremos, ao final, um vetor, representando, em cada
    // posição, a real ordem de cada elemento presente no vetor de timelines;
    let maxSequence = -1;
    for (const timeline of timelines) {
      const sequence = pipe.getNextSequenceNumber(timeline) - 1;
      correctSequence.push(sequence);

      if (sequence > maxSequence) {
        maxSequence = sequence;
      }
    }

    const sorted = Array(maxSequence + 1);
    for (let i = 0; i < correctSequence.length; i++) {
      const order = correctSequence[i];
      if (order > sorted.length - 1) {
        sorted.push(timelines[i]);
      } else {
        sorted.splice(order, 1, timelines[i]);
      }
    }

    return sorted.filter((value) => !!value);
  }
}
