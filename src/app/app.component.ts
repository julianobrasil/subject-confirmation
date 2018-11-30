import { Component } from '@angular/core';


import {User, Timeline} from './definitions';

import * as moment from 'moment';
type Moment = moment.Moment;

import * as dataTest from './data-test';
import * as dataTest2 from './data-test2';
import { SubjectCellComponentEvent } from './subject-confirmation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  users: { [key: string]: User } = {
    samuel: {
      name: 'Samuel',
      email: 'samuel@email.com',
    },
    juliano: {
      name: 'Juliano',
      email: 'juliano@email.com',
    },
    bruno: {
      name: 'Bruno',
      email: 'bruno@email.com',
    },
  };

  _timelines: Timeline[] = [dataTest._timeline, dataTest2._timeline];

  _targetLecturePeriod = dataTest.lecturePeriodRef;

  _actionHandler(evt: SubjectCellComponentEvent) {
    console.log(evt);
  }
}
