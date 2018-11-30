import {Injectable} from '@angular/core';
import {TimelineItem} from '../../definitions';

@Injectable({
  providedIn: 'root',
})
export class SubjectConfirmationTimelineComponentService {
  /**
   * Produz uma matriz em que cada linha representa, em ordem alfabética, as disciplinas de um
   *     determinado módulo de um curso
   *
   */
  groupAndSortTimelineItems(timelineItems: TimelineItem[]): TimelineItem[][] {
    const itemsPerSequence: {[key: number]: TimelineItem[]} = {};
    for (const item of timelineItems) {
      const key: number = item.plannedSyllabusItem.suggestedSequence;
      if (!itemsPerSequence.hasOwnProperty(key)) {
        itemsPerSequence[key] = [];
      }

      itemsPerSequence[key].push(item);
    }

    for (const sequence in itemsPerSequence) {
      if (itemsPerSequence.hasOwnProperty(sequence)) {
        itemsPerSequence[sequence].sort((a, b) =>
          a.plannedSyllabusItem.subjectDescription.localeCompare(
            b.plannedSyllabusItem.subjectDescription,
            'pt-br',
            {sensitivity: 'base'},
          ),
        );
      }
    }

    const itemsToReturn: TimelineItem[][] = Object.keys(itemsPerSequence).map(
      (key: string) => itemsPerSequence[key],
    );

    return itemsToReturn;
  }
}
