import {Pipe, PipeTransform} from '@angular/core';

import {
  Timeline,
  SagaCourseType,
  TimelineItem,
  LecturePeriodConfirmationStatus,
  BusinessStatusCode,
} from '../../../definitions';

@Pipe({
  name: 'timelineHeader',
})
export class TimelineHeaderPipe implements PipeTransform {
  transform(timeline: Timeline): string {
    if (!timeline) {
      return '';
    }

    const nextSequenceNumber = this.getNextSequenceNumber(timeline);

    if (nextSequenceNumber === -1) {
      return '';
    }

    switch (timeline.sagaCourseType) {
      case SagaCourseType.UNDERGRADUATION: {
        return `${nextSequenceNumber}° período`;
      }

      case SagaCourseType.HIGH_SCHOOL:
      case SagaCourseType.ELEMENTARY_SCHOOL: {
        return `${nextSequenceNumber + 1}° ano`;
      }

      default: {
        return `${nextSequenceNumber + 1}° módulo`;
      }
    }
  }

  /**
   * Obtém o primeiro número de sequência não confirmado da timeline
   */
  getNextSequenceNumber(timeline: Timeline): number {
    const maxConfirmedSequenceNumber = this._getGreatestConfirmedSequenceNumber(timeline);

    return timeline.items.some(
      (value: TimelineItem) =>
        (!value.performed &&
          value.plannedSyllabusItem.suggestedSequence > maxConfirmedSequenceNumber) ||
        (value.performed && value.performed.sequence > maxConfirmedSequenceNumber),
    )
      ? maxConfirmedSequenceNumber + 1
      : -1;
  }

  /**
   * Obtém o maior número de sequência (suggestedSequence) associado a módulos já
   *     finalizados.
   */
  private _getGreatestConfirmedSequenceNumber(timeline: Timeline): number {
    let maxConfirmedSequenceNumber = null;
    let firstTime = true;
    for (const timelineItem of timeline.items) {
      if (timelineItem.performed) {
        const isTimeLineItemDone = this._checkIfTimelineItemIsDone(
          timelineItem,
          timeline.lecturePeriodConfirmationStatuses,
        );

        if (!isTimeLineItemDone) {
          continue;
        }

        if (firstTime) {
          maxConfirmedSequenceNumber = timelineItem.performed.sequence;
          firstTime = false;
        } else if (maxConfirmedSequenceNumber <= timelineItem.performed.sequence) {
          maxConfirmedSequenceNumber = timelineItem.performed.sequence;
        }
      }
    }

    return maxConfirmedSequenceNumber;
  }

  /**
   * verifica se um item da timeline está sendo ratificado no período atual ou se foi ratificado em
   * períodos passados
   */
  private _checkIfTimelineItemIsDone(
    timelineItem: TimelineItem,
    lecturePeriodConfirmationStatuses: LecturePeriodConfirmationStatus[],
  ): boolean {
    return lecturePeriodConfirmationStatuses.some(
      (value: LecturePeriodConfirmationStatus) =>
        value.businessStatus.code === BusinessStatusCode.SUBJECT_CONFIRMATION_DONE &&
        value.lecturePeriodRef.code === timelineItem.performed.lecturePeriodRef.code,
    );
  }
}
