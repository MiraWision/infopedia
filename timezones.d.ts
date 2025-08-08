import type { TimeZone, IANATimeZone } from './types';
import { timeZoneByName } from './generated/maps';
declare const timeZones: ReadonlyArray<TimeZone>;
declare function getTimeZone(name: IANATimeZone): TimeZone | undefined;
export { timeZones, timeZoneByName, getTimeZone };
