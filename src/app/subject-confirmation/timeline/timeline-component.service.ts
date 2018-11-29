import { Injectable } from "@angular/core";
import { TimelineItem } from "../subject-confirmation.service";

@Injectable({
    providedIn: 'root',
})
export class TimelineComponentService {
    /**
     * Produz uma matriz em que cada linha representa, em ordem alfabética, as disciplinas de um
     *     determinado módulo de um curso
     *
     * @param {TimelineItem[]} timelineItems array contendo, em qualquer ordem, os itens da timline
     * @returns {TimelineItem[][]} uma matriz com os itens de timeline de cada sequuência sugerida
     *     pela matriz esteja representado
     * @memberof TimelineComponentService
     */
    groupAndSortTimelineItems(timelineItems: TimelineItem[]): TimelineItem[][] {
        const itemsPerSequence: { [key: number]: TimelineItem[] } = {};
        for (const item of timelineItems) {
            const key: number = item.plannedSyllabusItem.suggestedSequence;
            if (!itemsPerSequence.hasOwnProperty(key)) {
                itemsPerSequence[key] = [];
            }

            itemsPerSequence[key].push(item);
        }

        for (const sequence in itemsPerSequence) {
            if (itemsPerSequence.hasOwnProperty(sequence)) {
                itemsPerSequence[sequence].sort((a, b) => a.plannedSyllabusItem.subjectDescription.localeCompare(b.plannedSyllabusItem.subjectDescription, 'pt-br', { sensitivity: 'base' }));
            }
        }

        const itemsToReturn: TimelineItem[][] = Object.keys(itemsPerSequence).map((key: string) => itemsPerSequence[key]);

        return itemsToReturn;
    }
}