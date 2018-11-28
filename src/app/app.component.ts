import { Component } from '@angular/core';

import {
  User,
} from './subject-confirmation/subject-confirmation.service';

import * as moment from 'moment';
type Moment = moment.Moment;

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

  buildNewDate(date: Moment, days: number): Moment {
    const newDate = moment.utc(date);

    newDate.add(days, 'days');

    return newDate;
  }
}
