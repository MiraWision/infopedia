import { T as TimeZone, c as IANATimeZone } from './types-Dsl_Lfik.js';
export { t as timeZoneByName } from './maps-vygyojxn.js';

declare const timeZones: ReadonlyArray<TimeZone>;
declare function getTimeZone(name: IANATimeZone): TimeZone | undefined;

export { getTimeZone, timeZones };
