import { T as TimeZone, c as IANATimeZone } from './types-Dsl_Lfik.cjs';
export { t as timeZoneByName } from './maps-iAwPK6vE.cjs';

declare const timeZones: ReadonlyArray<TimeZone>;
declare function getTimeZone(name: IANATimeZone): TimeZone | undefined;

export { getTimeZone, timeZones };
