import {Pipe, PipeTransform} from '@angular/core';

import {Timeline, SagaCourseType} from '../../../definitions';

@Pipe({
  name: 'moduleHeader',
})
export class ModuleHeaderPipe implements PipeTransform {
  transform(timeline: Timeline, sequenceNumber?: number): string {
    if (!timeline) {
      return '';
    }

    switch (timeline.sagaCourseType) {
      case SagaCourseType.UNDERGRADUATION: {
        if (!sequenceNumber) {
          return `${sequenceNumber + 1}° período (${timeline.startLecturePeriodRef.description})`;
        } else {
          return `${sequenceNumber + 1}° período`;
        }
      }

      case SagaCourseType.HIGH_SCHOOL:
      case SagaCourseType.ELEMENTARY_SCHOOL: {
        return `${sequenceNumber + 1}° ano`;
      }

      default: {
        return `${sequenceNumber + 1}° módulo`;
      }
    }
  }
}
