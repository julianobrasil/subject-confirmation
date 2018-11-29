import {Pipe, PipeTransform} from '@angular/core';

import {MergedTimeLine, SagaCourseType} from '../../../subject-confirmation.service';


@Pipe({
  name: 'mergedClassFriendlyText',
})
export class MergedClassFriendlyTextPipe implements PipeTransform {
  transform(timeline: MergedTimeLine, sagaCourseType?: SagaCourseType): string {
    if (!timeline) {
      return '';
    }

    switch (sagaCourseType) {
      case SagaCourseType.UNDERGRADUATION: {
        return `${timeline.courseRef.description} - ${timeline.sequence}° período (${
          timeline.dayShiftRef.description
        })`;
      }

      case SagaCourseType.HIGH_SCHOOL:
      case SagaCourseType.ELEMENTARY_SCHOOL: {
        return `${timeline.courseRef.description} - ${timeline.sequence}° ano (${
          timeline.dayShiftRef.description
        })`;
      }

      default: {
        return `${timeline.courseRef.description} - ${timeline.sequence}° módulo (${
          timeline.timelineRef.description
        })`;
      }
    }
  }
}
