import type { Month, Weekday } from './types';

import monthsData from './data/months.json';
import weekdaysData from './data/weekdays.json';

const months: ReadonlyArray<Month> = Object.freeze(monthsData as Month[]);
const weekdays: ReadonlyArray<Weekday> = Object.freeze(weekdaysData as Weekday[]);

export { months, weekdays };

